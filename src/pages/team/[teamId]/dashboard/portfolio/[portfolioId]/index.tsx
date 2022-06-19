import { PortfolioApi } from "@/api/portfolio-api";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { EPrivacy, IPortfolio } from "@/type/team/team.type";
import { DeleteOutline, LockOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PortfolioDetail = () => {
  const [teamId, setTeamId] = useState<number>(NaN);
  const [portfolioId, setPortfolioId] = useState<number>(NaN);
  const [portfolio, setPortfolio] = useState<IPortfolio>({} as IPortfolio);
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

  const handleDelte = () => {
    PortfolioApi.deletePortfolio(portfolioId)
      .then((res) => {
        if (res) {
          toast.success("success delete portfolio");
          router.push(`/team/${teamId}/dashboard/portfolio`);
        } else {
          toast.error("failed delete portfolio");
        }
      })
      .catch((err) => {
        toast.error("failed delete portfolio");
      });
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
        <div className="flex border-b">
          <div className="flex flex-col items-start border-r p-4">
            {portfolio.clientWebsite ? (
              <a
                href={portfolio.clientWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                {portfolio.clientWebsite}
              </a>
            ) : null}
            {portfolio.category ? (
              <span className="text-sm">{portfolio.category}</span>
            ) : null}
            {portfolio.estimate ? (
              <span className="text-sm">{portfolio.estimate}</span>
            ) : null}
            {portfolio.startDate ? (
              <span className="text-sm">
                {portfolio.startDate}
                {portfolio.endDate ? " to " + portfolio.endDate : null}
              </span>
            ) : null}
          </div>
          <div className="p-4">
            <p>{portfolio.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-2">
          <Link href={`#`}>
            <a onClick={handleDelte}>
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
