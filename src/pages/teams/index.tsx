import { teamApi } from "@/api/team-api";
import { useAppSelector } from "@/redux/hooks";
import { getSkillsIsLoadedSelector, getSkillsSelector } from "@/redux/selector";
import { Layout } from "@/src/layouts/layout";
import { ComboboxSelect } from "@/src/layouts/team/ComboboxSelect";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { TimeZone } from "@/type/enum/TimeZone";
import { ITeam } from "@/type/team/team.type";
import { CancelOutlined, Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  createTheme,
  debounce,
  Pagination,
  PaginationItem,
  ThemeProvider,
} from "@mui/material";
import { useOutsideClick } from "hook/OuterClick";
import { useRouter } from "next/router";
import { FormEvent, LegacyRef, useCallback, useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
const theme = createTheme({});

const SortBy = ["none"];
interface PageResponse {
  content: ITeam[];
  pageable: {
    total: number;
    page: number;
    size: number;
  };
}
const initFilter = {
  search: "",
  sortBy: 0,
  skill: [] as string[],
  timezone: [] as string[],
};
export const Teams = () => {
  const router = useRouter();
  const [teams, setTeams] = useState([] as ITeam[]);
  const SkillSelect = useAppSelector(getSkillsSelector);
  const SkillSelectIsLoaded = useAppSelector(getSkillsIsLoadedSelector);
  const [switchValue, setSwitchValue] = useState("All Filter");
  const [filter, setFilter] = useState({
    search: "",
    sortBy: 0,
    skill: [] as string[],
    timezone: [] as string[],
  });

  const [currentPage, setcurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalTeam, setTotalTeam] = useState(0);
  const { show, setShow, nodeRef, subNodeRef } = useOutsideClick();
  const [isReady, setIsReady] = useState(false);
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    if (
      router.query.page &&
      parseInt(router.query.page as string) !== currentPage
    ) {
      let page = parseInt(router.query.page as string);

      if (page < 1) page = 1;
      setcurrentPage(page);
    }
    let skillQuery = [] as string[];
    let timezoneQuery = [] as string[];
    let searchQuery = "";
    if (router.query.timezone) {
      if (typeof router.query.timezone === "string") {
        timezoneQuery = [router.query.timezone.replace(" ", "+")];
      } else {
        timezoneQuery = (router.query.timezone as string[]).map((item) =>
          item.replace(" ", "+")
        );
      }
    }
    if (router.query.skill) {
      if (typeof router.query.skill === "string") {
        skillQuery = [router.query.skill];
      } else {
        skillQuery = router.query.skill as string[];
      }
    }
    if (router.query.search) {
      searchQuery = router.query.search as string;
    }
    setFilter({
      ...filter,
      skill: skillQuery,
      timezone: timezoneQuery,
      search: searchQuery,
    });
    setIsReady(true);
  }, [router.isReady]);
  useEffect(() => {
    if (isReady && SkillSelectIsLoaded) {
      setTeams([]);
      teamApi
        .getListTeamsQuery(
          filter.search,
          currentPage,
          30,
          filter.sortBy.toString(),
          filter.skill
            .map(
              (item) =>
                SkillSelect.find((skill) => skill.skillName === item)?.id
            )
            .filter((item) => item),
          filter.timezone
        )
        .then((data) => {
          const res = data as PageResponse;
          const maxPage = Math.ceil(res.pageable.total / res.pageable.size);
          if (currentPage > maxPage && maxPage > 0) {
            setcurrentPage(maxPage);
          } else if (currentPage < 1) {
            setcurrentPage(1);
          } else {
            setTeams(res.content);
            setTotalPage(maxPage);
            setTotalTeam(res.pageable.total);
          }
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      const query = {} as any;
      if (currentPage > 1) query.page = currentPage;
      if (filter.search && filter.search.length > 0)
        query.search = filter.search;
      if (filter.skill.length > 0) query.skill = filter.skill;
      if (filter.timezone.length > 0) query.timezone = filter.timezone;
      router.push({
        pathname: "/teams",
        query,
      });
      setIsReady(true);
    }
  }, [filter, currentPage, SkillSelect, SkillSelectIsLoaded]);

  const debounceSearch = useCallback(
    debounce((value: string) => {
      setFilter({ ...filter, search: value });
    }, 1000),
    [setFilter]
  );
  const [keyword, setKeyword] = useState("");
  const handleSearch = (event: any) => {
    setKeyword(event.target.value);
    debounceSearch(event.target.value);
  };

  const handleSkillSelect = (selected: string[]) => {
    setFilter({ ...filter, skill: selected });
  };

  const handleTimezoneSelect = (selected: string[]) => {
    setFilter({ ...filter, timezone: selected });
  };

  const handleSortBySelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    setFilter({ ...filter, sortBy: parseInt(target.value) });
  };

  const handleClearAll = () => {
    setFilter(initFilter);
    setKeyword("");
  };

  const handlePageChange = (value: number) => {
    setcurrentPage(value);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative bg-[#606060] border-t border-[#848abd] font-nunito"></div>
      <div className="relative font-nunito">
        <div className="flex flex-col items-center justify-center  w-full">
          <div className="container-lg border-x-2 w-full ">
            <div className="sticky border-b p-2 top-0 w-full flex flex-col text-[#61619b] bg-white z-10 shadow-lg">
              <div className="flex flex-col sm:flex-row ">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex ">
                    <div className="p-1 xs:p-2.5 bg-[#848abd] rounded-3xl text-white font-semibold mr-2 max-w-[10rem] hidden sm:block">
                      <span>{totalTeam} Teams</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white">
                  <div className="flex flex-col sm:flex-row p-2 items-end sm:items-center  justify-center text-sm md:text-md w-full h-full">
                    <div className="xxs:flex hidden flex-row items-center justify-center w-full flex-1 relative sm:mb-0 mb-2">
                      <input
                        type="text"
                        placeholder="Search here..."
                        className="shadow w-full  text-[#606060] bg-white pl-5 px-1 py-3 focus:outline-none  border-[1px] border-[#848abd] rounded-3xl"
                        name="search"
                        value={keyword}
                        onChange={handleSearch}
                      />
                      <div className="absolute right-2">
                        {filter.search.length > 0 ? (
                          <Close
                            onClick={() => {
                              setFilter({ ...filter, search: "" });
                              setKeyword("");
                            }}
                          />
                        ) : (
                          <SearchIcon className="text-[#606060]" />
                        )}
                      </div>
                    </div>
                    <div className="w-full flex xxs:hidden">
                      <div className=" flex flex-row items-center justify-center w-full flex-1 relative sm:mb-0 mb-2">
                        <input
                          type="text"
                          placeholder="Search here..."
                          className="shadow w-full  text-[#606060] bg-white pl-5 px-1 py-3 focus:outline-none  border-[1px] border-[#848abd] rounded-3xl"
                          name="search"
                          value={keyword}
                          onChange={handleSearch}
                        />
                        <div className="absolute right-2">
                          {filter.search.length > 0 ? (
                            <Close
                              onClick={() => {
                                setFilter({ ...filter, search: "" });
                                setKeyword("");
                              }}
                            />
                          ) : (
                            <SearchIcon className="text-[#606060]" />
                          )}
                        </div>
                      </div>
                      <div
                        className="cursor-pointer xxs:hidden flex items-center ml-2 text-[#848abd]"
                        id="All Filter"
                        onClick={(e) => {
                          setShowFilterMobile(!showFilterMobile);
                          setSwitchValue(e.currentTarget.id);
                        }}
                      >
                        <div
                          className={` flex items-center text-center justify-between w-full ${
                            switchValue === "All Filter"
                              ? "px-2 py-2 rounded-full border-none text-[#848abd]"
                              : ""
                          }  `}
                        >
                          <label className={`pointer-events-none min-w-[50px]`}>
                            <FilterListIcon />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 justify-center items-center font-jost ml-3">
                      <div className="xxs:flex hidden lg:text-[18px] text-[#606060] text-[14px]">
                        <div
                          className="cursor-pointer flex items-center justify-center mr-5 hover:text-[#848abd]"
                          id="All Filter"
                          onClick={(e) => {
                            setShow(!show);
                            setSwitchValue(e.currentTarget.id);
                          }}
                          ref={nodeRef as LegacyRef<HTMLDivElement>}
                        >
                          <div
                            className={` flex items-center text-center justify-between w-full ${
                              switchValue === "All Filter"
                                ? "px-2 py-2 rounded-full shadow border-none text-[#848abd]"
                                : ""
                            }  `}
                          >
                            <label
                              className={`pointer-events-none min-w-[50px]`}
                            >
                              All Filter
                            </label>
                          </div>
                        </div>
                        <div
                          className="cursor-pointer flex items-center justify-center mr-5 rounded-full border-none text-[#848abd]"
                          id="Skills"
                          onClick={(e) => {
                            setSwitchValue(e.currentTarget.id);
                          }}
                        >
                          <div
                            className={` flex w-full ${
                              switchValue === "Skills"
                                ? "px-2 py-2 rounded-full shadow border-none"
                                : ""
                            }  `}
                          >
                            <ComboboxSelect
                              label="Skills"
                              items={SkillSelect?.map((sk) => sk.skillName)}
                              selected={filter.skill}
                              setSelected={handleSkillSelect}
                              isSwitched={switchValue === "Skills"}
                            />
                          </div>
                        </div>
                        <div
                          className="cursor-pointer flex items-center justify-center rounded-full border-none text-[#848abd]"
                          id="Timezone"
                          onClick={(e) => {
                            setSwitchValue(e.currentTarget.id);
                          }}
                        >
                          <div
                            className={` flex w-full ${
                              switchValue === "Timezone"
                                ? "px-2 py-2 rounded-full shadow border-none"
                                : ""
                            }  `}
                          >
                            <ComboboxSelect
                              label="Timezone"
                              items={Object.values(TimeZone)}
                              selected={filter.timezone}
                              setSelected={handleTimezoneSelect}
                              isSwitched={switchValue === "Timezone"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {filter.skill.length || filter.timezone.length > 0 ? (
                <div className="p-2 text-[#848ABD]">
                  {filter.skill.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2 inline-block border my-1 rounded-full mr-2 w-fit text-sm cursor-pointer"
                        onClick={() => {
                          setFilter({
                            ...filter,
                            skill: filter.skill.filter((i) => i !== skill),
                          });
                        }}
                      >
                        <span className="text-[#606060]">Skills:</span>
                        <span>{skill}</span>
                        <Close className="text-sm cursor-pointer" />
                      </div>
                    );
                  })}
                  {filter.timezone &&
                    filter.timezone.map((tz, index) => {
                      return (
                        <div
                          key={index}
                          className="p-2 inline-block border my-1 rounded-full mr-2 w-fit text-sm cursor-pointer"
                          onClick={() => {
                            setFilter({
                              ...filter,
                              timezone: filter.timezone.filter((i) => i !== tz),
                            });
                          }}
                        >
                          <span className="text-[#606060]">Timezones:</span>
                          <span>{tz}</span>
                          <Close className="text-sm cursor-pointer" />
                        </div>
                      );
                    })}
                  <div
                    className="p-2 inline-block bg-[#848ABD] text-white rounded-full mr-2 w-fit text-sm cursor-pointer"
                    onClick={handleClearAll}
                  >
                    <span>Clear All</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-center justify-center 3xl:container w-full px-4 mx-auto">
              {teams.map((item, index) => (
                <TeamCard team={item as ITeam} key={index} />
              ))}
            </div>
            <div
              className={`flex items-center justify-center pb-2 ${
                teams.length > 0 ? "" : "mt-3"
              }`}
            >
              <ThemeProvider theme={theme}>
                <Pagination
                  className="custom-pagination "
                  count={totalPage}
                  page={currentPage}
                  variant="text"
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBack,
                        next: ArrowForward,
                      }}
                      {...item}
                    />
                  )}
                  onChange={(e, value) => {
                    handlePageChange(value);
                  }}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>

        <div
          className={`fixed right-0 top-0 font-jost bg-white overflow-y-scroll h-full custom-scrollbar z-50 p-2 xxs:w-[300px] w-full xs:w-fit shadow-xl text-cyan-900 animate-slide-in-left ${
            show || showFilterMobile ? "" : "hidden"
          }`}
          ref={subNodeRef as LegacyRef<HTMLDivElement>}
        >
          <div className="flex items-center justify-center relative p-2">
            <div
              className="absolute left-2 cursor-pointer"
              onClick={() => {
                setShow(false);
                setShowFilterMobile(false);
              }}
            >
              <CancelOutlined className="text-[#606060]" />
            </div>
            <span className="text-xl 3xl:text-3xl text-[#606060]">
              All Filter
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex flex-row items-center justify-center flex-1 w-full relative">
              <input
                type="text"
                placeholder="Search here..."
                className="shadow w-full  text-[#606060] bg-white pl-5 px-1 py-3 focus:outline-none 3xl:placeholder:text-xl rounded-full"
                name="search"
                onChange={handleSearch}
                value={keyword}
              />

              <div className="absolute right-2">
                {filter.search.length > 0 ? (
                  <Close
                    onClick={() => {
                      setFilter({ ...filter, search: "" });
                      setKeyword("");
                    }}
                    className="cursor-pointer"
                  />
                ) : (
                  <SearchIcon className="text-[#606060]" />
                )}
              </div>
            </div>
            <div className="w-full">
              <ComboboxSelect
                label={"Skills"}
                items={SkillSelect?.map((sk) => sk.skillName)}
                selected={filter.skill}
                setSelected={handleSkillSelect}
                isCollapsor={true}
                className="py-2 w-full 3xl:text-lg placeholder:text-xl border-b"
              />
              <ComboboxSelect
                label={"Timezones"}
                items={Object.values(TimeZone)}
                selected={filter.timezone}
                setSelected={handleTimezoneSelect}
                isCollapsor={true}
                className="py-2 w-full border-b 3xl:text-lg placeholder:text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
