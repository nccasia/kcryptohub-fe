import { memberApi } from "@/api/member-api";
import { Layout } from "@/src/layouts/layout";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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

const JoinTeamID = () => {
  const router = useRouter();
  const { teamId } = router.query;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      if (router.isReady) {
        router.push({
          pathname: "/login",
          query: { url: router.asPath },
        });
      }
    } else {
      (async () => {
        await memberApi.joinTeam(parseInt(teamId as string)).then((res) => {
          if (res.status === 404) {
            router.push("/404");
            return;
          } else {
            router.push(`/team/${teamId}`);
          }
        });
      })();
    }
  }, [router, teamId]);

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container>
          <h1>Joining team...</h1>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default JoinTeamID;
