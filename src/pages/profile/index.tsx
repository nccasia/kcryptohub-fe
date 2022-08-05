import { profileApi } from "@/api/profile-api";
import { IconMap } from "@/components/IconSVG/IconMap";
import InputField from "@/components/profile/InputField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getProfile,
  getSkills,
  updateProfile,
  uploadAvatar,
} from "@/redux/profileSlice";
import { DragDropField } from "@/src/layouts/create-team/DragDropField";
import { Layout } from "@/src/layouts/layout";
import { ELoginProvider } from "@/type/auth/login.type";
import { IProfile } from "@/type/profile/profile.type";
import { ISkill } from "@/type/skill/skill.types";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Popper,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "1.5rem",
          border: "2px solid transparent",
          "&.Mui-focused": {
            borderColor: "transparent",
            boxShadow: "0px 1px 2px 2px transparent",
          },
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
  },
});

const CustomPaper = (props: any) => {
  return (
    <Paper
      {...props}
      sx={{
        width: "100%",
        borderRadius: "10px",
      }}
    />
  );
};

const schemaValidation = Yup.object({
  username: Yup.string().max(30, "Username dose not exceed 30 character!"),
  emailAddress: Yup.string()
    .email("Please enter a valid email!")
    .max(30, "Email dose not exceed 30 character!"),
  githubAddress: Yup.string()
    .matches(
      /^(https:\/\/)?(www\.)?github\.(com)+\/([A-Za-z0-9]{1,})+\/?$/i,
      "Please enter a valid Github format!"
    )
    .max(50, "Github dose not exceed 50 character!"),
  googleAddress: Yup.string()
    .email("Please enter a valid email!")
    .matches(
      /^[a-zA-Z0-9.]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid Google format!"
    )
    .max(30, "Google dose not exceed 30 character!"),
});

const UpdateProfilePage = () => {
  const router = useRouter();
  const { userInfo, skills } = useAppSelector((state) => state.ProfileReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IProfile>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });
  const [userSkills, setUserSkills] = useState<ISkill[]>(userInfo.skills || []);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<File>();
  useEffect(() => {
    dispatch(getSkills(""));
  }, [dispatch]);

  useEffect(() => {
    reset({
      id: userInfo.id,
      username: userInfo.username,
      emailAddress: userInfo.emailAddress,
      googleAddress: userInfo.googleAddress,
      githubAddress: userInfo.githubAddress,
      status: userInfo.status,
      provider: userInfo.provider,
    });
    if (userInfo.skills) {
      setUserSkills(userInfo.skills);
    }
    if (userInfo.avatarPath) {
      setImageUrl(profileApi.getImageUrl(userInfo.avatarPath));
    }
  }, [reset, userInfo]);

  const handleLogo = () => {
    switch (userInfo.provider?.toUpperCase()) {
      case ELoginProvider[ELoginProvider.GITHUB]: {
        return IconMap.Github.src;
      }
      case ELoginProvider[ELoginProvider.GOOGLE]: {
        return IconMap.Google.src;
      }
      default:
        return IconMap.User.src;
    }
  };

  const handleUpdateProfile = () => {
    handleSubmit(async (value) => {
      await dispatch(updateProfile({ ...value, skills: userSkills }));
      if (image) {
        await dispatch(uploadAvatar({ avatar: image, userId: userInfo.id }));
      }
      await dispatch(getProfile());
      router.push("/");
    })();
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
          ...userSkills,
          { id: null, skillName: (e.target as HTMLInputElement).value },
        ];
        setUserSkills(newArrSkill);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleAutocompleteOption = () => {
    const userSkillIdList = userSkills.map((skill) => skill.id);
    const restArrSkill = skills.filter(
      (skill) => !userSkillIdList.includes(skill.id)
    );
    return restArrSkill || [];
  };

  const handleFileChange = (e: any) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Box>
          <Container
            fixed
            maxWidth="lg"
            className="border border-[#cae0e7] py-6 md:!px-24 md:py-12 font-nunito"
          >
            <form>
              <section>
                <div className="flex gap-x-[8px] mb-8">
                  <span className="text-primary">Logged In With:</span>
                  <span className="flex gap-x-[6px] text-[#6A797D]">
                    <Image
                      width="24"
                      height="24"
                      src={handleLogo()}
                      alt="google"
                    />
                    {userInfo.username}
                  </span>
                </div>
                <h2 className="text-3xl text-primary">Personal Information</h2>
                <div className="md:flex items-center mx-5 my-8">
                  <label className="text-primary min-w-[130px] block py-2 md:py-0">
                    Picture:
                  </label>
                  <div className="flex md:max-w-[400px] w-full items-center gap-x-3">
                    <DragDropField
                      createObjectURL={imageUrl}
                      uploadToClient={handleFileChange}
                      setCreateObjectURL={setImageUrl}
                      setImage={setImage}
                    />
                  </div>
                </div>
                <InputField
                  label="Username"
                  register={register("username")}
                  errors={errors.username}
                />
                <InputField
                  label="Contact Email"
                  register={register("emailAddress")}
                  errors={errors.emailAddress}
                />
              </section>
              <section>
                <h2 className="text-3xl mt-20 text-primary">About</h2>
                <InputField
                  label="Github"
                  placeholder="https://github.com/janedoe"
                  register={register("githubAddress")}
                  errors={errors.githubAddress}
                />
                <InputField
                  label="Google"
                  placeholder="janedoe@gmail.com"
                  register={register("googleAddress")}
                  errors={errors.googleAddress}
                />
                <div className="md:flex items-center mx-5 my-8">
                  <label className="text-primary min-w-[130px] block py-2 md:py-0">
                    Skills:
                  </label>
                  <Autocomplete
                    multiple
                    options={handleAutocompleteOption()}
                    getOptionLabel={(option) => option.skillName}
                    PaperComponent={CustomPaper}
                    value={userSkills}
                    filterSelectedOptions
                    onChange={(e, value) => setUserSkills(value)}
                    className="md:max-w-[400px] w-full bg-[#0000000d] mt-1 rounded-3xl text-[#606060] "
                    sx={{
                      display: "inline-block",
                      "& div": {
                        borderColor: "transparent",
                        outline: "none",
                      },
                      "& MuiOutlinedInput-root": {
                        border: "none",
                        borderRadius: "50px",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("skills")}
                        onKeyUp={(event) =>
                          event.key === "Enter"
                            ? handleSearchSkill(event)
                            : null
                        }
                      />
                    )}
                  />
                </div>
              </section>
              <section>
                <div className="flex justify-center md:justify-start gap-x-10">
                  <button
                    type="button"
                    className="px-5 py-3 rounded-full hover:shadow hover:shadow-[#848ABD] text-white bg-[#848ABD]"
                    onClick={handleUpdateProfile}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-5 py-3 text-[#848ABD] bg-white hover:underline"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </section>
            </form>
          </Container>
        </Box>
      </ThemeProvider>
    </Layout>
  );
};

export default UpdateProfilePage;
