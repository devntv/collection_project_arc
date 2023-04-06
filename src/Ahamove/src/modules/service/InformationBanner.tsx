type Props = {
    title: string;
  };
  
  export default function InformationBanner({ title }: Props) {
    return (
      <section
        className="bg-neutral-10 desktop:bg-[url('/static/icons/service/BannerPriceDesktop.svg')] desktop:py-36 bg-[url('/static/icons/service/BannerPriceMobile.svg')] bg-cover bg-no-repeat py-16 px-12"
        style={{ backgroundPosition: 'center' }}
      >
        <h2 className=" text-title32 text-secondary-40 desktop:text-title60 desktop:px-0 text-center font-bold">
          {title}
        </h2>
      </section>
    );
  }
  