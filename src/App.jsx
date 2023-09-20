import { useState } from "react";
import TabsBar from "./components/layout/TabsBar";
import Home from "./pages/about/Home";
import SpeciesPortraits from "./pages/species/SpeciesPortraits";
import SpeciesName from "./pages/species/SpeciesName";

const tabs = [
  {
    label: "About",
    menuItem: [
      { menuLabel: "Home", content: <Home /> }
    ],
  },
  {
    label: "Species",
    menuItem: [
      { menuLabel: "Appearance", content: <SpeciesPortraits /> },
      { menuLabel: 'Name', content: <SpeciesName />}
    ],
  },
];
export default function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedMenuItem, setSelectedMenuItem] = useState(tabs[0].menuItem[0]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="relative overflow-hidden">
      <img className="w-full h-screen object-cover" draggable="false" src="/images/background.png" alt="Background Image" />
      
      <div className="absolute w-full h-full inset-0 flex flex-col mt-8 justify-start items-center">
        <div className="flex justify-center items-end w-11/12 bg-black/40 backdrop-blur-sm border-b border-green-700 z-10">
          <TabsBar 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabClick={handleTabClick} 
            onMenuItemSelect={handleMenuItemSelect}
          />
        </div>
        <div className="w-11/12 h-5/6 bg-black/40 text-white backdrop-blur-sm flex flex-col z-0">
          <div className="h-2/5 text-center">
            Content
          </div>
          <div className="h-3/5">
            {selectedMenuItem.content}
          </div>
        </div>
      </div>
    </div>
  )
}
