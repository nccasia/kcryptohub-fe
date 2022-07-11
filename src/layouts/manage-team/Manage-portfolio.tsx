import { PortfolioApi } from "@/api/portfolio-api";
import { useAppSelector } from "@/redux/hooks";
import { getDashboardPortfolioSelector } from "@/redux/selector";
import { KeyboardArrowDown, KeyboardArrowUp, PlaylistAddOutlined } from "@mui/icons-material";
import { Collapse, Container, createTheme, ThemeProvider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
   useEffect, useState
} from "react";
import DashboardLayout from "../dashboard/Dashboard";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: "2px solid #cae0e7",
          "&.Mui-focused": {
            borderColor: "#17313b",
            boxShadow:
              "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
          },
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export const ManagePortfolio = (props: Props) => {
  const portfolios = useAppSelector(getDashboardPortfolioSelector);
  
  const router = useRouter();
  const [teamId, setTeamId] = useState<string>(router.query.teamId as string);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if(router.query.teamId){
      setTeamId(router.query.teamId as string);
    };
  }, [router.query]);
  return (
    <DashboardLayout>
      <ThemeProvider theme={theme}>
        <div className="w-full h-full bg-thirdary py-4">
          <div  className="container mx-auto h-full">
            <div className="grid grid-cols-12 gap-5  h-full">
              <div className="md:col-span-3 col-span-12 lg:min-h-full bg-white flex flex-col p-2 lg:mr-4 lg:mb-0 mb-4">
                <div className="mb-2 lg:flex hidden items-center justify-between">
                  <h1 className="text-3xl font-normal">My portfolio</h1>
                </div>
                <div
                  className="mb-2 lg:hidden flex items-center justify-between"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <h1 className="text-3xl font-normal">My portfolio</h1>
                  {show ? (
                    <KeyboardArrowDown className="text-2xl text-secondary" />
                  ) : (
                    <KeyboardArrowUp className="text-2xl text-secondary" />
                  )}
                </div>
                <Collapse in={show}>
                  <p className="text-sm my-4">
                    The Portfolio items listed will be displayed on your Profile
                    page in the order below.
                  </p>
                  <div className="w-full text-right text-cyan-800 hover:underline">
                    <Link href={`/team/${teamId}/dashboard/portfolio/new`}>
                      <a className="">
                        Add A New Portfolio Item{" "}
                        <PlaylistAddOutlined className="text-secondary " />
                      </a>
                    </Link>
                  </div>
                  <hr />
                  <div className="py-2 text-cyan-800 hover:underline">
                    <Link href={`/team/${teamId}/dashboard/portfolio/clients`}>
                      <a>Key Clients</a>
                    </Link>
                  </div>
                  <hr />
                  <div className="break-words">
                    {portfolios.map((portfolio, i) => (
                      <div
                        key={i}
                        className="py-2 text-cyan-800 hover:underline"
                      >
                        <Link
                          href={`/team/${teamId}/dashboard/portfolio/${portfolio.id}`}
                        >
                          <a>{portfolio.title}</a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
              <div className="bg-white h-full col-span-12 md:col-span-9 p-4">{props.children}</div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </DashboardLayout>
  );
};
