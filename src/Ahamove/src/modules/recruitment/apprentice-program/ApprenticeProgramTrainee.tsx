import Image from 'next/image';
import Button from '@/components/Button';

export default function ApprenticeProgramTrainee() {
  return (
    <section>
      <div className="max-w-8xl desktop:px-8 desktop:py-16 mx-auto py-8">
        <div className="desktop:grid-cols-2 grid grid-cols-1 gap-12">
          <div className="flex flex-col items-start justify-center px-4">
            <h3 className="text-title32 desktop:text-title42 font-bold text-black">
              Who is our Trainee?
            </h3>
            <p className="text-body16 mt-3 font-medium text-black">
              That's you - the young people who have a passion for discovery and
              movement:
            </p>
            <ul className="text-body16 mt-6 mb-9 flex list-inside list-disc flex-col space-y-2 font-medium text-black">
              <li>
                Final year students or fresh graduates at universities in
                Southeast Asia.
              </li>
              <li>
                Have a passion for working in the field of technology and
                instant delivery services.
              </li>
              <li>
                Good interpersonal skills to communicate, interact and work
                effectively with individuals and groups.
              </li>
            </ul>
            <Button
              type="link"
              href="/job?job_categories=thuc-tap-sinh"
              className="desktop:block hidden"
            >
              Join now
            </Button>
            <Button
              type="link"
              fullWidth
              href="/job?job_categories=thuc-tap-sinh"
              className="desktop:hidden"
            >
              Join now
            </Button>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-[13/10] h-auto w-full">
              <Image
                src="/static/images/recruitment/apprentice-trainee.webp"
                alt=""
                layout="fill"
                className="z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}