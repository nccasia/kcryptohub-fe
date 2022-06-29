import { PortfolioApi } from "@/api/portfolio-api";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { EPrivacy, IPortfolio } from "@/type/team/team.type";
import { ApiOutlined, CalendarMonthOutlined, DeleteOutline, InsertLinkOutlined, LabelOutlined, LockOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image"

const PortfolioDetail = () => {
  const [teamId, setTeamId] = useState<number>(NaN);
  const [portfolioId, setPortfolioId] = useState<number>(NaN);
  const [portfolio, setPortfolio] = useState<IPortfolio>({} as IPortfolio);
  const [ isDeleting, setIsDeleting ] = useState(false);
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
  },[portfolioId]);

  useEffect(() => {
    if(isDeleting){
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
  },[isDeleting])
  const handleDelte = () => {
    setIsDeleting(true);
  };
  return (
    <ManagePortfolio>
      <div className="">
        <div className="flex items-center justify-between border-b ">
          <h1 className="text-2xl font-medium">{portfolio.title}</h1>
          <span className="text-cyan-900 text-xs ">
            <LockOutlined className="text-sm" /> {EPrivacy[portfolio.privacy]}
          </span>
        </div>
        <div className="flex border-b md:flex-row flex-col">
          <div className="flex flex-col items-start border-r p-4 min-w-[250px]">
            {portfolio.clientWebsite ? (
              <a
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
          <div className="p-4 break-all">
            <p>{portfolio.description}</p>
          </div>
        </div>
        {portfolio.imageUrl ? (
          <div className="w-full flex items-center justify-center">
            <Image
              src={
                "https://kryptohub-be.herokuapp.com/api/portfolio/getImage/" +
                  portfolio.imageUrl || "/user1.png"
              }
              alt="img"
              width={300}
              height={300}
            />
          </div>
        ) : null}
        {portfolio.videoLink ? (
          <div className="w-full flex items-center justify-center overflow-hidden">
            <a href={portfolio.videoLink}>{portfolio.videoLink}</a>
          </div>
        ) : null}
        <div className="flex flex-col sm:flex-row items-center justify-between p-2">
          <Link href={`#`}>
            <a onClick={handleDelte} className="m-2 sm:m-0">
              Delete Portfolio Item{" "}
              <DeleteOutline className="text-md text-secondary " />
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
