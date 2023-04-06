export default function JobSkeleton() {
    return (
      <div className="my-3 flex h-full w-full animate-pulse flex-col space-y-6">
        <div className="bg-neutral-15 desktop:w-1/2 h-7 w-3/4 rounded-lg" />
        <div className="desktop:flex-row desktop:space-x-6 desktop:space-y-0 flex flex-col space-y-2">
          <div className="bg-neutral-15 desktop:w-1/4 h-6 w-1/3 rounded-lg" />
          <div className="bg-neutral-15 desktop:w-1/4 h-6 w-1/2 rounded-lg" />
        </div>
      </div>
    );
  }