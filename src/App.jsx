import { useState } from "react";
import TabsBar from "./components/layout/TabsBar";
import tabsData from "./utils/tabsData"
import EmpireDisplay from "./pages/EmpireDisplay";
export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedMenuItem, setSelectedMenuItem] = useState(tabsData[0].menuItem[0]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="relative overflow-hidden font-gothic flex flex-col box-border" style={{ cursor: `url(/images/ui/cursor_normal.png), auto` }}>
      <img className="w-full h-screen object-cover" draggable="false" src="/images/background.png" alt="Background Image" />
      <div className="absolute w-full h-full inset-0 flex flex-col mt-8 justify-start items-center">
        <div className="flex justify-center items-end w-11/12 bg-black/50 backdrop-blur-sm border-b border-blue-700 z-50">
          <TabsBar 
            tabs={tabsData} 
            activeTab={activeTab} 
            onTabClick={handleTabClick} 
            onMenuItemSelect={handleMenuItemSelect}
          />
        </div>
        <div className="w-11/12 h-5/6 bg-black/50 text-white backdrop-blur-sm flex flex-col z-0">
          <div className="h-1/2 z-0">
            <EmpireDisplay />
          </div>
          <div className="h-1/2 border bg-black/50 border-blue-600">
            {selectedMenuItem.content}
          </div>
        </div>
      </div>
    </div>
  )
}
