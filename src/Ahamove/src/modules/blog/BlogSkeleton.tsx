export default function BlogSkeleton() {
    return (
      <div className="flex h-full w-full animate-pulse flex-col space-y-3">
        <div className="bg-neutral-15 h-44 w-full rounded-lg" />
        <div className="flex w-full flex-col space-y-3">
          <div className="bg-neutral-15 h-6 w-1/3 rounded-md" />
          <div className="bg-neutral-15 h-12 w-4/5 rounded-md" />
        </div>
      </div>
    );
  }