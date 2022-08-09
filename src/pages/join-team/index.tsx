import { memberApi } from "@/api/member-api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
          if (res?.status === 400) return;
          if (res?.status === 404) {
            router.push("/404");
          } else {
            router.push(`/team/${teamId}`);
          }
        });
      })();
    }
  }, [router, teamId]);

  return <></>;
};

export default JoinTeamID;
