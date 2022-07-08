import { InputFieldCol } from "@/components/portfolio/InputFieldCol";
import { ManagePortfolio } from "@/src/layouts/manage-team/Manage-portfolio";
import { PersonOutlineOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { KeyClientApi } from "@/api/keyClients-api";
import { IKeyClient } from "@/type/team/team.type";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
export interface IKeyClients {
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
  const [teamId, setTeamId] = React.useState<number>(NaN);
  const [keyClientInfo, setKeyClientInfo] = React.useState<any[]>([""]);
  const [team, setTeam] = useState<any>({});
  const [keyClientId, setKeyClientId] = useState(null);
  const router = useRouter();
  React.useEffect(() => {
    if (router.query.teamId) {
      setTeamId(Number(router.query.teamId));
      KeyClientApi.getAll(+router.query.teamId).then((resp) => {
        if (resp) {
          setTeam(resp);
          if (resp.keyClients.length > 0) {
            setKeyClientInfo(resp.keyClients[0].keyName);
            setKeyClientId(resp.keyClients[0].id);
          }
        }
      });
    }
  }, [router.query]);

  const [count, setCount] = React.useState(0);

  const handleAdd = () => {
    setKeyClientInfo([...keyClientInfo, ""]);
  };

  const handleDelete = (index: number) => {
    setKeyClientInfo(keyClientInfo.filter((items, i) => i !== index));
  };

  const onSubmit = () => {
    if (keyClientId) {
      KeyClientApi.updateKeyClient(
        keyClientInfo,
        teamId,
        keyClientId,
        team
      ).then((resp) => {
        if (resp) {
          toast.success("Update key clients successfully!!!");
        }
      });
    } else {
      KeyClientApi.createKeyClient(keyClientInfo, teamId, team).then((resp) => {
        if (resp) {
          toast.success("Create key clients successfully!!!");
        }
      });
    }
  };
  return (
    <ManagePortfolio>
      <div>
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
                              className={` border-2 border-[#cae0e7] xs:min-w-[400px] pl-3 pr-8 py-2 outline-none focus:shadow-3xl focus:border-primary `}
                              onChange={(e) => {
                                const array = [...keyClientInfo];
                                array[index] = e.target.value;
                                setKeyClientInfo(array);
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
                            <a className="text-sm text-[#08537e] mt-5 flex items-center relative cursor-pointer hover:underline hover:decoration-solid">
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
                    <a className="text-sm text-[#08537e] flex items-center relative cursor-pointer hover:underline hover:decoration-solid">
                      Add another key clients
                      <PlaylistAddIcon className="text-red-500 text-[16px] ml-1 mt-1" />
                    </a>
                  </div>
                )}
            </div>

            <div className="flex items-center justify-end p-4">
              <button className="bg-white px-16 py-3 hover:text-cyan-600 ">
                Cancel
              </button>
              <button
                className="px-4 py-2 w-fit bg-secondary text-white  flex justify-center items-center cursor-pointer border-2 border-secondary
               hover:bg-transparent hover:text-secondary"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </ManagePortfolio>
  );
};

export default Clients;
