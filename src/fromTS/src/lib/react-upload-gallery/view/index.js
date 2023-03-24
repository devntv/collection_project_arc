/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
import DragArea from '../DragArea';
import Card from './Card';
import List from './List';

const Item = (type, image) => {
  switch (type) {
    case 'card':
      return <Card image={image} />;

    case 'list':
      return <List image={image} />;

    default:
  }
};

export default ({ type, sorting }, images) => {
  const className = `rug-items __${type} ${sorting ? '__sorting' : ''}`;

  const options = typeof sorting === 'object' ? sorting : {};

  return sorting ? (
    <DragArea {...options} className={className}>
      {(image) => <div className="rug-item">{Item(type, image)}</div>}
    </DragArea>
  ) : (
    <div className={className}>
      {images.map((image, key) => (
        <div className="rug-item" key={`drap-area-image-${key}`}>
          {Item(type, image)}
        </div>
      ))}
    </div>
  );
};

export { List, Card };
