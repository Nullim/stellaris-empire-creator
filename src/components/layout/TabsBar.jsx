import PropTypes from 'prop-types';
import { useState } from 'react';

const TabsBar = ({ tabs, activeTab, onTabClick, onMenuItemSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuItemSelect = (menuItem, tabLabel) => {
    onMenuItemSelect(menuItem, tabLabel);
    setIsOpen(false)
  };

  const handleTabMouseLeave = () => {
    setIsOpen(false)
  }

  const handleTabMouseHover = (index) => {
    setIsOpen(true)
    onTabClick(index)
  };

  return (
    <div className="relative inline-block m-2">
      {tabs.map((tab, index) => (
        <div 
          key={index} 
          className="relative inline-block" 
          onMouseEnter={() => handleTabMouseHover(index)} 
          onMouseLeave={handleTabMouseLeave}
        >
          <button
            style={{ cursor: `url(/images/ui/cursor_pointer.png), pointer` }}
            className={`px-4 py-2 font-bold ${
              activeTab === index ? "bg-blue-800 text-white" : "bg-blue-900 text-white"
            }`}
          >
            {tab.label}
          </button>
  
          {isOpen && activeTab === index && (
            <div className="absolute w-32 bg-blue-800">
              {tab.menuItem.map((item, itemIndex) => (
                <button
                  style={{ cursor: `url(/images/ui/cursor_pointer.png), pointer` }}
                  key={itemIndex}
                  className="block px-3 py-1 text-white hover:bg-blue-700 w-full text-left z-50"
                  onClick={() => handleMenuItemSelect(item, tab.label)}
                >
                  {item.menuLabel}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

TabsBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      menuItem: PropTypes.arrayOf(
        PropTypes.shape({
          menuLabel: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  onMenuItemSelect: PropTypes.func.isRequired
}

export default TabsBar;
