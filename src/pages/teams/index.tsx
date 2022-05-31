import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "@/src/layouts/Header";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { Team } from "@/type/team/team.type";
import {
  ArrowDropDown,
  ArrowDropUp,
  CancelOutlined,
  JoinFullOutlined,
  JoinInnerOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { ComboboxSelect } from "@/src/layouts/team/ComboboxSelect";
import { Pagination } from "@mui/material";
import { Layout } from "@/src/layouts/layout";
import axiosClient from "@/api/axios-client";

const filterOptions = [
  {
    label: "Skill",
    options: [
      "Mobile",
      "Web",
      "Blockchain",
      "Crypto",
      "Digital",
      "Cloud",
      "AI",
    ],
  },
  {
    label: "Timezone",
    options: [
      "UTC/GMT - 7",
      "UTC/GMT - 6",
      "UTC/GMT - 5",
      "UTC/GMT - 4",
      "UTC/GMT - 3",
      "UTC/GMT - 2",
      "UTC/GMT - 1",
      "UTC/GMT + 0",
      "UTC/GMT + 1",
      "UTC/GMT + 2",
      "UTC/GMT + 3",
      "UTC/GMT + 4",
      "UTC/GMT + 5",
      "UTC/GMT + 6",
      "UTC/GMT + 7",
      "UTC/GMT + 8",
    ],
  },
];

const SkillSelect = [
  "Mobile",
  "Web",
  "Blockchain",
  "Crypto",
  "Digital",
  "Cloud",
  "AI",
];
const TimezoneSelect = [
  "UTC/GMT - 7",
  "UTC/GMT - 6",
  "UTC/GMT - 5",
  "UTC/GMT - 4",
  "UTC/GMT - 3",
  "UTC/GMT - 2",
  "UTC/GMT - 1",
  "UTC/GMT + 0",
  "UTC/GMT + 1",
  "UTC/GMT + 2",
  "UTC/GMT + 3",
  "UTC/GMT + 4",
  "UTC/GMT + 5",
  "UTC/GMT + 6",
  "UTC/GMT + 7",
  "UTC/GMT + 8",
];
const SortBy = ["none", "rating", "size", "working time"];
export const Teams = () => {
  const [teams, setTeams] = useState([] as Team[]);
  const [data, setData] = useState([] as Team[]);
  const [filter, setFilter] = useState({
    search: "",
    matchAll: false,
    sortBy: 0,
    sortDsc: true,
  });
  const [multiSelectFilter, setMultiSelectFilter] = useState({
    skill: [] as string[],
    timezone: [] as string[],
  } as { [id: string]: string[] });
  const [hideAllFilter, setHideAllFilter] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axiosClient
      .get("/team/getAll", {
      })
      .then((res) => {
        setTeams(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }, [setData]);

  useEffect(() => {
    let filtered = data.filter((team) =>
      team.teamName.toLowerCase().includes(filter.search.toLowerCase())
    );
    if (multiSelectFilter.skill.length !== 0) {
      filtered = filtered.filter((team) => {
        if (filter.matchAll) {
          return multiSelectFilter.skill.every((skill) =>
            team.skill.includes(skill)
          );
        } else {
          for (let i = 0; i < team?.skill.length; i++) {
            if (multiSelectFilter.skill.includes(team.skill[i])) {
              return true;
            }
          }
        }
      });
    }
    if (multiSelectFilter.timezone.length !== 0) {
      filtered = filtered.filter((team) => {
        if (multiSelectFilter.timezone.includes(team.timeZone)) {
          return true;
        }
      });
    }
    if (filter.sortBy !== 0) {
      switch (filter.sortBy) {
        // case 1:
        //   filtered.sort((a, b) => {
        //     return (a.rating - b.rating)*(filter.sortDsc ? -1 : 1);
        //   })
        //   break;
        case 2:
          filtered.sort((a, b) => {
            return (
              (parseInt(a.teamSize) - parseInt(b.teamSize)) *
              (filter.sortDsc ? -1 : 1)
            );
          });
          break;
        case 3:
          filtered.sort((a, b) => {
            return (
              (parseInt(a.workingTime?.split("h")[0]) -
                parseInt(b.workingTime?.split("h")[0])) *
              (filter.sortDsc ? -1 : 1)
            );
          });
          break;
      }
    }
    setTeams(filtered);
  }, [data, filter, multiSelectFilter]);

  const handleSearch = (event: any) => {
    setFilter({ ...filter, search: event.target.value });
  };

  const handleSkillSelect = (selected: string[]) => {
    setMultiSelectFilter({ ...multiSelectFilter, skill: selected });
  };

  const handleTimezoneSelect = (selected: string[]) => {
    setMultiSelectFilter({ ...multiSelectFilter, timezone: selected });
  };

  const handleSortBySelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    setFilter({ ...filter, sortBy: parseInt(target.value) });
  };

  const cusHook :{[id:string]:(event:any)=>void} = {
    skill: handleSkillSelect,
    timezone: handleTimezoneSelect,
  }
  return (
    <Layout>
      <div className="relative">
        <div className="flex flex-col items-center justify-center px-1 ">
          <div className="container-lg relative border-x-2  xl:w-3/4 md:w-11/12 lg:w-5/6 w-full  shadow-xl">
            <div className="sticky top-0 w-full flex flex-col text-cyan-700 bg-white z-10">
              <div className="flex flex-col sm:flex-row border-b ">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex ">
                    <div className="p-1 xs:p-4 bg-cyan-900 text-white font-semibold border-2 border-cyan-900 mr-2 max-w-[10rem] hidden sm:block">
                      <span>{teams.length} Teams</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white">
                  <div className="flex flex-col sm:flex-row p-2 items-end sm:items-center  justify-center text-sm md:text-md w-full h-full">
                    <div className="flex flex-row items-center justify-center flex-1 w-full relative">
                      <input
                        type="text"
                        placeholder="Search here..."
                        className="shadow appearance-none border  w-full text-cyan-700 focus:outline-none focus:shadow-outline p-1"
                        name="search"
                        defaultValue={filter.search}
                        onChange={handleSearch}
                      />
                      <div className="absolute right-2">
                        <SearchIcon />
                      </div>
                    </div>
                    <div className="flex flex-1 justify-end items-center">
                      <div className="xxs:flex hidden">
                        <div
                          className="cursor-pointer flex items-center justify-center mr-2"
                          onClick={() => {
                            setFilter({
                              ...filter,
                              matchAll: !filter.matchAll,
                            });
                          }}
                        >
                          {filter.matchAll ? (
                            <JoinFullOutlined />
                          ) : (
                            <JoinInnerOutlined />
                          )}
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-2">
                          <ComboboxSelect
                            label="Skills"
                            items={SkillSelect}
                            selected={multiSelectFilter.skill}
                            setSelected={handleSkillSelect}
                          />
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-2">
                          <ComboboxSelect
                            label="Timezone"
                            items={TimezoneSelect}
                            selected={multiSelectFilter.timezone}
                            setSelected={handleTimezoneSelect}
                          />
                        </div>
                      </div>
                      <div className="cursor-pointer flex items-center justify-center mr-2">
                        <div
                          className={`border-2 flex items-center justify-between w-full px-1 py-[0.125rem]`}
                          onClick={() => {
                            setHideAllFilter(!hideAllFilter);
                          }}
                        >
                          <label className={`pointer-events-none`}>
                            All filter
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center border-l pl-2">
                        <select
                          name="sort"
                          id=""
                          value={filter.sortBy === 0 ? " " : filter.sortBy}
                          className="bg-transparent border-2 "
                          onChange={handleSortBySelect}
                        >
                          <option hidden value="">
                            Sort by
                          </option>
                          {SortBy.map((key, index) => (
                            <option key={index} value={index}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <div
                          className=""
                          onClick={() => {
                            setFilter({ ...filter, sortDsc: !filter.sortDsc });
                          }}
                        >
                          {filter.sortDsc ? <ArrowDropDown /> : <ArrowDropUp />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              {teams.map((item, index) => (
                <TeamCard team={item as Team} key={index} />
              ))}
            </div>
            <div className="flex items-center justify-center pb-2">
              <Pagination
                count={10}
                defaultPage={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`fixed right-0 top-0 bg-white overflow-y-scroll h-full custom-scrollbar z-20 p-2 min-w-[300px] w-full xs:w-fit shadow-xl text-cyan-900 animate-slide-in-left ${
            hideAllFilter ? "hidden" : ""
          }`}
        >
          <div className="flex items-center justify-center relative p-2">
            <div
              className="absolute left-2 cursor-pointer"
              onClick={() => {
                setHideAllFilter(true);
              }}
            >
              <CancelOutlined />
            </div>
            <span className="text-xl">All filter</span>
          </div>

          <div className="flex flex-col items-end">
            <div
              className="cursor-pointer flex items-center justify-center mr-2"
              onClick={() => {
                setFilter({ ...filter, matchAll: !filter.matchAll });
              }}
            >
              {filter.matchAll ? <JoinFullOutlined /> : <JoinInnerOutlined />}
            </div>
            <div className="flex flex-row items-center justify-center flex-1 w-full relative">
              <input
                type="text"
                placeholder="Search here..."
                className="shadow appearance-none border  w-full text-cyan-700 focus:outline-none focus:shadow-outline p-1"
                name="search"
                onChange={handleSearch}
                defaultValue={filter.search}
              />
              <div className="absolute right-2">
                <SearchIcon />
              </div>
            </div>
            <div className="w-full">
              {filterOptions.map((item, index) => {
                return (
                  <ComboboxSelect
                    key={index}
                    label={item.label}
                    items={item.options}
                    selected={multiSelectFilter[item.label.toLowerCase()]}
                    setSelected={cusHook[item.label.toLowerCase()]}
                    isCollapsor={true}
                    className="py-2 w-full"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
