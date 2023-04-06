import CooperateCustomers from '@/components/CooperateCustomers';
import HoverImage from '@/components/HoverImage';
import { cooperateOnWheelData } from '../service/cooperate/cooperateData';

function HomePartner() {
  return (
    <section className="desktop:py-10 bg-white">
      <div className="max-w-8xl desktop:grid-cols-6 desktop:px-8 desktop:grid mx-auto hidden grid-cols-2 grid-rows-1 gap-6 px-4">
        <HoverImage
          url="/static/images/home/partner-pharmacitylogo.webp"
          urlHover="/static/images/home/partner-pharmacitylogo-hover.webp"
        />
        <HoverImage
          url="/static/images/home/partner-concunglogo.webp"
          urlHover="/static/images/home/partner-concunglogo-hover.webp"
        />
        <HoverImage
          url="/static/images/home/partner-lazadalogo.webp"
          urlHover="/static/images/home/partner-lazadalogo-hover.webp"
        />
        <HoverImage
          url="/static/images/home/partner-thecoffeehouselogo.webp"
          urlHover="/static/images/home/partner-thecoffeehouselogo-hover.webp"
        />
        <HoverImage
          url="/static/images/home/partner-fahasalogo.webp"
          urlHover="/static/images/home/partner-fahasalogo-hover.webp"
        />
        <HoverImage
          url="/static/images/home/partner-junologo.webp"
          urlHover="/static/images/home/partner-junologo-hover.webp"
        />
      </div>
      <CooperateCustomers
        items={cooperateOnWheelData}
        cols="3"
        className="desktop:hidden"
      />
    </section>
  );
}

export default HomePartner;
