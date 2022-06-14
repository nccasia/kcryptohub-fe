import { Step1Img } from "@/components/IconSVG/step1";
import { Step2Img } from "@/components/IconSVG/Step2";
import { Step3Img } from "@/components/IconSVG/Step3";
import { Step4Img } from "@/components/IconSVG/Step4";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const Portfolio = () => {

  return (
    <ManagePortfolio>
      <div>
        <div className="lg:border-b-0 border-b mb-2 pb-2">
          <h1 className="text-3xl">Add Portfolio Items</h1>
          <Typography className="text-xl my-3">
            Share your latest exciting work.
          </Typography>
          <p className="text-gray-500 text-sm">
            This is replacing your current Portfolio and will help you to share
            more of your past and current work with potential buyers. You can
            now upload content without an image or video if that’s not relevant
            to the work you performed.
          </p>
        </div>
        <div className="relative">
          <div className="xl:max-w-[450px] xl:absolute right-4 top-4">
            <h1 className="text-3xl">Add a Portfolio Item today!</h1>
            <p className="text-sm">
              We recommend that vendors add information on their past projects
              to help buyers understand the value that your company can bring to
              them and showcase examples of work that you have performed.
            </p>
            <Link href={"/manage-teams/portfolio/new"}>
              <a
                className="px-4 py-2 w-fit bg-red-500 font-semibold text-white  flex justify-center items-center cursor-pointer border-2 border-red-500
               hover:bg-transparent hover:text-red-500"
              >
                Add a Portfolio Item
              </a>
            </Link>
          </div>
          <div className="p-4 max-w-[650px]">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4">
              <h1 className="text-lg">1. Add a new Portfolio Item</h1>
              <Step1Img />
            </div>
          </div>
          <div className="p-4 max-w-[650px] flex justify-end">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4">
              <h1 className="text-lg">2. Fill out the Client Information</h1>
              <Step2Img />
            </div>
          </div>
          <div className="p-4 max-w-[650px]">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4">
              <h1 className="text-lg">3. Add the Portfolio Item Details</h1>
              <Step3Img />
            </div>
          </div>
          <div className="p-4 max-w-[650px] flex justify-end">
            <div className="flex flex-col items-center justify-center max-w-[300px] shadow-xl shadow-indigo-100 rounded-xl p-4">
              <h1 className="text-lg">4. Set the Privacy Setting</h1>
              <Step4Img />
            </div>
          </div>
          <footer className="text-gray-500 max-w-[300px] text-sm md:absolute bottom-4 left-4">
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
          <Link href={"/manage-teams/portfolio/new"}>
            <a
              className="px-4 py-2 w-fit bg-red-500 font-semibold text-white  flex justify-center items-center cursor-pointer border-2 border-red-500
               hover:bg-transparent hover:text-red-500"
            >
              Add a Portfolio Item
            </a>
          </Link>
        </div>
      </div>
    </ManagePortfolio>
  );
};

export default Portfolio;
