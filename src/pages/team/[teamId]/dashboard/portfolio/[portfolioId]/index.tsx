import { PortfolioApi } from "@/api/portfolio-api";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { EPrivacy, IPortfolio } from "@/type/team/team.type";
import {
  ApiOutlined,
  CalendarMonthOutlined,
  DeleteOutline,
  InsertLinkOutlined,
  LabelOutlined,
  LockOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

const PortfolioDetail = () => {
  const [teamId, setTeamId] = useState<number>(NaN);
  const [portfolioId, setPortfolioId] = useState<number>(NaN);
  const [portfolio, setPortfolio] = useState<IPortfolio>({} as IPortfolio);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query.teamId) {
      setTeamId(Number(router.query.teamId));
    }
    if (router.query.portfolioId) {
      setPortfolioId(Number(router.query.portfolioId));
    }
  }, [router.query]);

  useEffect(() => {
    if (!isNaN(portfolioId)) {
      PortfolioApi.getPortfolio(portfolioId)
        .then((portfolio) => {
          if (portfolio) {
            setPortfolio(portfolio);
          } else {
            toast.error("failed get portfolio info");
          }
        })
        .catch((err) => {
          toast.error("failed get portfolio info");
        });
    }
  }, [portfolioId]);

  useEffect(() => {
    if (isDeleting) {
      PortfolioApi.deletePortfolio(portfolioId)
        .then((res) => {
          if (res) {
            toast.success("Portfolio delete successfull");
            router.push(`/team/${teamId}/dashboard/portfolio`);
          } else {
            toast.error("Failed delete portfolio");
            setIsDeleting(false);
          }
        })
        .catch((err) => {
          toast.error("Failed delete portfolio");
          setIsDeleting(false);
        });
    }
  }, [isDeleting]);
  const handleDelte = () => {
    setIsDeleting(true);
  };
  return (
    <ManagePortfolio>
      <div className="w-full">
        <div className="flex items-center justify-between border-b ">
          <h1 className="text-2xl font-medium break-all">{portfolio.title}</h1>
          <span className="text-cyan-900 text-xs ">
            <LockOutlined className="text-sm" /> {EPrivacy[portfolio.privacy]}
          </span>
        </div>
        <div className="grid grid-cols-12 border-b">
          <div className="md:col-span-3 sm:col-span-4 col-span-12 flex flex-col items-start border-r p-4 ">
            {portfolio.clientWebsite ? (
              <a
                className="break-all"
                href={portfolio.clientWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InsertLinkOutlined className="text-sm mr-2" />{" "}
                {portfolio.clientWebsite}
              </a>
            ) : null}
            {portfolio.category ? (
              <span className="text-sm">
                {" "}
                <ApiOutlined className="text-sm mr-2" />
                {portfolio.category}
              </span>
            ) : null}
            {portfolio.estimate ? (
              <span className="text-sm">
                <LabelOutlined className="text-sm mr-2" />
                {portfolio.estimate}
              </span>
            ) : null}
            {portfolio.startDate ? (
              <span className="text-sm">
                <CalendarMonthOutlined className="text-sm mr-2" />
                {portfolio.startDate}
                {portfolio.endDate ? " to " + portfolio.endDate : null}
              </span>
            ) : null}
          </div>
          <div className="md:col-span-9 sm:col-span-8 col-span-12 p-4 break-words w-full">
            <p className="break-words">{portfolio.description}</p>
          </div>
        </div>
        {portfolio.imageUrl ? (
          <div className="h-[200px] sm:h-[300px] relative">
            <Image
              src={
                PortfolioApi.getPortfolioImageUrl(portfolio.imageUrl) || "/user1.png"
              }
              alt="img"
              layout="fill"
              objectFit={"contain"}
            />
          </div>
        ) : null}
        {portfolio.videoLink ? (
          <div className="w-full flex items-center justify-center">
            <a className="break-all" href={portfolio.videoLink}>
              {portfolio.videoLink}
            </a>
          </div>
        ) : null}
        <div className="flex flex-col-reverse xs:flex-row items-center justify-between p-2">
          <Link href={`#`}>
            <a onClick={handleDelte} className="py-4 xs:py-0">
              Delete Portfolio Item{" "}
              <DeleteOutline className="text-md text-secondary" />
            </a>
          </Link>
          <Link
            href={`/team/${teamId}/dashboard/portfolio/${portfolioId}/edit`}
          >
            <a
              className="px-4 py-2 w-fit bg-secondary text-white  flex justify-center items-center cursor-pointer border-2 border-secondary
               hover:bg-transparent hover:text-secondary"
            >
              Edit Portoflio Item
            </a>
          </Link>
        </div>
      </div>
    </ManagePortfolio>
  );
};

export default PortfolioDetail;
