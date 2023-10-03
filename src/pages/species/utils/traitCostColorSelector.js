export default function traitCostColorSelector(traitCost) {
  if (traitCost > 0) {
    return "text-red-400"
  } else if (traitCost < 0) {
    return "text-green-500"
  } else {
    return "text-yellow-400"
  }
}
