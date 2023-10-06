export default function planetTypeColorSelector (planetType, validatedPlanetTypes) {

  if(validatedPlanetTypes) {
    if (planetType === "Dry") {
      return "text-yellow-400"
    } else if (planetType === "Wet") {
      return "text-green-500"
    } else {
      return "text-cyan-500"
    }
  } else {
    return ""
  }
}
