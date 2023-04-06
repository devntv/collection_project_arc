import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Props = {
  className?: string;
  isOpen?: boolean;
  handleClose: (result: boolean) => void;
};

export default function SuccessSubmittedDriverForm(props: Props) {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => props.handleClose(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-150"
          leave="ease-in duration-200"
          leaveFrom="opacity-150"
          leaveTo="opacity-0"
        >
          <div className="bg-neutral-70/75 fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex h-full w-full items-center justify-center px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="shadow-depth4 desktop:bg-[url('/static/images/driver/submitted-form-driver-laptop.webp')] desktop:aspect-[50/27] desktop:w-9/12 relative aspect-[3/5] h-auto w-full bg-[url('/static/images/driver/submitted-form-driver-mobile.webp')] bg-cover bg-no-repeat">
                <button
                  aria-label="button"
                  className="desktop:top-4 desktop:right-4 absolute top-1 right-1 h-8 w-8 bg-transparent"
                  onClick={() => props.handleClose(true)}
                ></button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
