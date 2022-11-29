import _ from "lodash";
import React from "react";

/*
 * The reason we use Global State instead of Component State is that
 * when the user clicks something on the main page and then clicks back,
 * we don't want to reset the user's scroll position. If we don't maintain
 * state, then we will "lose" some of the items when the user clicks
 * back and the state resets, which obviously resets scroll position as well.
 */
export const ShowcaseStateContext = React.createContext({
  cursor: 0 /* Which page infinite scroll should fetch next. */,
  isInitializing: () => {
    return true;
  },
  updateState: () => {},
  hasMore: () => {},
  loadMore: () => {},
});

export class ShowcaseState extends React.Component {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.hasMore = this.hasMore.bind(this);
    this.updateState = this.updateState.bind(this);
    this.isInitializing = this.isInitializing.bind(this);

    /* State also contains metadata for items, e.g. state["page81"] (only contains keys for _received_ metadata) */
    this.state = {
      cursor: 0,
      items: [],
      isLoading: false,
      isInitializing: this.isInitializing,
      updateState: this.updateState,
      hasMore: this.hasMore,
      loadMore: this.loadMore,
    };
  }

  isInitializing = () => {
    return this.state.cursor === 0;
  };

  updateState = (mergeableStateObject) => {
    this.setState(mergeableStateObject);
  };

  loadMore = () => {
    this.setState({ isLoading: true, error: undefined });
    fetch(
      `${__PATH_PREFIX__}/paginationJson/showcase/${this.state.cursor}.json`
    )
      .then((res) => res.json())
      .then(
        (res) => {
          if (!res.length) return;
          this.setState((state) => ({
            items: _.uniqBy([...state.items, ...res], "uid"), // Add resulting post items to state.items
            cursor: state.cursor + 1, // Update which page should be fetched next
            isLoading: false, // Loading is complete so a new load can be triggered.
          }));
        },
        (error) => {
          this.setState({
            isLoading: false,
            error,
          });
        }
      );
  };

  hasMore = (pageContext) => {
    if (this.isInitializing()) return true;
    return this.state.cursor <= pageContext.pageCount;
  };

  render() {
    return (
      <ShowcaseStateContext.Provider value={this.state}>
        {this.props.children}
      </ShowcaseStateContext.Provider>
    );
  }
}
