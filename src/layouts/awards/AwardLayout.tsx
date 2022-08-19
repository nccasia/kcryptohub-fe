import AwardList from "@/components/awards/AwardList";
import React, { ReactNode } from "react";
interface AwardLayoutProps {
  children: ReactNode;
}
const AwardLayout = ({ children }: AwardLayoutProps) => {
  return (
    <div className="container mx-auto grid grid-cols-12 gap-5 my-10">
      <AwardList />
      <div className="col-span-12 md:col-span-9 bg-white p-3 font-nunito shadow-lg rounded-3xl">
        {children}
      </div>
    </div>
  );
};

export default AwardLayout;
