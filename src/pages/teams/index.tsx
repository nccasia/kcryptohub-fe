import SearchIcon from "@mui/icons-material/Search";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { Header } from "@/src/layouts/Header";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { Team } from "@/type/team/team.type";
import {
  ArrowDropDown,
  ArrowDropUp,
  JoinFullOutlined,
  JoinInnerOutlined,
} from "@mui/icons-material";
import { IconHover } from "@/src/layouts/team/IconHover";
const data = [] as Team[];
const SkillSelect = [
  "All Skill",
  "Mobile",
  "Web",
  "Blockchain",
  "Crypto",
  "Digital",
  "Cloud",
  "AI",
];
const TimezoneSelect = [
  "All Timezone",
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
  const [teams, setTeams] = useState(data);
  const [filter, setFilter] = useState({
    search: "",
    skill: [] as number[],
    timezone: [] as number[],
    matchAll: false,
    sortBy: 0,
    sortDsc: true,
  });

  useEffect(() => {
    let filtered = data.filter((team) =>
      team.teamName.toLowerCase().includes(filter.search.toLowerCase())
    );
    if (filter.skill.length !== 0) {
      filtered = filtered.filter((team) => {
        if (filter.matchAll) {
          return filter.skill.every((skill) =>
            team.skill.includes(SkillSelect[skill])
          );
        } else {
          for (let i = 0; i < team.skill.length; i++) {
            if (filter.skill.includes(SkillSelect.indexOf(team.skill[i]))) {
              return true;
            }
          }
        }
      });
    }
    if (filter.timezone.length !== 0) {
      filtered = filtered.filter((team) => {
        if (filter.timezone.includes(TimezoneSelect.indexOf(team.timeZone))) {
          return true;
        }
      });
    }
    if (filter.sortBy !== 0) {
      switch (filter.sortBy) {
        case 1:
          /*  filtered.sort((a, b) => {
             return (para.rating - b.rating) * (filter.sortDsc ? -1 : 1); 
          }); */
          break;
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
              (parseInt(a.workingTime.split("h")[0]) -
                parseInt(b.workingTime.split("h")[0])) *
              (filter.sortDsc ? -1 : 1)
            );
          });
          break;
      }
    }
    setTeams(filtered);
  }, [filter]);

  const handleSearch = (event: any) => {
    setFilter({ ...filter, search: event.target.value });
  };

  const handleSkillSelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (value === 0) {
      setFilter({ ...filter, skill: [] });
    } else if (filter.skill.includes(value)) {
      setFilter({
        ...filter,
        skill: filter.skill.filter((skill) => skill !== value),
      });
    } else {
      setFilter({ ...filter, skill: [...filter.skill, value] });
    }
  };

  const handleTimezoneSelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    if (parseInt(target.value) === 0) {
      setFilter({ ...filter, timezone: [] });
    } else if (filter.timezone.includes(parseInt(target.value))) {
      setFilter({
        ...filter,
        timezone: filter.timezone.filter(
          (timezone) => timezone !== parseInt(target.value)
        ),
      });
    } else {
      setFilter({
        ...filter,
        timezone: [...filter.timezone, parseInt(target.value)],
      });
    }
  };

  const handleSortBySelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    setFilter({ ...filter, sortBy: parseInt(target.value) });
  };
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center px-1">
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
                  <div className="flex flex-row items-center justify-center flex-1 w-full">
                    <input
                      type="text"
                      placeholder="Search here..."
                      className="shadow appearance-none border  w-full text-cyan-700 focus:outline-none focus:shadow-outline p-2"
                      onChange={handleSearch}
                    />
                    <div className="ml-[-2rem] flex items-center justify-center">
                      <SearchIcon />
                    </div>
                    <div className="sm:hidden flex flex-row items-center justify-center xs:p-2 sm:p-4 ml-2 border-l">
                      <select
                        name="sort"
                        id=""
                        value={filter.sortBy === 0 ? " " : filter.sortBy}
                        className="bg-transparent border-2 border-cyan-900 xs:py-2 p-1"
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
                        className="cursor-pointer"
                        onClick={() => {
                          setFilter({ ...filter, sortDsc: !filter.sortDsc });
                        }}
                      >
                        {filter.sortDsc ? (
                          <IconHover
                            icon={<ArrowDropDown />}
                            hoverText="DESC"
                          />
                        ) : (
                          <IconHover icon={<ArrowDropUp />} hoverText="ASC" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-end">
                    <div
                      className="cursor-pointer flex items-center justify-center"
                      onClick={() => {
                        setFilter({ ...filter, matchAll: !filter.matchAll });
                      }}
                    >
                      {filter.matchAll ? (
                        <JoinFullOutlined />
                      ) : (
                        <JoinInnerOutlined />
                      )}
                    </div>
                    <div className="items-center justify-center h-fit border-2 border-cyan-800 p-1 xs:p-2 ml-2 flex ">
                      <select
                        className="bg-transparent max-w-[14rem]"
                        name="skill[]"
                        id=""
                        value={filter.skill.length > 0 ? " " : 0}
                        onChange={handleSkillSelect}
                      >
                        {SkillSelect.map((key, index) => {
                          return (
                            <option
                              key={index}
                              value={index}
                              className={`${
                                filter.skill.includes(index)
                                  ? "bg-cyan-300"
                                  : ""
                              }`}
                            >
                              {key}
                            </option>
                          );
                        })}
                        <option value=" " className="hidden">
                          {filter.skill.map((sk) => SkillSelect[sk] + ",")}
                        </option>
                      </select>
                    </div>
                    <div className="items-center justify-center h-fit border-2 border-cyan-800 p-1 xs:p-2 ml-2  flex">
                      <select
                        className="bg-transparent max-w-[7rem]"
                        name="timezone"
                        id=""
                        value={filter.timezone.length > 0 ? " " : 0}
                        onChange={handleTimezoneSelect}
                      >
                        {TimezoneSelect.map((key, index) => (
                          <option
                            key={index}
                            value={index}
                            className={`${
                              filter.timezone.includes(index)
                                ? "bg-cyan-300"
                                : ""
                            }`}
                          >
                            {key}
                          </option>
                        ))}
                        <option value=" " className="hidden">
                          {filter.timezone.map(
                            (sk) =>
                              TimezoneSelect[sk].slice(
                                TimezoneSelect[sk].length - 3,
                                TimezoneSelect[sk].length
                              ) + ","
                          )}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex hidden flex-row items-center justify-center xs:p-2 sm:p-4 border-l">
                <select
                  name="sort"
                  id=""
                  value={filter.sortBy === 0 ? " " : filter.sortBy}
                  className="bg-transparent border-2 border-cyan-900 py-2"
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
          <div className="flex flex-col items-center justify-center w-full">
            {teams.map((item, index) => (
              <TeamCard team={item as Team} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
