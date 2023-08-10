import { useState } from "react"

export default function Home() {
  const [isClicked, setIsClicked] = useState(false)

  const handleClickImport = () => {
    setIsClicked(!isClicked)
  }

  return (
    <div className='text-3xl text-white bg-black/40 p-4 backdrop-blur-sm'>
      <div>
        <p>Welcome to the Stellaris Empire Creator tool!</p>
      </div>
      <div className='grid grid-cols-2 pt-4 gap-8'>
        <button type="button" className="border-solid rounded-md bg-black/40 hover:bg-black/60">Import</button>
        <button type="button" className="border-solid rounded-md bg-black/40 hover:bg-black/60">Create new Empire</button>
      </div>
    </div>
  )
}