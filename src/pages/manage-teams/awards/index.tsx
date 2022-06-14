import AwardList from "@/components/awards/AwardList";
import { Layout } from "@/src/layouts/layout";
import Link from "next/link";

const Awards = () => {
  return (
    <div className="bg-[#e8eef0]">
      <Layout>
        <div className="container mx-auto grid grid-cols-12 gap-5 my-10">
          <AwardList />
          <div className="col-span-12 md:col-span-9 bg-white p-3 shadow-lg">
            <div className="mb-5">
              <h2 className="text-3xl text-primary font-normal mb-3">
                Add Awards
              </h2>
              <span className="text-xl text-primary font-norma">
                Tell us about the awards your company has received.
              </span>
            </div>
            <div>
              <p className="text-sm text-[#6A797D] mb-3">
                We want to know all about your company’s recognitions and
                awards!
              </p>
              <p className="text-sm text-[#6A797D] mb-3">
                Add an award below to tell us where your company has been
                recognized for its accomplishments. This is an opportunity to
                share your recent achievements and industry recognitions with
                Clutch and potential buyers. You do not need to add any Clutch
                Awards you have received; we already know about all of those!
              </p>
              <p className="text-sm text-[#6A797D] mb-3">
                <strong>What qualifies as an award?</strong>
                <br /> Your awards should clearly identify the value that your
                company is being recognized for and what organization is
                awarding the title (for example, “#1 in Inc 500 Fastest Growing
                Companies” or “MediaPost - New York Agency of the Year”). Please
                note: we do not recognize awards from certain sites that do not
                meet our quality standards.
              </p>
            </div>
            <Link href="awards/new" passHref>
              <button className="bg-secondary text-white mt-6 px-10 py-3 border-2 border-transparent transition duration-300 hover:border-secondary hover:bg-white hover:text-secondary">
                Add a New Award
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Awards;
