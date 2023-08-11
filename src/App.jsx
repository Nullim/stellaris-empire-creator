import { useState } from "react";
import TabsBar from "./components/layout/TabsBar";
import Home from "./pages/Home";
import Species from "./pages/Species";

const tabs = [
  { label: 'Home', content: <Home />},
  { label: 'Species', content: <Species />}
]

export default function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="relative overflow-hidden">
      <img className="w-full h-screen object-cover" draggable="false" src="/images/background.png" alt="Background Image" />
      
      <div className="absolute w-full h-full inset-0 flex flex-col mt-16 justify-start items-center">
        <div className="flex justify-center items-end w-4/5 bg-black/40 backdrop-blur-sm border-b border-green-700">
          <TabsBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
        </div>
        <div className="w-4/5 h-3/4 bg-black/40 text-white backdrop-blur-sm">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  )
}
