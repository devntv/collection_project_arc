import XMarkIcon from './icons/XMarkIcon';

type Props = {
  onClick: VoidFunction;
};

export default function PreviewBanner({ onClick }: Props) {
  return (
    <div className="bg-secondary-10 shadow-shadow4 sticky top-[84px] z-30 mt-[84px]">
      <div className="desktop:px-8 max-w-8xl mx-auto flex w-full grow flex-row items-center justify-between py-2 px-4">
        <span className="text-secondary-50 text-body14">
          You're in preview mode
        </span>
        <div className="order-2 shrink-0 sm:order-3 sm:ml-3">
          <button
            aria-label="button"
            type="button"
            className="hover:bg-secondary-60 bg-secondary-50 flex items-center rounded py-1 px-3"
            onClick={onClick}
          >
            <XMarkIcon
              className="mr-2 -ml-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span className="desktop:block text-body14 hidden text-white">
              Exit preview mode
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}