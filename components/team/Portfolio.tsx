import { useAppSelector } from "@/redux/hooks";
import { ESection, IPortfolio } from "@/type/team/team.type";
import CloseIcon from "@mui/icons-material/Close";
import React, { MutableRefObject, useState } from "react";
export interface PortfolioProps {
  portfolioRef: MutableRefObject<null | HTMLElement>;
  handleScrollToSection: Function;
}
const Portfolio = ({ portfolioRef, handleScrollToSection }: PortfolioProps) => {
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);

  const handleRenderClientKey = () => {
    if (teamProfile.portfolio) {
      return teamProfile.portfolio.map((item) => item.companyName).join(", ");
    }
  };
  return (
    <section
      ref={portfolioRef}
      className="px-8 py-3 border-x border-b border-[#cae0e7]"
    >
      <h2 className="text-xl text-[#154369] mb-1">Portfolio</h2>
      <p className="text-sm text-[#6b7a7e] w-4/5 mb-5">
        Key client: {handleRenderClientKey()}
      </p>
      {portfolio && (
        <div className="grid grid-cols-1 grid-flow-col-dense md:grid-cols-2 gap-x-3 mb-5">
          <div>
            {portfolio?.imageUrl && (
              <img
                src={portfolio?.imageUrl!}
                alt="portfolio"
                className="hidden md:block w-full"
              />
            )}
          </div>
          <div className="relative">
            <h2 className="text-primary text-2xl pr-8 md:pr-6 mb-10">
              {portfolio?.title}
            </h2>
            <CloseIcon
              className="absolute top-0 right-0 w-10 h-10 cursor-pointer"
              onClick={() => setPortfolio(null)}
            />
            {portfolio?.imageUrl && (
              <img
                src={portfolio?.imageUrl!}
                alt="portfolio"
                className="block md:hidden w-full mb-3"
              />
            )}
            <p className="text-sm text-[#6A797D] whitespace-pre-line">
              {portfolio?.description}
            </p>
          </div>
        </div>
      )}

      <div className="grid xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        {teamProfile.portfolio?.length > 0 &&
          teamProfile.portfolio.map((item, index) => {
            if (index <= 5) {
              return (
                <div
                  key={index}
                  className="relative cursor-pointer overflow-hidden group"
                  onClick={() => setPortfolio(item)}
                >
                  {item?.imageUrl && (
                    <img
                      src={item?.imageUrl!}
                      alt="portfolio"
                      // className="hidden md:block w-full"
                    />
                  )}
                  <span
                    onClick={() => handleScrollToSection(ESection["PORTFOLIO"])}
                    className="px-5 opacity-0 group-hover:opacity-100 transition duration-500 text-white font-medium underline flex items-center justify-center w-full h-full bg-black/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    {item.title}
                  </span>
                </div>
              );
            } else if (isShowAll) {
              return (
                <div
                  key={index}
                  className="relative cursor-pointer overflow-hidden group"
                  onClick={() => setPortfolio(item)}
                >
                  {item?.imageUrl && (
                    <img
                      src={item?.imageUrl!}
                      alt="portfolio"
                      className="hidden md:block w-full"
                    />
                  )}
                  <span
                    onClick={() => handleScrollToSection(ESection["PORTFOLIO"])}
                    className="opacity-0 group-hover:opacity-100 transition duration-500 text-white font-medium underline flex items-center justify-center w-full h-full bg-black/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    {item.title}
                  </span>
                </div>
              );
            }
            return null;
          })}
      </div>
      {teamProfile.portfolio?.length > 6 && !isShowAll && (
        <span
          className="text-xs text-[#3e839e] tracking-widest cursor-pointer hover:underline"
          onClick={() => setIsShowAll(true)}
        >
          SHOW ALL +
        </span>
      )}
      {teamProfile.portfolio?.length > 6 && isShowAll && (
        <span
          className="text-xs text-[#3e839e] tracking-widest cursor-pointer hover:underline"
          onClick={() => setIsShowAll(false)}
        >
          SHOW LESS -
        </span>
      )}
    </section>
  );
};

export default Portfolio;
