import SearchIcon from "@mui/icons-material/Search";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { Header } from "@/src/layouts/Header";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { Team } from "@/type/team/team.type";
const data = [
  {
    name: "Algoworks",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/200-x-200.png",
    description: "Go Mobile. Go Cloud. Go Digital",
    rating: 4.9,
    reviewsCount: 67,
    size: 500,
    timezone: "UTC/GMT + 5",
    organization: "Algoworks",
    workingTime: "8:00 - 18:00",
    skills: ["Mobile", "Cloud", "Digital", "Crypto"],
  },
  {
    name: "Hyperlink InfoSystem",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/logo_new.jpg",
    description: "Best Android & iPhone App Development Services",
    rating: 4.8,
    reviewsCount: 110,
    size: 99,
    timezone: "UTC/GMT + 6",
    organization: "Hyperlink",
    workingTime: "8:00 - 18:00",
    skills: ["Web", "Blockchain", "AI", "Cloud"],
  },
  {
    name: "Algoworks",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/200-x-200.png",
    description: "Go Mobile. Go Cloud. Go Digital",
    rating: 4.9,
    reviewsCount: 67,
    size: 500,
    timezone: "UTC/GMT + 7",
    organization: "Algoworks",
    workingTime: "8:00 - 18:00",
    skills: ["Mobile", "Cloud", "Digital", "Crypto"],
  },
  {
    name: "Hyperlink InfoSystem",
    logo: "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/logo_new.jpg",
    description: "Best Android & iPhone App Development Services",
    rating: 4.8,
    reviewsCount: 110,
    size: 99,
    timezone: "UTC/GMT + 8",
    organization: "Hyperlink",
    workingTime: "8:00 - 18:00",
    skills: ["Web", "Blockchain", "Digital", "Crypto"],
  },
] as Team[];
const SkillSelect =  ['All Skill', 'Mobile', 'Web', 'Blockchain', 'Crypto', 'Digital', 'Cloud', 'AI'];
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
export const Teams = () => {
  const [teams, setTeams] = useState(data);
  const [filter, setFilter] = useState({search:'', skill:[] as number[], timezone:0});

  useEffect(()=>{
    let filtered = data.filter(team => team.name.toLowerCase().includes(filter.search.toLowerCase()));
    if(filter.skill.length !== 0){
      filtered = filtered.filter((team) => {
        for( let i=0;i< team.skills.length; i++){
          if(filter.skill.includes(SkillSelect.indexOf(team.skills[i]))){
            return true;
          }
        }
      }
      );
    }
    if(filter.timezone !== 0){
      filtered = filtered.filter((team) =>
        team.timezone === TimezoneSelect[filter.timezone]
      );
    }
    setTeams(filtered);
  }, [filter]);

  const handleSearch = (event: any) => {
    setFilter({...filter, search: event.target.value});
  }

  const handleSkillSelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    console.log(value)
    if(value === 0 ){
      setFilter({...filter, skill: []});
    }
    else if(filter.skill.includes(value)){
      setFilter({...filter, skill: filter.skill.filter(skill => skill !== value)});
    } else {
      setFilter({ ...filter, skill:[...filter.skill, value] });
    }
    
  };

  const handleTimezoneSelect = (event: FormEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    setFilter({...filter, timezone: parseInt(target.value)});
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center px-1">
        <div className="container-lg relative border-x-2  xl:w-3/4 md:w-11/12 lg:w-5/6 w-full  shadow-xl">
          <div className="sticky top-0 w-full flex flex-col text-cyan-700 bg-white z-10">
            <div className="flex flex-row border-b ">
              <div className="flex flex-row items-center justify-between">
                <div className="flex ">
                  <div className="p-1 xs:p-4 bg-cyan-900 text-white font-semibold border-2 border-cyan-900 mr-2 hidden sm:block">
                    <span>{teams.length} Teams</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white">
                <div className="flex flex-col xs:flex-row p-2 items-end xs:items-center  justify-center text-sm md:text-md w-full h-full">
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
                  </div>
                  <div className="flex flex-1 justify-end">
                    <div className="items-center justify-center h-fit border-2 border-cyan-800 p-1 xs:p-2 ml-2 flex ">
                      <select
                        className="bg-transparent"
                        name="skill[]"
                        id=""
                        defaultValue={0}
                        onChange={handleSkillSelect}
                      >
                        {SkillSelect.map((key, index) => {
                          if(filter.skill.includes(index)){
                            return <option value={index} className="bg-cyan-300">{key}</option>
                          }
                          return (
                            <option key={index} value={index}>
                              {key}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="items-center justify-center h-fit border-2 border-cyan-800 p-1 xs:p-2 ml-2 flex">
                      <select
                        className="bg-transparent"
                        name="timezone"
                        id=""
                        defaultValue={0}
                        onChange={handleTimezoneSelect}
                      >
                        {TimezoneSelect.map((key, index) => (
                          <option key={index} value={index}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="items-center justify-center h-fit border-2 border-cyan-800 p-1 xs:p-2 ml-2 xs:hidden flex">
                      <select
                        name="sort"
                        id=""
                        defaultValue=""
                        className="bg-transparent"
                      >
                        <option hidden value="">
                          Sort by
                        </option>
                        <option value="1">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden xs:flex flex-row items-center justify-center xs:p-2 sm:p-4 border-l">
                <select
                  className="px-1 flex items-center border border-cyan-700 h-full p-1 xs:p-2"
                  name="sort"
                  id=""
                  defaultValue=""
                >
                  <option hidden value="">
                    Sort by
                  </option>
                  <option value="1">Rating</option>
                </select>
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
