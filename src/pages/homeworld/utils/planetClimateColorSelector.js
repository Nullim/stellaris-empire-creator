export default function planetClimateColorSelector(planetClimate) {
  if(planetClimate === "(Dry Climate)") {
    return "text-yellow-400";
  } else if (planetClimate === "(Wet Climate)") {
    return "text-green-500";
  } else {
    return "text-cyan-500";
  }
}