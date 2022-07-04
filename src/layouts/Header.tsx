import { useAppSelector } from '@/redux/hooks';
import {
    BookmarkBorderOutlined,
    ChatOutlined,
    CreateOutlined,
    KeyboardArrowDownOutlined,
    Menu,
    PersonOutline,
    Search,
} from '@mui/icons-material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Header = () => {
    const user = useAppSelector((state) => state.ProfileReducer.userInfo);
    const [userImage, setUserImage] = useState(user.avatarPath);
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    return (
        <>
            <div className="bg-cyan-900 text-white ">
                <div className="flex flex-col items-center justify-center w-full border-b border-cyan-700">
                    <div className="flex md:flex-row flex-col md:items-center items-start justify-center w-full md:w-4/5 px-2 pt-2">
                        <div className="flex justify-between w-full md:w-auto">
                            <div className="md:hidden">
                                <Menu
                                    onClick={() => {
                                        setShowMenu(!showMenu);
                                    }}
                                />
                            </div>
                            <Link href="/">
                                <a className="text-2xl font-semibold text-white cursor-pointer flex items-center">
                                    KryptoHub
                                </a>
                            </Link>
                            <div className="md:hidden">
                                <Search />
                            </div>
                        </div>
                        <div
                            className={`${
                                showMenu ? 'flex' : 'hidden'
                            } md:flex flex-col flex-1 w-full`}
                        >
                            <div className="flex flex-row items-center xs:justify-end justify-between  text-white">
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="shadow appearance-none border  w-full focus:outline-none focus:shadow-outline bg-transparent pl-2"
                                    />
                                    <div className="ml-[-1.5rem]">
                                        <Search fontSize="small" />
                                    </div>
                                </div>
                                <div className="uppercase tracking-wider text-xs ml-2 hover:underline flex items-center justify-center">
                                    {user.username ? (
                                        <div className="flex justify-end items-center">
                                            <div className="flex group relative">
                                                <input
                                                    type="text"
                                                    id="showDropdown"
                                                    className="w-0 peer"
                                                />
                                                <label
                                                    htmlFor="showDropdown"
                                                    className="cursor-pointer"
                                                >
                                                    <span className="block">
                                                        {user?.username ||
                                                            'anonymous'}{' '}
                                                        <ArrowDropDown />
                                                    </span>
                                                </label>
                                                <div
                                                    className="invisible flex flex-col absolute z-10 top-6 border md:min-w-[130px] w-full bg-white text-cyan-800
               peer-focus:visible  peer-focus:z-20 peer-focus:animate-slide-in-up hover:visible"
                                                >
                                                    <Link href="/profile">
                                                        <div className="p-1 border-l-2 border-white hover:border-red-700 hover:text-red-700 cursor-pointer">
                                                            <a>Profile</a>
                                                        </div>
                                                    </Link>
                                                    <Link href="/manage-teams">
                                                        <div
                                                            className="p-1 border-l-2 border-white hover:border-red-700 hover:text-red-700 cursor-pointer relative
                            before:w-full before:h-[1px] before:bg-cyan-800 before:absolute before:top-0"
                                                        >
                                                            <a>Manage Teams</a>
                                                        </div>
                                                    </Link>
                                                    <div
                                                        className="p-1 border-l-2  border-white hover:border-red-700 hover:text-red-700 cursor-pointer relative
                            before:w-full before:h-[1px] before:bg-cyan-800 before:absolute before:top-0"
                                                        onClick={() => {
                                                            localStorage.removeItem(
                                                                'accessToken',
                                                            );
                                                            signOut({
                                                                callbackUrl:
                                                                    '/',
                                                            });
                                                        }}
                                                    >
                                                        <span>Logout</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={'/profile'}>
                                                <a>
                                                    <Image
                                                        src={
                                                            userImage ||
                                                            '/favicon.ico'
                                                        }
                                                        alt="avatar"
                                                        className="w-8 h-8 rounded-full"
                                                        width={32}
                                                        height={32}
                                                        onError={(e) => {
                                                            setUserImage(
                                                                '/user1.png',
                                                            );
                                                        }}
                                                    />
                                                </a>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="text-white font-semibold hover:text-cyan-400 text-right">
                                            <Link href={`/login`}>
                                                <a>
                                                    <span>Sign in</span>
                                                    <PersonOutline className="text-sm" />
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex xs:flex-row flex-col md:items-center items-start justify-end font-semibold xl:text-xl pt-4 px-4 lg:text-lg text-md ">
                                <div className="cursor-pointer group relative mr-2">
                                    <div className="">
                                        <Link href={'/teams'}>
                                            <a>
                                                <span>List Team</span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="border-l border-cyan-700 px-2 cursor-pointer">
                                    <span>
                                        0{' '}
                                        <BookmarkBorderOutlined className="text-red-800" />
                                    </span>
                                </div>
                                <div className="border-l border-cyan-700 px-2 cursor-pointer">
                                    <span>
                                        0{' '}
                                        <ChatOutlined className="text-red-800" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
