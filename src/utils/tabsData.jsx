import About from "../pages/home/About";

import SpeciesPortraits from "../pages/species/SpeciesPortraits";
import SpeciesName from "../pages/species/SpeciesName";
import SpeciesTraits from "../pages/species/SpeciesTraits";
import Homeworld from "../pages/government/Homeworld";

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
    label: "Government",
    menuItem: [
      { menuLabel: "Homeworld", content: <Homeworld />},
    ]
  },
];

export default tabsData;