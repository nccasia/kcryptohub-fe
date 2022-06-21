import { teamApi } from '@/api/team-api';
import { useAppSelector } from '@/redux/hooks';

import { Team } from '@/type/team/team.type';
import {
    AccessAlarmOutlined,
    ApartmentOutlined,
    ApiOutlined,
    ArrowForwardIosOutlined,
    AvTimerOutlined,
    BookmarkBorderOutlined,
    BookmarkOutlined,
    CheckCircleOutlined,
    ContactlessOutlined,
    GroupsOutlined,
    InfoOutlined,
    LabelOutlined,
    LanguageOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IconHover } from './IconHover';
const skillColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-gray-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-lime-500',
    'bg-indigo-700',
    'bg-pink-700',
    'bg-gray-700',
    'bg-teal-700',
    'bg-cyan-700',
    'bg-lime-700',
    'bg-red-700',
    'bg-orange-700',
    'bg-yellow-700',
    'bg-green-700',
    'bg-blue-700',
    'bg-lime-300',
    'bg-indigo-300',
    'bg-pink-300',
    'bg-gray-300',
    'bg-teal-300',
    'bg-cyan-300',
];
interface Props {
    team: Team;
}

export const TeamCard = (props: Props) => {
    const team = props.team;
    const [teamImgSrc, setTeamImgSrc] = useState(team.imageUrl? teamApi.getTeamImageUrl(team.imageUrl) : '/user1.png');
    return (
        <div className="flex md:flex-row w-full border-y my-4 shadow-md flex-col">
            <div className="flex-1">
                <div className="flex xs:flex-row flex-col items-start border-b relative">
                    <div className="flex items-center justify-center p-2">
                        <Image
                            width={50}
                            height={50}
                            src={teamImgSrc}
                            placeholder="blur"
                            blurDataURL="/user1.png"
                            onError={() => setTeamImgSrc('/user1.png')}
                            alt="logo"
                        />
                    </div>
                    <div className="flex flex-col w-full px-2">
                        <div className="flex flex-row ">
                            <div className="flex items-end">
                                <Link href={`/team/${team.id}`}>
                                    <a className="text-3xl">{team.teamName}</a>
                                </Link>
                                <span className="text-cyan-700 ml-2">
                                    {team.slogan}
                                </span>
                            </div>
                            <div className="absolute top-0 right-0 flex-1 text-right">
                                <div className="absolute top-[-6px] right-6 group">
                                    <BookmarkBorderOutlined className="absolute " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex xs:flex-row flex-col">
                    <div className="xs:flex grid grid-cols-2 flex-col text-sm p-4 xs:w-1/4">
                        {team.status ? (
                            <span className="text-red-500">
                                <CheckCircleOutlined /> Verified
                            </span>
                        ) : null}
                        {
                            <span className="text-cyan-900">
                                <IconHover
                                    icon={<LabelOutlined />}
                                    hoverText="Project Size"
                                />
                                <span className="text-left ml-1">
                                    {team.projectSize}
                                </span>
                            </span>
                        }
                        <span className="text-cyan-900">
                            <IconHover
                                icon={<AccessAlarmOutlined />}
                                hoverText="Working hours"
                            />
                            <span className="text-left ml-1">
                                {team.workingTime} hours/week
                            </span>
                        </span>
                        <span className="text-cyan-900">
                            <IconHover
                                icon={<GroupsOutlined />}
                                hoverText="Team size"
                            />
                            <span className="text-left ml-1">
                                {team.teamSize}
                            </span>{' '}
                            members
                        </span>
                        <span className="text-cyan-900">
                            <IconHover
                                icon={<AvTimerOutlined />}
                                hoverText="Timezone"
                            />
                            <span className="text-left ml-1">
                                {team.timeZone}
                            </span>
                        </span>
                        {team.organization ? (
                            <span className="text-cyan-900">
                                <IconHover
                                    icon={<ApartmentOutlined />}
                                    hoverText="Organization"
                                />
                                <span className="text-left ml-1">
                                    {team.organization}
                                </span>
                            </span>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-start justify-start p-4 border-x xs:w-1/2 ">
                        <div className="flex w-full">
                            <IconHover
                                icon={<ApiOutlined />}
                                hoverText="Skills"
                            />
                            <div className="text-cyan-900 w-full break-normal">
                                {team.skills &&
                                    team.skills.map((skill, i) => (
                                        <div
                                            key={i}
                                            className="inline-block p-1"
                                        >
                                            <span
                                                className={`px-2 py-1  rounded-2xl ${
                                                    skillColor[
                                                        skill.id
                                                            ? skill.id %
                                                              skillColor.length
                                                            : Math.round(
                                                                  Math.random() *
                                                                      (skillColor.length -
                                                                          1),
                                                              )
                                                    ]
                                                } text-white ml-2 mt-2 font-medium`}
                                            >
                                                {skill.skillName}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="xs:w-1/4 p-4 text-sm text-cyan-900">
                        <div className="">
                            <span className="font-medium ">Founded: </span>
                            {team.founded}
                        </div>

                        <div className="">
                            <span className="font-medium ">Description: </span>
                            <p className="max-h-[8rem] overflow-hidden text-ellipsis">
                                {team.description.length > 100
                                    ? team.description.slice(0, 100) + '...'
                                    : team.description}
                                {team.description.length > 100 ? (
                                    <span
                                        className="text-cyan-400 cursor-pointer"
                                        onClick={() => {}}
                                    >
                                        More
                                    </span>
                                ) : null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row md:flex-col border-l text-cyan-700 transition-all duration-500 ease-in-out text-sm xs:text-md">
                <a
                    className="sm:px-2 flex items-center justify-start h-1/3 flex-1 border"
                    href={
                        team.linkWebsite
                            ? team.linkWebsite.includes('https')
                                ? team.linkWebsite
                                : `https://${team.linkWebsite} `
                            : '#'
                    }
                >
                    <span className="xs:p-4 w-full bg-red-500 font-semibold text-white flex justify-between cursor-pointer border-2 border-red-500 hover:bg-transparent hover:text-red-500">
                        Visit Website <LanguageOutlined fontSize="small" />
                    </span>
                </a>
                <Link href={`/team/${team.id}`}>
                    <a className="px-2 flex items-center justify-start h-1/3 border cursor-pointer hover:text-red-500 flex-1">
                        <span className="xs:p-4  w-full flex justify-between">
                            View Profile <InfoOutlined fontSize="small" />
                        </span>
                    </a>
                </Link>
                <Link href={`/team/${team.id}/contact`}>
                    <a className="px-2 flex items-center justify-start h-1/3 border cursor-pointer hover:text-red-500 flex-1">
                        <span className="xs:p-4 w-full flex justify-between">
                            Contact <ContactlessOutlined fontSize="small" />
                        </span>
                    </a>
                </Link>
            </div>
        </div>
    );
};
