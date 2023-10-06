import { useEffect, useState } from "react"
import GenderSelection from "./layout/GenderSelection";

export default function SpeciesName() {
  const [name, setName] = useState("");
  const [adjective, setAdjective] = useState("");
  const [namePlural, setNamePlural] = useState("");
  const [biographyLength, setBiographyLength] = useState(0);

  useEffect(() => {
    const getParamsFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('uN');
      const pluralParam = params.get('uP');
      const adjectiveParam = params.get('uA');

      if (nameParam) setName(nameParam);
      if (pluralParam) setNamePlural(pluralParam);
      if (adjectiveParam) setAdjective(adjectiveParam);
    };
    getParamsFromURL();
  }, []);

  const changeName = (e) => {
    const newName = e.target.value;
    setName(newName);
    const params = new URLSearchParams(window.location.search);

    if (newName === "") {
      params.delete('uN');
      window.history.replaceState({}, '', `?${params.toString()}`);
      window.dispatchEvent(new Event('popstate'))
      return;
    }
    params.set('uN', newName);
    window.history.replaceState({}, '', `?${params.toString()}`);
    window.dispatchEvent(new Event('popstate'))
  }

  const changeNamePlural = (e) => {
    const newPlural = e.target.value;
    setNamePlural(newPlural);

    const params = new URLSearchParams(window.location.search);
    if (newPlural === "") {
      params.delete('uP');
      window.history.replaceState({}, '', `?${params.toString()}`);
      window.dispatchEvent(new Event('popstate'))
      return;
    }
    params.set('uP', newPlural);
    window.history.replaceState({}, '', `?${params.toString()}`);
    window.dispatchEvent(new Event('popstate'))
  }

  const changeAdjective = (e) => {
    const newAdjective = e.target.value;
    setAdjective(newAdjective);

    const params = new URLSearchParams(window.location.search);
    if (newAdjective === "") {
      params.delete('uA');
      window.history.replaceState({}, '', `?${params.toString()}`);
      window.dispatchEvent(new Event('popstate'))
      return;
    }
    params.set('uA', newAdjective);
    window.history.replaceState({}, '', `?${params.toString()}`);
    window.dispatchEvent(new Event('popstate'))
  }

  const changeBiography = (e) => {
    const newBiographyLength = e.target.value.length;
    setBiographyLength(newBiographyLength)
  }
  return (
    <div className="flex justify-evenly font-semibold">
      <div className="block lg:px-4">
        <div className="flex flex-col pt-10">
          <label className="pb-1">Name</label>
          <input
            className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
            value={name}
            maxLength={15}
            onChange={changeName}
          ></input>
        </div>
        <div className="flex flex-col pt-2">
          <label className="pb-1">Plural</label>
          <input
            className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
            value={namePlural}
            maxLength={20}
            onChange={changeNamePlural}
          ></input>
        </div>
        <div className="flex flex-col pt-2">
          <label className="pb-1">Adjective</label>
          <input
            className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
            value={adjective}
            maxLength={20}
            onChange={changeAdjective}
          ></input>
        </div>
      </div>
      <div className="block">
        <div className="relative flex flex-col pt-10">
          <div className="pb-1 flex justify-between items-center">
            <label>Biography (optional)</label>
            <p className="text-right">{biographyLength}/500</p>
          </div>
          <textarea
            className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 resize-none outline-none focus:border-blue-500"
            rows={5}
            cols={50}
            placeholder="A long time ago in a galaxy far, far away..."
            maxLength={500}
            spellCheck={false}
            onChange={changeBiography}
          />
        </div>
      </div>
      <div className="block lg:px-4">
        <div className="flex flex-col pt-10">
          <label className="pb-1">Gender (optional)</label>
          <GenderSelection />
        </div>
      </div>
    </div>
  )
}