export default function City() {
  return (
    <div className="flex flex-col font-semibold h-full">
      <div className="flex w-full">
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-col w-1/8">
            <label className="text-orange-400">Room Selection:</label>
            <input
              className="border-2 border-gray-500 bg-black/40 backdrop-blur-md font-normal pl-1 outline-none focus:border-blue-500"
              value="test"
              disabled
            ></input>
          </div>
          <div className="flex flex-col w-full bg-black/40">
            City selection here.
          </div>
        </div>
      </div>
    </div>
  )
}