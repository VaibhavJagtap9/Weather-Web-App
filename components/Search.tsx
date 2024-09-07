'use client';
import React, { useState, useContext,useEffect } from 'react'
import { CityContext } from './context/CityContext';
import { FaCross, FaSearch } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const Search = () => {
  const { cityName, setCityName } = useContext(CityContext)
  const [city, setCity] = useState(cityName);
  const handleSearch = () => {
    setCityName(city);
  }
  const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === `Enter`) {
      setCityName(city);
    }
  }

  useEffect(() => {
    setCity(cityName);
  
    
  }, [cityName])
  
  
  return (
    <div className="flex mx:3 w-full items-center bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden px-2 py-1.5 justify-between">
      <input onKeyUp={(e)=>handleEnter(e)} value={city} onChange={(e)=>setCity(e.target.value)} className="text-base bg-transparent flex-grow outline-none px-2 " type="text" placeholder="Search your city" />
      <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">

      <button onClick={handleSearch} className="bg-blue-400 text-white text-base rounded-lg px-4 py-2 font-thin active:bg-blue-500 hover:shadow-sm shadow-blue-200"><FaSearch /></button>
        
        
      </div>
    </div>

  )
}

export default Search;