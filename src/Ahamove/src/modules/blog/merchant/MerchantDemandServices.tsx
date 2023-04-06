import UtilityItem from '../UltilityItem';

export default function MerchantDemandServices() {
  return (
    <section className="desktop:py-20 py-16">
      <div className="max-w-8xl desktop:px-8 mx-auto flex flex-col items-center justify-center px-4">
        <h2 className="text-title32 text-neutral-90 desktop:text-title42 max-w-content mb-12 text-center font-bold">
          Các dịch vụ giao hàng phù hợp với nhu cầu của bạn
        </h2>
        <div className="desktop:w-4/5 desktop:grid-cols-2 grid grid-cols-1 gap-14">
          <UtilityItem
            img="/static/images/customer/demand-service-bike.webp"
            title="Dịch vụ giao hàng xe máy"
            desc="Nhu cầu giao hàng hóa nhỏ gọn, giao giấy tờ tài liệu..."
            type="column"
            href="/service/aha-delivery"
          />
          <UtilityItem
            img="/static/images/customer/demand-service-truck.webp"
            title="Dịch vụ giao hàng xe tải"
            desc="Nhu cầu chuyển nhà, chuyển văn phòng, vận chuyển đồ đạc cồng kềnh."
            type="column"
            href="/service/aha-truck"
          />
        </div>
      </div>
    </section>
  );
}