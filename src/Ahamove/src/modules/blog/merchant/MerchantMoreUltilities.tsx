import UtilityItem from '../UltilityItem';

export default function MerchantMoreUtilities() {
  return (
    <section className=" bg-secondary-10 desktop:py-16 py-8">
      <div className="destktop:px-8 max-w-8xl mx-auto flex flex-col items-center justify-center px-4">
        <div className="max-w-content mb-12 flex-col space-y-4">
          <h2 className="text-title32 text-neutral-90 desktop:text-title42 text-center font-bold">
            Thêm nhiều tiện ích hơn nữa dành cho bạn
          </h2>
          <p className="text-body14 desktop:text-subtitle18 text-center font-medium text-black">
            Không chỉ giao hàng, Ahamove còn mang đến nhiều tính năng hữu ích và
            tiện lợi hơn nữa cho cuộc sống của bạn.
          </p>
        </div>
        <UtilityItem
          img="/static/images/customer/demand-service-bike.webp"
          title="AhaMart"
          desc="Dịch vụ mua hàng online các loại thực phẩm, hàng tiêu dùng, thuốc
              men..., giao tận tay."
          type="row"
          className="mb-20"
          href="/service/aha-mart"
        />
        <UtilityItem
          img="/static/images/customer/demand-service-bike.webp"
          title="AhaLoyalty"
          desc="Tích điểm đơn hàng và đổi thành các voucher mua sắm, ăn uống hấp dẫn từ nhiều thương hiệu nổi tiếng."
          type="row-reverse"
          href="/blog/ahaloyalty-blog"
        />
      </div>
    </section>
  );
}
