import { useEffect } from "react"

export default function EmpireDisplay() {
  function handleUrlChange() {
    console.log("URL has changed!", window.location.href);
  }

  useEffect(() => {
    window.addEventListener("popstate", handleUrlChange);
  }, [])
  return (
    <div>Here goes the user empire info</div>
  )
}