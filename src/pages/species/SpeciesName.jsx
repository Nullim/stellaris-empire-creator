import { useState } from "react"
import GenderSelection from "../../components/GenderSelection";

export default function SpeciesName() {
  const [name, setName] = useState("");
  const [adjective, setAdjective] = useState("");
  const [namePlural, setNamePlural] = useState("");
  const [gender, setGender] = useState("default")

  console.log(gender); // This is a placeholder to get rid of the eslint warning. Remove before final release.

  const changeName = (e) => {
    setName(e.target.value);
  }

  const changeNamePlural = (e) => {
    setNamePlural(e.target.value);
  }

  const changeAdjective = (e) => {
    setAdjective(e.target.value);
  }

  const changeGender = (selectedGender) => {
    setGender(selectedGender)
  }

  return (
    <div className="flex justify-evenly font-bold">
      <div className="block">
        <div className="flex flex-col pt-10">
          <label className="pb-1">Name</label>
          <input
            className="bg-black/30 backdrop-blur-md font-normal pl-1"
            value={name}
            onChange={changeName}
          ></input>
        </div>
        <div className="flex flex-col pt-2">
          <label className="pb-1">Plural</label>
          <input
            className="bg-black/30 backdrop-blur-md font-normal pl-1"
            value={namePlural}
            onChange={changeNamePlural}
          ></input>
        </div>
        <div className="flex flex-col pt-2">
          <label className="pb-1">Adjective</label>
          <input
            className="bg-black/30 backdrop-blur-md font-normal pl-1"
            value={adjective}
            onChange={changeAdjective}
          ></input>
        </div>
      </div>
      <div className="block">
        <div className="flex flex-col pt-10">
          <label className="pb-1">Biography (optional)</label>
          <textarea 
            className="bg-black/30 backdrop-blur-md font-normal pl-1 resize-none" 
            rows={5} 
            cols={50} 
            spellCheck={false}
          />
        </div>
      </div>
      <div className="block">
        <div className="flex flex-col pt-10">
          <label className="pb-1">Gender (optional)</label>
          <GenderSelection handleGenderClick={changeGender} />
        </div>
      </div>
    </div>
  )
}