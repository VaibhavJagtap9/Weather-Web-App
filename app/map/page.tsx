import CityCard from '@/components/CityCard'
import CurrentCard from '@/components/CurrentCard'
import DetailCard from '@/components/DetailCard'
import MapBox from '@/components/MapBox'
import Search from '@/components/Search'
import Sidebar from '@/components/Sidebar'
import TodayCard from '@/components/TodayCard'

import { CityProvider } from '@/components/context/CityContext'


export default function Maps() {
  return (
    <div className="md:min-h-screen h-auto relative overflow-x-hidden flex box-border dark:bg-slate-950">
      <Sidebar />
      {/* Main */}
      <div className="w-full flex flex-col md:flex-row">

        <CityProvider>
          <div className="md:w-3/6 w-full p-4">
            <Search />
            <div className="flex min-h-72 flex-col h-64 md:h-[90%] mt-3">
              <MapBox />
            </div>
          </div>
          {/* right side  */}
          <div className="md:w-3/6  h-full p-4 md:pt-12 md:pr-6 mb-36 md:mb-0 pb-1 " >
            <CurrentCard />
            <TodayCard />
          </div>
        </CityProvider>
      </div>
    </div>
  )
}
