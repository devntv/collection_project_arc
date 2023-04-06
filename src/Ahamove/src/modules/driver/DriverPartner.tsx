import { driverPartnerData } from './driverData';

export default function DriverPartner() {
  return (
    <section className="desktop:py-16 py-12">
      <div className="max-w-8xl mx-auto my-16 flex flex-col items-center justify-center px-4">
        <article className="max-w-content desktop:space-y-4 flex-col space-y-3">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-center font-bold">
            Dành cho đối tác tài xế của Ahamove
          </h2>
          <p className="text-body16 desktop:text-subtitle18 desktop:font-medium text-neutral-60 text-center font-normal">
            Chương trình thưởng, ưu đãi, và quyền lợi
          </p>
        </article>
        <div className="desktop:grid-cols-3 grid auto-cols-fr grid-cols-1 gap-8 pt-6">
          {driverPartnerData.map((item) => (
            <article
              key={item.id}
              className="shadow-shadow-special mx-2 rounded-xl bg-transparent p-6 text-center"
            >
              <div className="flex h-full flex-col items-center justify-start">
                <h3 className="text-title24 text-neutral-90 font-bold">
                  {item.title}
                </h3>
                <hr className="text-neutral-15 border-t-neutral-40 my-6 h-0 w-full border-dashed" />
                <p className="text-body16 desktop:font-medium mb-6 min-h-[72px] font-normal text-black">
                  {item.desc}
                </p>
                {/* <MoreInfo title="Tìm hiểu thêm" type="secondary" href="/" /> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}