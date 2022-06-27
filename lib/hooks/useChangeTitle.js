import { useCheckMount } from "./useClickOutSide";

export function useChangeTitle(title) {
  useCheckMount(() => {
    if (typeof title === "string" && title.trim().length > 0)
      document.title = title.trim();
  }, [title]);
}
// note : how to use

// const [title, setTitle] = useState('');

// useTitle(title);
// return <button onClick={() => setTitle('changed title')}>change Title</button>
