import About from "../pages/home/About";

import SpeciesPortraits from "../pages/species/SpeciesPortraits";
import SpeciesName from "../pages/species/SpeciesName";
import SpeciesTraits from "../pages/species/SpeciesTraits";
import Planet from "../pages/homeworld/Planet";
import City from "../pages/homeworld/City";
import EmpireOrigin from "../pages/government/EmpireOrigin";

const tabsData = [
  {
    label: "Home",
    menuItem: [
      { menuLabel: "About", content: <About /> }
    ],
  },
  {
    label: "Species",
    menuItem: [
      { menuLabel: "Appearance", content: <SpeciesPortraits /> },
      { menuLabel: 'Name', content: <SpeciesName /> },
      { menuLabel: 'Traits', content: <SpeciesTraits /> },
    ],
  },
  {
    label: "Homeworld",
    menuItem: [
      { menuLabel: "Planet", content: <Planet />},
      { menuLabel: "City Appearance", content: <City />}
    ]
  },
  {
    label: "Government",
    menuItem: [
      { menuLabel: "Origin", content: <EmpireOrigin />}
    ]
  }
];

export default tabsData;