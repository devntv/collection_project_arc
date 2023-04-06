type Props = {
    url: string;
    urlHover: string;
  };
  
  export default function HoverImage({ url, urlHover }: Props) {
    return (
      <div className="group flex h-auto w-full items-center justify-center py-4">
        <img
          src={url}
          alt=""
          className="desktop:group-hover:hidden desktop:block relative hidden h-auto w-full transition duration-200 ease-out"
        />
        <img
          src={urlHover}
          alt=""
          className="desktop:group-hover:block desktop:hidden relative h-auto w-full transition duration-200 ease-out"
        />
      </div>
    );
  }