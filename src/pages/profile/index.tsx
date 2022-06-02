import { IconMap } from "@/components/IconSVG/IconMap";
import InputField from "@/components/profile/InputField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile, getSkills, updateProfile } from "@/redux/profileSlice";
import { Layout } from "@/src/layouts/layout";
import { ELoginProvider } from "@/type/auth/login.type";
import { IProfile, ISkills } from "@/type/profile/profile.type";
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

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

const UpdateProfilePage = () => {
  const { userInfo, skills } = useAppSelector((state) => state.ProfileReducer);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, getValues, reset } = useForm<IProfile>();
  const [userSkills, setUserSkills] = useState<ISkills[]>(
    userInfo.skills || []
  );
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
      avatarPath: userInfo.avatarPath,
      status: userInfo.status,
      provider: userInfo.provider,
    });
    if (userInfo.skills) {
      setUserSkills(userInfo.skills);
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
      await dispatch(getProfile());
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
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Box>
          <Container
            fixed
            maxWidth="lg"
            className="border border-[#cae0e7] py-6 md:!px-24 md:py-12"
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
                    <div className="w-16 h-16 flex-none rounded-full overflow-hidden border border-[#cae0e7]">
                      {getValues("avatarPath") ? (
                        <img
                          src={getValues("avatarPath")}
                          alt="avatar"
                          className="w-full h-full"
                        />
                      ) : (
                        <Image
                          width="62"
                          height="62"
                          src={IconMap.AvatarDefault.src}
                          alt="avatar"
                          layout="responsive"
                        />
                      )}
                    </div>
                    <input
                      type="text"
                      {...register("avatarPath")}
                      placeholder="Add your link avatar here"
                      className="w-full border-2 border-[#cae0e7] px-3 py-2 outline-none placeholder:text-[#cae0e7] focus:shadow-3xl focus:border-primary"
                    />
                  </div>
                </div>
                <InputField label="Username" register={register("username")} />
                <InputField
                  label="Contact Email"
                  register={register("emailAddress")}
                />
              </section>
              <section>
                <h2 className="text-3xl mt-20 text-primary">About</h2>
                <InputField
                  label="Github"
                  placeholder="https://github.com/janedoe"
                  register={register("githubAddress")}
                />
                <InputField
                  label="Google"
                  placeholder="janedoe@gmail.com"
                  register={register("googleAddress")}
                />
                <div className="md:flex items-start mx-5 my-8">
                  <label className="text-primary min-w-[130px] block py-2 md:py-0">
                    Skills:
                  </label>
                  <Autocomplete
                    multiple
                    options={handleAutocompleteOption()}
                    getOptionLabel={(option) => option.skillName}
                    value={userSkills}
                    filterSelectedOptions
                    onChange={(e, value) => setUserSkills(value)}
                    className="md:max-w-[400px] w-full"
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
                    className="px-5 py-2 transition duration-150 border-2 border-[#cae0e7] text-[#08537E] hover:bg-[#cae0e7]"
                    onClick={handleUpdateProfile}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 transition duration-150 text-[#08537E] hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </section>
            </form>
          </Container>
        </Box>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Layout>
  );
};

export default UpdateProfilePage;
