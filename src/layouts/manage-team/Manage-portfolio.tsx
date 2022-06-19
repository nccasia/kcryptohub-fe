import { PortfolioApi } from "@/api/portfolio-api";
import { IPortfolio } from "@/type/team/team.type";
import { PlaylistAddOutlined } from "@mui/icons-material";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useContext, useEffect, useState
} from "react";
import { Provider, useSelector } from "react-redux";
import { Layout } from "../layout";

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
  const [portfolios, setPortfolios] = useState<any[]>([]);
  
  const router = useRouter();
  const [teamId, setTeamId] = useState<string>(router.query.teamId as string);
  useEffect(() => {
    if (router.query.teamId) {
      PortfolioApi.getAll(parseInt(router.query.teamId as string)).then(
        (res) => {
          setPortfolios(res);
        }
      );
    }
  }, [router.query.teamId]);
  useEffect(() => {
    if(router.query.teamId){
      setTeamId(router.query.teamId as string);
    };
  }, [router.query]);
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className="w-full h-full bg-gray-200 p-4">
          <Container fixed maxWidth="lg" className="h-full">
            <div className="flex  lg:flex-row flex-col h-full">
              <div className="lg:max-w-[280px] w-full lg:min-h-full bg-white flex flex-col p-2 lg:mr-4 lg:mb-0 mb-4">
                <div className="mb-2">
                  <h1 className="text-3xl font-normal">My portfolio</h1>
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
                </div>
                <hr />
                <div className="py-2 text-cyan-800 hover:underline">
                  <Link href={`/team/${teamId}/dashboard/portfolio/clients`}>
                    <a>Key Clients</a>
                  </Link>
                </div>
                <hr />
                <div className="">
                  {portfolios.map((portfolio, i) => (
                    <div key={i} className="py-2 text-cyan-800 hover:underline">
                      <Link
                        href={`/team/${teamId}/dashboard/portfolio/${portfolio.id}`}
                      >
                        <a>{portfolio.title}</a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white h-full w-full p-4">{props.children}</div>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </Layout>
  );
};
