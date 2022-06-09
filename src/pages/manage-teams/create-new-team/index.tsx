import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getSkillsSelector } from "@/redux/selector";
import { CreateForm } from "@/src/layouts/create-team/Create-form";
import { ServicesLine } from "@/src/layouts/create-team/Services-line";
import { Layout } from "@/src/layouts/layout";
import { Skill } from "@/type/Skill";
import {
  ISkillDistribution,
  ISkillDistributionValue,
} from "@/type/skill/skill.types";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "chart.js/auto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

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

const CreateNewTeam = () => {
  const { data } = useSession();
  const dispatch = useAppDispatch();

  const skills = useAppSelector(getSkillsSelector);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState("");

  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [listSkill, setListSkill] = useState<ISkillDistribution[]>([]);

  const router = useRouter();

  const [dataSkill, setData] = useState<Skill[]>([]);
  const [dataSkillDistribute, setDataSkillDistribute] = useState<
    ISkillDistribution[]
  >([]);
  const [distributionValue, setDistributionValue] = useState<
    ISkillDistributionValue[]
  >([{ field: "", quantity: 0 } as ISkillDistributionValue]);
  const [distributionValueForm, setDistributionValueForm] = useState(
    {} as ISkillDistribution
  );

  const skillDistribution: ISkillDistribution[] = [
    {
      id: "1",
      skillDistributionName: "team",
      skillDistributionValue: [
        {
          field: "Devops",
          quantity: 0,
        },
        {
          field: "Design UI/UX",
          quantity: 0,
        },
      ],
    },
  ];

  const dataChart = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgb(27, 133, 206)",
          "rgb(8, 83, 126)",
          "rgb(38, 124, 135)",
          "rgb(98, 186, 86)",
          "rgb(93, 153, 126)",
          "rgb(75, 169, 139)",
          "rgb(58, 204, 96)",
          "rgb(106, 149, 125)",
        ],
        hoverBackgroundColor: [
          "rgb(27, 133, 206)",
          "rgb(8, 83, 126)",
          "rgb(38, 124, 135)",
          "rgb(98, 186, 86)",
          "rgb(93, 153, 126)",
          "rgb(75, 169, 139)",
          "rgb(58, 204, 96)",
          "rgb(106, 149, 125)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      if (Math.ceil(i.size / 1024) <= 15000 && i.type.includes("image")) {
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      } else if (!i.type.includes("image")) {
        toast.error("File upload must have .jpg, .jpge, .png!");
        setImage(null);
      } else {
        toast.error("File upload is over 15MB!");
        setImage(null);
      }
    }
  };

  const handleAutocompleteOption = () => {
    const userSkillIdList = dataSkill.map((skill) => skill.id);
    const restArrSkill = skills.filter(
      (skill) => !userSkillIdList.includes(skill.id)
    );
    return restArrSkill || [];
  };
  const handleSearchSkill = (e: SyntheticEvent) => {
    let isExists = false;
    if ((e.target as HTMLInputElement).value.trim() !== "") {
      skills.map((skill) => {
        if (skill.skillName === (e.target as HTMLInputElement).value) {
          isExists = true;
        }
      });
      if (!isExists) {
        const newArrSkill = [
          ...dataSkill,
          { id: null, skillName: (e.target as HTMLInputElement).value },
        ];
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleOnchange = (e: any) => {
    const formData = e.target as HTMLFormElement;
    setDistributionValueForm({
      ...distributionValueForm,
      [formData.name]: formData.value,
    });
  };

  const handleCloseModal = () => {
    setDistributionValue([
      {
        quantity: 0,
        field: "",
      },
    ] as ISkillDistributionValue[]);
  };

  const handleAddField = () => {
    setDistributionValue([...distributionValue, { quantity: 0, field: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const list = [...distributionValue];
    list.splice(index, 1);
    setDistributionValue(list);
  };

  const handleChangeField = (e: any, index: number) => {
    const list = [...distributionValue];
    list[index] = {
      ...list[index],
      [e.target.name]: e.target.value,
    };
    setDistributionValue(list);
    setDistributionValueForm({
      ...distributionValueForm,
      skillDistributionValue: list,
    });
  };

  const handleSaveField = () => {
    setDataSkillDistribute([...dataSkillDistribute, distributionValueForm]);
    setDistributionValueForm({
      skillDistributionName: "",
      skillDistributionValue: [],
    } as unknown as ISkillDistribution);
    setDistributionValue([
      {
        quantity: 0,
        field: "",
      },
    ] as ISkillDistributionValue[]);
  };

  const nextStep = () => {
    if (step === 0) {
      setStep((cur) => cur + 1);
    }
  };

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container
          fixed
          maxWidth="lg"
          className="border border-[#cae0e7] md:!px-8"
        >
          <div>
            <h1 className="xl:text-4xl text-2xl lg:text-3xl text-primary py-5 font-[400] font-['Roboto, sans-serif'] ">
              Create Your Team Profile
            </h1>
            <div className="md:block hidden">
              <div className="flex pt-10 pb-5">
                <div className="flex-[50%] relative px-2 xl:text-xl text-sm lg:text-lg text-white bg-[#08537e] mr-1">
                  {step === 0 && (
                    <div className="absolute bottom-[40px] text-black right-0 flex justify-end items-center">
                      <div className="mr-2 xl:text-lg relative text-xs lg:text-base">
                        Create Team Profile
                      </div>
                      <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                        50%
                      </div>
                    </div>
                  )}
                  Enter Team Information
                </div>

                <div
                  className={
                    "flex-[50%] px-2 xl:text-xl items-center relative text-sm lg:text-lg transition-all duration-500 ease-in-out " +
                    (step === 0
                      ? "bg-[rgba(62,131,158,.25)]"
                      : "bg-[#08537e] text-white")
                  }
                >
                  {step === 1 && (
                    <div className="absolute bottom-[40px] text-black right-0 flex justify-end items-center">
                      <div className="mr-2 xl:text-lg relative text-xs lg:text-base">
                        Add Skill Distribution
                      </div>
                      <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                        100%
                      </div>
                    </div>
                  )}
                  Add Skill Distribution
                </div>
              </div>
            </div>
            <h2 className=" xl:text-3xl text-xl lg:text-2xl text-primary font-[400] font-['Roboto, sans-serif'] ">
              {step === 0 ? "Enter Team Information" : "Add Skill Distribution"}
            </h2>
          </div>
          {step === 0 && <CreateForm nextStep={nextStep} />}
          {step === 1 && (
            <ServicesLine
              setListSkill={setListSkill}
              setStep={setStep}
              skills={skillDistribution}
              step={step}
              distributionValue={distributionValue}
              listSkill={listSkill}
              value={value}
              setValue={setValue}
              options={options}
              dataChart={dataChart}
              handleChange={handleChange}
              open={open}
            />
          )}
        </Container>
      </ThemeProvider>

      <ToastContainer autoClose={2000} position="bottom-right" />
    </Layout>
  );
};

export default CreateNewTeam;
