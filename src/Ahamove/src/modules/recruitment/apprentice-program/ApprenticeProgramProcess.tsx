import Image from 'next/image';
import { apprenticeProgramProcessData } from '../recruitmentData';

export default function ApprenticeProgramProcess() {
  return (
    <section className="desktop:py-20 py-16">
      <div className="max-w-8xl desktop:px-8 mx-auto flex flex-col items-center justify-center px-4">
        <h2 className="text-title32 text-neutral-90 desktop:text-title42 desktop:text-center mb-14 font-bold">
          Recruitment & Training process
        </h2>
        <nav aria-label="Progress" className="desktop:block hidden w-full">
          <ol className="flex w-full flex-row justify-center overflow-hidden">
            <li className="desktop:w-[20%] desktop:pb-0 group flex flex-col space-y-4 pb-10">
              <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                {apprenticeProgramProcessData[0].time}
              </p>
              <div className="relative flex w-full flex-row">
                <div
                  className="absolute inset-0 -ml-8 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0 w-full border-t border-dashed border-neutral-50" />
                </div>
                <div className="border-secondary-60 bg-serelative bg-secondary-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border"></div>
              </div>
              <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                {apprenticeProgramProcessData[0].title.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
            <li className="desktop:w-[20%] desktop:pb-0 group flex flex-col space-y-4 pb-10">
              <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                {apprenticeProgramProcessData[1].time}
              </p>
              <div className="relative flex w-full flex-row">
                <div
                  className="absolute inset-0 -ml-8 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0 w-full border-t border-dashed border-neutral-50" />
                </div>
                <div className="border-secondary-60 bg-serelative bg-secondary-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border"></div>
              </div>
              <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                {apprenticeProgramProcessData[1].title.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
            <li className="desktop:w-[20%] desktop:pb-0 group flex flex-col space-y-4 pb-10">
              <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                {apprenticeProgramProcessData[2].time}
              </p>
              <div className="relative flex w-full flex-row">
                <div
                  className="absolute inset-0 -ml-8 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0 w-full border-t border-dashed border-neutral-50" />
                </div>
                <div className="border-primary-60 bg-primary-20 relative z-10 flex h-6 w-6 items-center justify-center rounded-full border"></div>
              </div>
              <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                {apprenticeProgramProcessData[2].title.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
            <li className="desktop:pb-0 group flex flex-col space-y-4 pb-10">
              <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                {apprenticeProgramProcessData[3].time}
              </p>
              <div className="relative flex w-full flex-row">
                <div className="bg-primary-50 z-10 -mt-2 flex h-10 w-10 items-center justify-center rounded-full">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/static/icons/recruitment/Education.svg"
                      alt=""
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
              <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex max-w-[140px] flex-col space-y-2 pr-6 font-semibold">
                {apprenticeProgramProcessData[3].title.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </li>
          </ol>
        </nav>
        <nav aria-label="Progress" className="desktop:hidden w-full">
          <ol className="overflow-hidden pl-2">
            <li className="relative pb-10">
              <div
                className="absolute top-6 left-3 -ml-px mt-0.5 h-full w-0 border-l border-dashed border-neutral-50"
                aria-hidden="true"
              />
              <div className="group relative flex flex-row items-center space-x-4">
                <div className="border-secondary-60 bg-secondary-20 relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"></div>
                <div className="flex flex-col space-y-2">
                  <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                    {apprenticeProgramProcessData[0].time}
                  </p>
                  <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                    {apprenticeProgramProcessData[0].title.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="relative pb-10">
              <div
                className="absolute top-6 left-3 -ml-px mt-0.5 h-full w-0 border-l border-dashed border-neutral-50"
                aria-hidden="true"
              />
              <div className="group relative flex flex-row items-center space-x-4">
                <div className="border-secondary-60 bg-secondary-20 relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"></div>
                <div className="flex flex-col space-y-2">
                  <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                    {apprenticeProgramProcessData[1].time}
                  </p>
                  <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                    {apprenticeProgramProcessData[1].title.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="relative pb-10">
              <div
                className="absolute top-6 left-3 -ml-px mt-0.5 h-full w-0 border-l border-dashed border-neutral-50"
                aria-hidden="true"
              />
              <div className="group relative flex flex-row items-center space-x-4">
                <div className="border-primary-60 bg-primary-20 relative z-10 flex h-6 w-6 items-center justify-center rounded-full border"></div>
                <div className="flex flex-col space-y-2">
                  <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                    {apprenticeProgramProcessData[2].time}
                  </p>
                  <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                    {apprenticeProgramProcessData[2].title.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="relative pb-10">
              <div
                className="absolute top-6 left-3 -ml-px mt-0.5 h-full w-0 border-l border-dashed border-neutral-50"
                aria-hidden="true"
              />
              <div className="group relative flex flex-row items-center space-x-4">
                <div className="bg-primary-50 z-10 -ml-2 flex h-10 w-10 items-center justify-center rounded-full">
                  <div className="relative h-6 w-6">
                    <Image
                      src="/static/icons/recruitment/Education.svg"
                      alt=""
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-neutral-60 text-body16 desktop:-ml-6 font-bold">
                    {apprenticeProgramProcessData[3].time}
                  </p>
                  <div className="text-subtitle18 text-neutral-90 group-hover:text-primary-50 desktop:-ml-6 flex flex-col space-y-2 pr-6 font-semibold">
                    {apprenticeProgramProcessData[3].title.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
