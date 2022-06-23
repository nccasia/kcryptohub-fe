import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.teamId) {
      router.push(`/team/${router.query.teamId}/dashboard`);
    }
  }, [router, router.query.teamId]);
  return <div></div>;
};

export default Dashboard;
