import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, LegacyRef, useEffect, useState } from "react";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { Team } from "@/type/team/team.type";
import {
  ArrowDropDown,
  ArrowDropUp,
  CancelOutlined,
  Close,
  JoinFullOutlined,
  JoinInnerOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { ComboboxSelect } from "@/src/layouts/team/ComboboxSelect";
import { Pagination } from "@mui/material";
import { Layout } from "@/src/layouts/layout";
import axiosClient from "@/api/axios-client";
import { useRouter } from "next/router";
import { useOutsideClick } from "hook/OuterClick";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SortBy = ["none", "rating", "size", "working time"];
interface PageResponse {
  content: Team[];
  pagable: {
    total: number,
    page: number,
    size: number,
  }
}
const initFilter = {
    search: "",
    matchAll: false,
    sortBy: 0,
    sortDsc: true,
    skill: [] as number[],
}
export const Teams = () => {
  const router = useRouter();
  const [teams, setTeams] = useState([] as Team[]);
  const [filter, setFilter] = useState(initFilter);

  const SkillSelect = useAppSelector(state=>state.SkillReducer.value)
  
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalTeam, setTotalTeam] = useState(0); 
  const { show, setShow, nodeRef, subNodeRef} = useOutsideClick();
  useEffect(() => {
    const pageQuery = router.query.page as string;
    if (pageQuery && parseInt(pageQuery) !== page) {
      setPage(parseInt(pageQuery));
    }
  }, [page, router.query.page, SkillSelect]);
  useEffect(()=>{
    axiosClient.get(`/team/getAllPaging`,{
      params: {
        page: page,
        skillId: filter.skill,
        search: filter.search,
        matchAll: filter.matchAll,
        sortBy: SortBy[filter.sortBy],
        sortDsc: filter.sortDsc,
      }
    }).then((res)=>{
      const r = res.data as PageResponse;
      if(window){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        let url = `/teams?page=${page}`;
        filter.skill.forEach(sk=>{
          const skill = SkillSelect.find(s=>s.id === sk);
          url += `&skill=${skill?.skillName}`;
        })
        window.history.replaceState({}, "", url);
      }
      setTeams(r.content);
      setTotalPage(Math.ceil(r.pagable.total / r.pagable.size));
      setTotalTeam(r.pagable.total);
    }).catch((err)=>{
      console.log(err);
      toast.error(err.message);
    });
  },[SkillSelect, filter, filter.search, filter.sortBy, filter.sortDsc, page, router])

  const handleSearch = (event: any) => {
    setFilter({ ...filter, search: event.target.value });
  };

  const handleSkillSelect = (selected: number[]) => {
    setFilter({ ...filter, skill: selected });
  };

  const handleTimezoneSelect = (selected: number[]) => {
    //setMultiSelectFilter({ ...multiSelectFilter, timezone: selected });
  };

  const handleSortBySelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    setFilter({ ...filter, sortBy: parseInt(target.value) });
  };

  const cusHook :{[id:string]:(event:any)=>void} = {
    skill: handleSkillSelect,
    timezone: handleTimezoneSelect,
  }
  const cusHookValue :{[id:string]:any[]} = {
    skill: SkillSelect,
    //timezone: TimezoneSelect,
  }
  return (
    <Layout>
      <div className="flex items-center justify-center relative bg-cyan-900 border-t border-cyan-500  ">
        <div className="py-6 flex items-center justify-start text-white  font-semibold w-full md:w-4/5 px-2">
          <div
            className="px-4 py-2 w-fit border-2 border-red-500 xxs:flex hidden items-center justify-center text-xl
           before:bg-cyan-300 before:h-[6px] before:w-[6px] before:rounded before:absolute before:top-[-4px] 
           after:bg-cyan-700 after:h-4 after:w-[1px] after:absolute after:top-[2px]"
          >
            <span>2022 Kryptohub</span>
          </div>
          <div className="ml-4 text-3xl">
            <h1>List Teams</h1>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex flex-col items-center justify-center px-1 ">
          <div className="container-lg relative border-x-2  xl:w-3/4 md:w-11/12 lg:w-5/6 w-full  shadow-xl">
            <div className="sticky top-0 w-full flex flex-col text-cyan-700 bg-white z-10">
              <div className="flex flex-col sm:flex-row border-b ">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex ">
                    <div className="p-1 xs:p-4 bg-cyan-900 text-white font-semibold border-2 border-cyan-900 mr-2 max-w-[10rem] hidden sm:block">
                      <span>{totalTeam} Teams</span>
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
                            <JoinInnerOutlined />
                          ) : (
                            <JoinFullOutlined />
                          )}
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-2">
                          <ComboboxSelect
                            label="Skills"
                            items={SkillSelect}
                            selected={filter.skill}
                            setSelected={handleSkillSelect}
                          />
                        </div>
                        {/* <div className="cursor-pointer flex items-center justify-center mr-2">
                          <ComboboxSelect
                            label="Timezone"
                            items={TimezoneSelect}
                            selected={multiSelectFilter.timezone}
                            setSelected={handleTimezoneSelect}
                          />
                        </div> */}
                      </div>
                      <div className="cursor-pointer flex items-center justify-center mr-2">
                        <div
                          className={`border-2 flex items-center justify-between w-full px-1 py-[0.125rem] `}
                          onClick={() => {
                            setShow(!show);
                          }}
                          ref={nodeRef as LegacyRef<HTMLDivElement>}
                        >
                          <label className={`pointer-events-none min-w-[50px]`}>
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
              {filter.skill.length > 0 ? (
                <div className="p-2 border-b ">
                  {filter.skill.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className="p-1 border rounded-lg mr-2 w-fit text-sm hover:bg-cyan-50 cursor-pointer"
                        onClick={() => {
                          setFilter({
                            ...filter,
                            skill: filter.skill.filter((i) => i !== skill),
                          });
                        }}
                      >
                        <span className="text-gray-400">Skills:</span>
                        <span>{SkillSelect.find(sk=>sk.id===skill)?.skillName}</span>
                        <Close className="text-sm cursor-pointer" />
                      </div>
                    );
                  })}
                  <div
                    className="p-1 border rounded-lg mr-2 w-fit text-sm hover:bg-cyan-50 cursor-pointer"
                    onClick={() => {
                      setFilter(initFilter);
                    }}
                  >
                    <span>Clear All</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              {teams.map((item, index) => (
                <TeamCard team={item as Team} key={index} />
              ))}
            </div>
            <div className="flex items-center justify-center pb-2">
              <Pagination
                count={totalPage}
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`fixed right-0 top-0 bg-white overflow-y-scroll h-full custom-scrollbar z-20 p-2 min-w-[300px] w-full xs:w-fit shadow-xl text-cyan-900 animate-slide-in-left ${
            show ? "" : "hidden"
          }`}
          ref={subNodeRef as LegacyRef<HTMLDivElement>}
        >
          <div className="flex items-center justify-center relative p-2">
            <div
              className="absolute left-2 cursor-pointer"
              onClick={() => {
                setShow(false);
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
              <ComboboxSelect
                label={"Skills"}
                items={SkillSelect}
                selected={filter.skill}
                setSelected={handleSkillSelect}
                isCollapsor={true}
                className="py-2 w-full border-b"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
