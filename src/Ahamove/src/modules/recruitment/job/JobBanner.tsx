export default function JobBanner() {
    return (
      <section
        className="bg-neutral-10 desktop:bg-[url('/static/images/recruitment/job-banner-desktop.webp')] desktop:py-36 desktop:aspect-[41/10] aspect-[34/25] h-auto w-full bg-[url('/static/images/recruitment/job-banner-mobile.webp')] bg-cover bg-no-repeat py-20"
        style={{ backgroundPosition: 'center' }}
      ></section>
    );
  }
  