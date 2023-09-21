import Home from "../pages/about/Home";

import SpeciesPortraits from "../pages/species/SpeciesPortraits";
import SpeciesName from "../pages/species/SpeciesName";
import SpeciesTraits from "../pages/species/SpeciesTraits";

const tabsData = [
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
      { menuLabel: 'Name', content: <SpeciesName /> },
      { menuLabel: 'Traits', content: <SpeciesTraits /> },
    ],
  },
];

export default tabsData;