'use client';

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FaCloudSunRain, FaListUl, FaMap, FaSlidersH } from "react-icons/fa";
import { BsMoonStars, BsSunFill } from 'react-icons/bs';
import { RiMoonClearLine, RiSunCloudyLine, RiSunFoggyLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation';




const Sidebar = () => {

    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    console.log(pathname == "/");

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        localTheme && setTheme(localTheme)

    }, [])

    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
    }


    return (
        <div className="md:h-auto w-full  md:w-auto md:p-4 px-4 fixed left-0 right-0  md:static bottom-4 ">

            <aside className="flex md:flex-col mx-3 md:mx-0 md:py-4 bg-white flex-row rounded-xl right-3 left-3  items-center h-full  md:bg-gray-100 dark:md:bg-slate-900  md:text-gray-700 dark:text-gray-200 md:shadow-md shadow-gray-300 dark:bg-slate-900">
                <div className="h-16 flex items-center justify-between md:justify-center md:w-full">
                    <Link className="px-3 md:px-0 hidden md:block" href="/">
                        <img
                            className="md:h-12 md:w-12 md:mx-auto"
                            src="/logo.png"
                            alt="svelte logo"
                        />
                    </Link>
                </div>

                <ul className='md:mt-16 flex md:flex-col items-center w-full justify-between flex-row'>
                    <li className={` ` + (pathname == "/" ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200')}>
                        <Link
                            href="."
                            className="h-16 px-3 md:px-6 flex flex-col justify-center items-center w-full focus:text-orange-500 "
                        >
                            <FaCloudSunRain className="text-md md:text-2xl" />
                            <span className="text-xs mt-1.5 font-medium">Weather</span>
                        </Link>
                    </li>
                    <li className={` ` + (pathname == "/cities" ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200')}>
                        <Link
                            href="/cities"
                            className="h-16 px-3 md:px-6 flex flex-col justify-center items-center w-full focus:text-orange-500"
                        >
                            <FaListUl className="text-md md:text-2xl" />
                            <span className="text-xs mt-1.5 font-medium">Cities</span>
                        </Link>
                    </li>
                    <li className={" " + (pathname === "/map" ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200')}>
                        <Link
                            href="/map"
                            className="h-16 px-3 md:px-6 flex flex-col justify-center items-center w-full focus:text-orange-500"
                        >
                            <FaMap className="text-md md:text-2xl" />
                            <span className="text-xs mt-1.5 font-medium">Map</span>
                        </Link>
                    </li>
                    <li className={` ` + (pathname == "/settings" ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200')}>
                        <Link
                            href="/settings"
                            className="h-16 px-3 md:px-6 flex flex-col justify-center items-center w-full focus:text-orange-500 md:text-gray-800 dark:text-gray-200"
                        >
                            <FaSlidersH className="text-md md:text-2xl" />
                            <span className="text-xs mt-1.5 font-medium">Settings</span>
                        </Link>
                    </li>


                </ul>

                <div className="mt-auto h-16 flex items-center w-full">
                    <button
                        onClick={changeTheme}
                        className="h-16 mx-auto flex  justify-center items-center m-0.5 w-full rounded-md  focus:text-white md:text-gray-800 dark:text-gray-200  focus:outline-none"
                    >{
                            theme == 'light' ? <RiMoonClearLine className="text-md md:text-2xl text-gray-800 dark:text-gray-200" />
                                : <RiSunFoggyLine className="text-md md:text-2xl text-gray-800 dark:text-gray-200" />

                        }
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;