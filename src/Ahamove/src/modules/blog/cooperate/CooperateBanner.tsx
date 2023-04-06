function CooperateBanner() {
    return (
      <section
        className="desktop:bg-[url('/static/images/customer/banner-cooperate-desktop.webp')] desktop:pt-28 desktop:pb-32 desktop:max-h-[600px] flex flex-col items-center
      justify-center space-y-3 bg-[url('/static/images/customer/banner-cooperate-mobile.webp')] bg-cover bg-no-repeat py-40"
      >
        <h2 className="text-title32 desktop:text-title42 max-w-3xl text-center font-bold text-white">
          Đưa quy trình vận hành doanh nghiệp lên tầm cao mới cùng
        </h2>
        <h1 className="desktop:text-7xl text-title60 from-primary-50 to-primary-40 bg-gradient-to-r bg-clip-text font-bold text-transparent">
          Ahamove
        </h1>
      </section>
    );
  }
  
  export default CooperateBanner;