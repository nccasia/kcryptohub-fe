import { useAppSelector } from "@/redux/hooks";
import { ESection, IPortfolio } from "@/type/team/team.type";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import React, { MutableRefObject, useState } from "react";
import { IconMap } from "@/components/IconSVG/IconMap";
import { useRouter } from "next/router";
import { PortfolioApi } from "@/api/portfolio-api";
import { Add, PlusOne } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export interface PortfolioProps {
  portfolioRef: MutableRefObject<null | HTMLElement>;
  handleScrollToSection: Function;
  editable: boolean;
}
const Portfolio = ({
  portfolioRef,
  handleScrollToSection,
  editable,
}: PortfolioProps) => {
  const router = useRouter();
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
        "http://img.youtube.com/vi/" + video_id + "/hqdefault.jpg";
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
    <section ref={portfolioRef} className="py-3">
      <h2 className="md:text-[30px] text-[24px] text-[#154369] mb-5">
        Portfolio
      </h2>
      <p className="md:text-[26px] text-[20px] text-[#6b7a7e] w-4/5 mb-5">
        Key client:{" "}
        {teamProfile.keyClients && teamProfile.keyClients.length > 0
          ? (teamProfile.keyClients[0] as any).keyName?.join(", ")
          : ""}
      </p>
      {portfolio && (
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={portfolio ? true : false}
          onClose={() => setPortfolio(null)}
        >
          <div className="w-2/3 m-auto bg-white p-8 translate-y-[18%] rounded-2xl shadow">
            <div className="">
              <div className="hidden md:block w-full">
                {portfolio?.imageUrl ? (
                  <div className="w-full h-[400px] mt-2 mb-3 relative">
                    <Image
                      src={PortfolioApi.getPortfolioImageUrl(
                        portfolio.imageUrl
                      )}
                      alt="portfolio"
                      layout="fill"
                      objectFit={"contain"}
                    />
                  </div>
                ) : null}
                {portfolio?.videoLink && (
                  <iframe
                    src={handleYoutubeEmbedUrl(portfolio.videoLink)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="hidden md:block w-full h-96"
                  />
                )}
              </div>
              <div className="relative">
                <div className="">
                  <h2 className="md:text-[30px] text-[24px] text-center text-2xl my-5 break-words">
                    {portfolio?.title}
                  </h2>
                </div>
                <div className="w-full block md:hidden">
                  {portfolio?.imageUrl ? (
                    <div className="h-[200px] mt-2 mb-3 relative">
                      <Image
                        src={PortfolioApi.getPortfolioImageUrl(
                          portfolio.imageUrl
                        )}
                        alt="portfolio"
                        layout="fill"
                        objectFit={"contain"}
                      />
                    </div>
                  ) : null}
                  {portfolio?.videoLink && (
                    <iframe
                      src={handleYoutubeEmbedUrl(portfolio.videoLink!)}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="mb-3 w-full h-[600px]"
                    />
                  )}
                </div>
                <p className="md:text-[26px] text-[20px] text-[#6A797D] whitespace-pre-line mb-2 break-words">
                  Description: {portfolio?.description}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {!teamProfile.portfolios?.length && editable && (
        <div className="flex items-center gap-x-2">
          <Link
            href={{
              pathname: `/team/[teamId]/dashboard/portfolio`,
              query: { teamId: router.query.teamId },
            }}
          >
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
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
            {teamProfile.portfolios.map((item, index) => {
              if (index <= 5) {
                return (
                  (item.privacy !== 3 || editable) && (
                    <div
                      key={index}
                      className="relative cursor-pointer overflow-hidden group shadow-lg rounded-md"
                      onClick={() => setPortfolio(item)}
                    >
                      <div className="relative">
                        <Image
                          src={
                            item?.imageUrl
                              ? PortfolioApi.getPortfolioImageUrl(item.imageUrl)
                              : handleYoutubeThumbnail(item.videoLink!) ||
                                "/user1.png"
                          }
                          alt="portfolio"
                          className="w-full h-full "
                          layout="intrinsic"
                          width={400}
                          height={450}
                        />
                        <span
                          onClick={() =>
                            handleScrollToSection(ESection["PORTFOLIO"])
                          }
                          className="px-5 opacity-0 hover:opacity-100 transition duration-1000 text-white font-medium underline flex items-center justify-center w-full h-full bg-black/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <span className="w-full break-words text-center">
                            <Add className="text-2xl" />
                          </span>
                        </span>
                      </div>
                      <div className="text-center font-jost p-4">
                        <h3 className="w-full break-words text-2xl font-semibold ">
                          {item.title}
                        </h3>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  )
                );
              } else if (isShowAll) {
                return (
                  <div
                    key={index}
                    className="relative cursor-pointer overflow-hidden group"
                    onClick={() => setPortfolio(item)}
                  >
                    <Image
                      src={
                        item?.imageUrl
                          ? PortfolioApi.getPortfolioImageUrl(item.imageUrl)
                          : handleYoutubeThumbnail(item.videoLink!) || ""
                      }
                      alt="portfolio"
                      className="w-full h-full group-hover:scale-125 transition duration-1000 ease-in-out"
                      width={400}
                      height={200}
                    />
                    <span
                      onClick={() =>
                        handleScrollToSection(ESection["PORTFOLIO"])
                      }
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
        </div>
      )}

      {teamProfile.portfolios?.length > 6 && editable && !isShowAll && (
        <span
          className="text-xs text-[#3e839e] tracking-widest cursor-pointer hover:underline"
          onClick={() => setIsShowAll(true)}
        >
          SHOW ALL +
        </span>
      )}

      {teamProfile.portfolios?.length > 6 && editable && isShowAll && (
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
