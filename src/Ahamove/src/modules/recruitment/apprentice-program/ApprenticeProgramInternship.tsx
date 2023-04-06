import Image from 'next/image';
import Button from '@/components/Button';
import MoreInfo from '@/components/MoreInfo';

export default function ApprenticeProgramInternship() {
  return (
    <section className=" bg-primary-20">
      <div className="max-w-8xl desktop:px-8 mx-auto">
        <div className="desktop:grid-cols-2 grid grid-cols-1 gap-12">
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square h-auto w-full">
              <Image
                src="/static/images/recruitment/apprentice-internship.webp"
                alt=""
                layout="fill"
              />
            </div>
          </div>
          <div className="desktop:py-24 flex flex-col items-start justify-center px-4">
            <h3 className="text-title32 desktop:text-title42 font-bold text-black">
              You are Ahamover during your internship!
            </h3>
            <p className="text-body16 mt-6 font-medium text-black">
              Are you ready to experience an extremely interesting internship?
              Do you expect to receive a lot of lessons as well as practical
              experience? And do you aspire to develop yourself comprehensively
              in a dynamic working environment? Let's say “yes” and join Young
              Potential Trainee Program now!
            </p>
            <div className="desktop:flex-row desktop:space-y-0 desktop:space-x-6 my-6 flex w-full flex-col space-y-6">
              <Button
                type="link"
                className="desktop:block hidden"
                href="/job?job_categories=thuc-tap-sinh"
              >
                Join now
              </Button>

              <Button
                type="link"
                href="/job?job_categories=thuc-tap-sinh"
                className="desktop:hidden"
                fullWidth
              >
                Join now
              </Button>

              <MoreInfo
                title="Get the latest job updated from us"
                type="secondary"
                href="/job"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
