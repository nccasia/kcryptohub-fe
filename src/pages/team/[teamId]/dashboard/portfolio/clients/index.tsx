import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { PersonOutlineOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { KeyClientApi } from "@/api/keyClients-api";
import { ICreateTeam, IKeyClient } from "@/type/team/team.type";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDashboardInformationSelector } from "@/redux/selector";
import { teamApi } from "@/api/team-api";
import { setTeam } from "@/redux/dashboardSlice";

export interface IKeyClients {
  id: number;
  keyName: string[];
}
const schemaValidation = yup.object().shape({
  keyName: yup.array().of(yup.string().max(30, "Key name is too long")),
  key: yup.string().max(30, "Key name is too long"),
});

export const Clients = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });
  const [teamId, setTeamId] = useState<number>(NaN);

  const keyClient = useAppSelector(getDashboardInformationSelector).keyClients;
  const [keyClientInfo, setKeyClientInfo] = useState<string[]>([""]);
  const team = useAppSelector(getDashboardInformationSelector);

  const [keyClientId, setKeyClientId] = useState<number>(NaN);
  const router = useRouter();

  const [stringArr, setStringArr] = useState("");

  const [dis, setDis] = useState(false);

  const [disUpdate, setDisUpdate] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.isReady) {
      setTeamId(parseInt(router.query.teamId as string));
    }

    if (keyClient) {
      setKeyClientInfo(keyClient[0]?.keyName || [""]);
      setKeyClientId(keyClient[0]?.id);
      if (keyClient[0]?.keyName) {
        setStringArr(Array.from(keyClient[0]?.keyName).join(""));
      }
    }
  }, [keyClient, router]);

  const handleAdd = () => {
    setKeyClientInfo([...keyClientInfo, ""]);
  };

  const handleDelete = (index: number) => {
    setKeyClientInfo(keyClientInfo.filter((items, i) => i !== index));
  };

  useEffect(() => {
    if (
      keyClientInfo &&
      keyClientInfo.filter((items, index) => items.length !== 0).length ===
        keyClientInfo.length
    ) {
      setDisUpdate(true);
      setDis(true);
    } else {
      setDis(false);
      setDisUpdate(false);
    }

    if (
      keyClientInfo.join("") === stringArr ||
      !(
        keyClientInfo &&
        keyClientInfo.filter((items, index) => items.length !== 0).length ===
          keyClientInfo.length
      )
    ) {
      setDisUpdate(false);
    } else setDisUpdate(true);
  }, [keyClientInfo]);

  const onSubmit = () => {
    if (keyClientId) {
      KeyClientApi.updateKeyClient(
        keyClientInfo,
        teamId,
        keyClientId,
        team as unknown as ICreateTeam
      ).then((resp) => {
        if (resp) {
          toast.success("Update key clients successfully!!!");
          teamApi.getTeam(teamId).then((res) => {
            dispatch(setTeam(res.data));
          });
        }
      });
      setTimeout(() => {
        router.push(`/team/${teamId}/dashboard/portfolio`);
      }, 2000);
    } else {
      KeyClientApi.createKeyClient(
        keyClientInfo,
        teamId,
        team as unknown as ICreateTeam
      ).then((resp) => {
        if (resp) {
          toast.success("Create key clients successfully!!!");
          teamApi.getTeam(teamId).then((res) => {
            dispatch(setTeam(res.data));
          });
        }
      });
      setTimeout(() => {
        router.push(`/team/${teamId}/dashboard/portfolio`);
      }, 2000);
    }
  };
  return (
    <ManagePortfolio>
      <div className="font-jost">
        <div className="lg:border-b-0 border-b mb-2 pb-2">
          <h1 className="text-3xl">Key Clients</h1>
          <Typography className="text-xl my-3">
            Add Key Clients that you’d like listed on your Profile.
          </Typography>
        </div>
        <div className="">
          <div className="border-b flex items-center font-medium text-lg">
            <PersonOutlineOutlined className="font-sm" />
            <span>Key Clients</span>
          </div>
          <p className="text-sm text-gray-500 px-8 py-4">
            This list is optional for your Profile. <br /> It’s best to take
            advantage of the Projects and showcase your Client work through
            visual storytelling and case studies.
          </p>
          <form className="">
            <div>
              {keyClientInfo &&
                keyClientInfo.map((items, index) => {
                  return (
                    <div key={index}>
                      <div className="flex items-center">
                        <div className="items-center my-2 font-medium w-fit pl-16">
                          <label
                            htmlFor="keyClient"
                            className="text-primary flex justify-between py-2 md:py-0"
                          >
                            Key Clients
                            {index === 0 && (
                              <span className="text-sm text-gray-300">
                                optional
                              </span>
                            )}
                          </label>
                          <div className="w-fit flex flex-col relative">
                            <input
                              type="text"
                              name="key"
                              maxLength={30}
                              autoComplete="off"
                              value={items}
                              className={` bg-[#0000000d] mt-1 rounded-3xl text-[#606060] xs:min-w-[400px] pl-3 pr-8 py-2 outline-none `}
                              onChange={(e) => {
                                const array = [...keyClientInfo];
                                array[index] = e.target.value;
                                setKeyClientInfo(array);
                                setDis(true);
                              }}
                            />
                            <div className="absolute right-0 mt-1 p-2 text-gray-400 text-sm font-normal">
                              {items.length}/{30}
                            </div>
                          </div>
                        </div>
                        {index > 0 && (
                          <div
                            className="items-center font-medium w-fit pl-4"
                            onClick={() => handleDelete(index)}
                          >
                            <a className="text-sm text-[#848abd] mt-5 flex items-center relative cursor-pointer hover:underline hover:decoration-solid">
                              Delete key clients
                              <PlaylistAddIcon className="text-red-500 text-[16px] ml-1 mt-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-b-[1px] mt-4 border-[#cae0e7]">
              {keyClientInfo &&
                keyClientInfo.filter((items, index) => items.length !== 0)
                  .length === keyClientInfo.length && (
                  <div
                    className="items-center font-medium w-fit pl-16 mb-3"
                    onClick={handleAdd}
                  >
                    <a className="text-sm text-[#848abd] flex items-center relative cursor-pointer hover:underline hover:decoration-solid">
                      Add another key clients
                      <PlaylistAddIcon className="text-red-500 text-[16px] ml-1 mt-1" />
                    </a>
                  </div>
                )}
            </div>

            <div className="flex items-center justify-end p-4">
              <button
                type="button"
                className="bg-white px-16 py-3 hover:text-[#848abd] "
              >
                Cancel
              </button>
              {keyClientId ? (
                <button
                  disabled={!disUpdate}
                  type="submit"
                  className={`px-4 py-2 w-fit bg-[#848abd] text-white  flex justify-center items-center border-2 border-[#848abd]
               hover:bg-transparent hover:text-[#848abd] ${
                 disUpdate ? "cursor-pointer" : "cursor-not-allowed opacity-50"
               } `}
                  onClick={handleSubmit(onSubmit)}
                >
                  Update key clients
                </button>
              ) : (
                <button
                  disabled={!dis}
                  type="submit"
                  className={`px-4 py-2 w-fit bg-[#848abd] text-white  flex justify-center items-center border-2 border-[#848abd] rounded-3xl
               hover:bg-transparent hover:text-[#848abd] ${
                 dis ? "cursor-pointer" : "cursor-not-allowed opacity-50"
               } `}
                  onClick={handleSubmit(onSubmit)}
                >
                  Save changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ManagePortfolio>
  );
};

export default Clients;
