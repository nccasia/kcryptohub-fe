import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { joinTeam, resetSuccess } from "@/redux/memberSlice";
import { getUserInfoSelector } from "@/redux/selector";
import { RootState } from "@/redux/store";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { Layout } from "@/src/layouts/layout";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  const dispatch = useAppDispatch();
  const actionSuccess = useSelector(
    (state: RootState) => state.MemberReducer.success
  );
  // const InviteNotExist = useSelector(
  //   (state: RootState) => state.MemberReducer.error
  // );

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
        await dispatch(joinTeam(parseInt(teamId as string)));
      })();
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    if (actionSuccess) {
      router.push(`/team/${teamId}`);
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 1500);
    }
  }, [actionSuccess, dispatch, teamId]);

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
