import { useAppSelector } from "@/redux/hooks";
import { ESection, IPortfolio } from "@/type/team/team.type";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import React, { MutableRefObject, useState } from "react";
import { IconMap } from "@/components/IconSVG/IconMap";
export interface PortfolioProps {
  portfolioRef: MutableRefObject<null | HTMLElement>;
  handleScrollToSection: Function;
}
const Portfolio = ({ portfolioRef, handleScrollToSection }: PortfolioProps) => {
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);

  const handleRenderClientKey = () => {
    if (teamProfile.portfolios) {
      return teamProfile.portfolios.map((item) => item.companyName).join(", ");
    }
    return "";
  };

  const handleYoutubeThumbnail = (url: string) => {
    var video_id: string = "",
      thumbnail: string,
      result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop() as string;
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop() as string;
    }

    if (video_id) {
      var thumbnail =
        "http://img.youtube.com/vi/" + video_id + "/maxresdefault.jpg";
      return thumbnail;
    }
  };

  const handleYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? "https://www.youtube.com/embed/" + match[2]
      : "";
  };
  return (
    <section
      ref={portfolioRef}
      className="px-8 py-3 border-x border-b border-[#cae0e7]"
    >
      <h2 className="text-xl text-[#154369] mb-5">Portfolio</h2>
      {handleRenderClientKey() && (
        <p className="text-sm text-[#6b7a7e] w-4/5 mb-5">
          Key client: {handleRenderClientKey()}
        </p>
      )}
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
            {portfolio?.videoLink && (
              <iframe
                src={handleYoutubeEmbedUrl(portfolio.videoLink)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="hidden md:block w-full h-80"
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
            {portfolio?.videoLink && (
              <iframe
                src={handleYoutubeEmbedUrl(portfolio.videoLink!)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="block md:hidden mb-3 w-full h-80"
              />
            )}
            <p className="text-sm text-[#6A797D] whitespace-pre-line">
              {portfolio?.description}
            </p>
          </div>
        </div>
      )}
      {!teamProfile.portfolios?.length && (
        <div className="flex items-center gap-x-2">
          <Link href="#">
            <a className="text-sm text-[#3e839e] hover:underline">
              Add Portfolio
            </a>
          </Link>
          <div className="w-4 h-4 flex-none relative">
            <Image
              width="16"
              height="16"
              src={IconMap.Pen.src}
              alt="avatar"
              layout="responsive"
            />
          </div>
        </div>
      )}
      {teamProfile.portfolios?.length > 0 && (
        <div className="grid xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          {teamProfile.portfolios.map((item, index) => {
            if (index <= 5) {
              return (
                <div
                  key={index}
                  className="relative cursor-pointer overflow-hidden group"
                  onClick={() => setPortfolio(item)}
                >
                  <img
                    src={
                      item?.imageUrl
                        ? item?.imageUrl!
                        : handleYoutubeThumbnail(item.videoLink!)
                    }
                    alt="portfolio"
                    className="w-full h-full group-hover:scale-125 transition duration-1000 ease-in-out"
                  />
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
                  <img
                    src={
                      item?.imageUrl
                        ? item?.imageUrl!
                        : handleYoutubeThumbnail(item.videoLink!)
                    }
                    alt="portfolio"
                    className="w-full h-full group-hover:scale-125 transition duration-1000 ease-in-out"
                  />
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
      )}

      {teamProfile.portfolios?.length > 6 && !isShowAll && (
        <span
          className="text-xs text-[#3e839e] tracking-widest cursor-pointer hover:underline"
          onClick={() => setIsShowAll(true)}
        >
          SHOW ALL +
        </span>
      )}
      {teamProfile.portfolios?.length > 6 && isShowAll && (
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
