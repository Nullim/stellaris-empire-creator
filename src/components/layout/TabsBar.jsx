import PropTypes from 'prop-types';
import Tab from "./Tab";

function TabsBar({ tabs, onTabClick, activeTab }) {
  return (
    <div>
      <div className="flex m-2 gap-5">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={index === activeTab}
            onClick={() => onTabClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

TabsBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired
}

export default TabsBar;
