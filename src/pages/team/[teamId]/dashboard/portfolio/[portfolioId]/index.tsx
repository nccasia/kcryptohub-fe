import { PortfolioApi } from "@/api/portfolio-api";
import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { SelectField } from "@/components/portfolio/SelectField";
import { useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { IPortfolio } from "@/type/team/team.type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddPhotoAlternate,
  DesktopWindowsOutlined,
  LockOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";



const PortfolioDetail = () => {


  const [teamId, setTeamId] = useState<number>(NaN);
  const [portfolioId, setPortfolioId] = useState<number>(NaN);
  const router = useRouter();
  useEffect(() => {
    if (router.query.teamId) {
      setTeamId(Number(router.query.teamId));
    }
    if (router.query.portfolioId)   
    {
      setPortfolioId(Number(router.query.portfolioId));
    }
  }, [router.query]);


  return (
    <ManagePortfolio>
      <Link href={`/team/${teamId}/dashboard/portfolio/${portfolioId}/edit`}>
        <a>Edit</a>
      </Link>
    </ManagePortfolio>
  );
};

export default PortfolioDetail;
