import { useState } from "react";
import TabsBar from "./components/layout/TabsBar";
import tabsData from "./utils/tabsData"
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
    <div className="relative overflow-hidden font-gothic">
      <img className="w-full h-screen object-cover" draggable="false" src="/images/background.png" alt="Background Image" />
      
      <div className="absolute w-full h-full inset-0 flex flex-col mt-8 justify-start items-center">
        <div className="flex justify-center items-end w-11/12 bg-black/40 backdrop-blur-sm border-b border-green-700 z-10">
          <TabsBar 
            tabs={tabsData} 
            activeTab={activeTab} 
            onTabClick={handleTabClick} 
            onMenuItemSelect={handleMenuItemSelect}
          />
        </div>
        <div className="w-11/12 h-5/6 bg-black/40 text-white backdrop-blur-sm flex flex-col z-0">
          <div className="h-1/2 text-center">
            Content
          </div>
          <div className="h-1/2 border border-green-600">
            {selectedMenuItem.content}
          </div>
        </div>
      </div>
    </div>
  )
}
