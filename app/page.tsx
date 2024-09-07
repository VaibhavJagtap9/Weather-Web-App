import CurrentCard from '@/components/CurrentCard'
import DetailCard from '@/components/DetailCard'
import Search from '@/components/Search'
import Sidebar from '@/components/Sidebar'
import TodayCard from '@/components/TodayCard'
import WeekCard from '@/components/WeekCard'

import { CityProvider } from '@/components/context/CityContext'
import Image from 'next/image'

export default function Home() {
  return (
    
    <div className="md:min-h-screen relative overflow-x-hidden flex box-border dark:bg-slate-950">
      <Sidebar/>
      {/* Main */}
      <div className="w-full flex flex-col md:flex-row">

        <CityProvider>
          <div className="md:w-4/6 w-full p-4">
            <Search />
            <CurrentCard />
            {/*  */}
            <TodayCard />

          </div>
          {/* right side  */}
          <div className="md:w-2/6 h-full p-4 md:pt-16 md:pr-6 mb-36 md:mb-0" >
            <WeekCard />
          </div>
        </CityProvider>
      </div>
    </div>
  )
}
