import { Step1Img } from "@/components/IconSVG/step1";
import { Step2Img } from "@/components/IconSVG/Step2";
import { Step3Img } from "@/components/IconSVG/Step3";
import { Step4Img } from "@/components/IconSVG/Step4";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const router = useRouter();
  const [teamId, setTeamId] = useState(router.query.teamId as string);
  useEffect(() => {
    if (router.query.teamId) {
      setTeamId(router.query.teamId as string);
    }
  }, [router.query]);

  return (
    <ManagePortfolio>
      <div>
        <div className="lg:border-b-0 border-b mb-2 pb-2 ">
          <h1 className="text-3xl 3xl:text-4xl">Add Portfolio Items</h1>
          <Typography className="text-xl 3xl:text-2xl my-3">
            Share your latest exciting work.
          </Typography>
          <p className="text-gray-500 text-sm 3xl:text-2xl">
            This is replacing your current Portfolio and will help you to share
            more of your past and current work with potential buyers. You can
            now upload content without an image or video if that’s not relevant
            to the work you performed.
          </p>
        </div>
        <div className="relative">
          <div className="xl:max-w-[450px] xl:absolute right-4 top-4 flex flex-col items-center justify-center xs:block">
            <h1 className="text-3xl 3xl:text-4xl">
              Add a Portfolio Item today!
            </h1>
            <p className="text-sm 3xl:text-2xl my-3">
              We recommend that vendors add information on their past projects
              to help buyers understand the value that your company can bring to
              them and showcase examples of work that you have performed.
            </p>
            <Link href={`/team/${teamId}/dashboard/portfolio/new`}>
              <a className="px-8 py-3 w-fit 3xl:text-xl bg-[#848ABD] font-semibold text-white  flex justify-center items-center cursor-pointer rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]">
                Add a Portfolio Item
              </a>
            </Link>
          </div>
          <div className="p-4 max-w-[650px]">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4 w-full ">
              <h1 className="text-lg 3xl:text-xl mb-2">
                1. Add a new Portfolio Item
              </h1>
              <Step1Img />
            </div>
          </div>
          <div className="p-4 max-w-[650px] flex justify-end">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4 w-full">
              <h1 className="text-lg 3xl:text-2xl mb-2">
                2. Fill out the Client Information
              </h1>
              <Step2Img />
            </div>
          </div>
          <div className="p-4 max-w-[650px]">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4 w-full">
              <h1 className="text-lg 3xl:text-2xl mb-2">
                3. Add the Portfolio Item Details
              </h1>
              <Step3Img />
            </div>
          </div>
          <div className="p-4 max-w-[650px] flex justify-end">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4 w-full">
              <h1 className="text-lg 3xl:text-2xl mb-2">
                4. Set the Privacy Setting
              </h1>
              <Step4Img />
            </div>
          </div>
          <footer className="text-gray-500 max-w-[300px] text-sm 3xl:text-xl md:absolute bottom-4 left-4">
            <strong>Attention</strong>: if you want to showcase the item on your
            profile, make sure there is an image or video attached.
            <br></br>
            <em>
              Coming Soon: Display of Portfolio Item without Images or Videos!
            </em>
          </footer>
        </div>
        <hr />
        <div className="p-3 flex justify-end">
          <Link href={`/team/${teamId}/dashboard/portfolio/new`}>
            <a className="px-4 py-2 w-fit bg-[#848ABD] font-semibold text-white 3xl:text-2xl  flex justify-center items-center cursor-pointer rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]">
              Add a Portfolio Item
            </a>
          </Link>
        </div>
      </div>
    </ManagePortfolio>
  );
};

export default Portfolio;
