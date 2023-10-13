import { useState, useEffect } from "react";

import CitySelection from "./layout/CitySelection";
import cities from "../../utils/cities.json";
import rooms from "../../utils/rooms.json";

const UI_BASE = '/images/ui/'

export default function City() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [isLeftHovered, setIsLeftHovered] = useState(false)
  const [isRightHovered, setIsRightHovered] = useState(false)
  const roomList = rooms.roomList;

  useEffect(() => {
    const getParamsFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const selectedCityParam = params.get('hC');
      const selectedRoomParam = params.get('hR');

      if (selectedCityParam) {
        const cityFound = cities.cityList.find((city) => city.cityId === parseInt(selectedCityParam))
        if (cityFound) {
          setSelectedCity(cityFound)
        }
      }

      if (selectedRoomParam) {
        const roomFound = rooms.roomList.find((room) => room.roomId === parseInt(selectedRoomParam))
        if (roomFound) {
          const roomIndex = rooms.roomList.findIndex((room) => room.roomId === parseInt(selectedRoomParam));
          setCurrentRoom(roomFound)
          setCurrentRoomIndex(roomIndex);
        }
      } else {
        // Set default room if no room has been selected before.
        params.set('hR', 1)
        window.history.replaceState({}, '', `?${params.toString()}`)
        window.dispatchEvent(new Event('popstate'))
      }
    };
    getParamsFromURL();
  }, [])

  useEffect(() => {
    if (currentRoom) {
      const params = new URLSearchParams(window.location.search);
      const roomId = currentRoom.roomId
      params.set('hR', roomId)
      window.history.replaceState({}, '', `?${params.toString()}`)
      window.dispatchEvent(new Event('popstate'))
    }
  }, [currentRoom])

  const prevValue = () => {
    const newIndex = currentRoomIndex === 0 ? roomList.length - 1 : currentRoomIndex - 1;
    setCurrentRoom(rooms.roomList[newIndex]);
    setCurrentRoomIndex(newIndex)
  };

  const nextValue = () => {
    const newIndex = currentRoomIndex === roomList.length - 1 ? 0 : currentRoomIndex + 1;
    setCurrentRoom(rooms.roomList[newIndex]);
    setCurrentRoomIndex(newIndex)
  };

  const handleCityClick = (city) => {
    if (city === selectedCity) return;
    setSelectedCity(city)
    const params = new URLSearchParams(window.location.search);
    params.set('hC', city.cityId);
    window.history.replaceState({}, '', `?${params.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  return (
    <div className="flex flex-col font-semibold h-full 
      overflow-y-auto scrollbar scrollbar-thumb-blue-800 scrollbar-track-transparent
    ">
      <div className="flex w-full">
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-col w-1/8">
            <label
              style={{ cursor: `url(/images/ui/cursor_normal.png), auto` }}
              className="text-orange-400"
            >
              Room Selection ({currentRoomIndex + 1} / {roomList.length})
            </label>
            <div className="flex">
              <img
                src={isLeftHovered ? `${UI_BASE}left_hovered.png` : `${UI_BASE}left_normal.png`}
                alt="Previous"
                onClick={prevValue}
                onMouseEnter={() => setIsLeftHovered(true)}
                onMouseLeave={() => setIsLeftHovered(false)}
                style={{ cursor: `url(/images/ui/cursor_pointer.png), pointer` }}
              />
              <input
                style={{ cursor: `url(/images/ui/cursor_normal.png), auto` }}
                className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal text-center pl-1 outline-none focus:border-blue-500"
                value={roomList[currentRoomIndex].roomName}
                disabled
              ></input>
              <img
                src={isRightHovered ? `${UI_BASE}right_hovered.png` : `${UI_BASE}right_normal.png`}
                alt="Next"
                onClick={nextValue}
                onMouseEnter={() => setIsRightHovered(true)}
                onMouseLeave={() => setIsRightHovered(false)}
                style={{ cursor: `url(/images/ui/cursor_pointer.png), pointer` }}
              />
            </div>
          </div>
          <CitySelection handleCityClick={handleCityClick} selectedCity={selectedCity} />
        </div>
      </div>
    </div>
  )
}