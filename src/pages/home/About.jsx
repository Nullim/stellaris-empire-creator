export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img src="/images/logo.png" className="object-contain w-1/2 h-1/2" />
      <p>Welcome to the Stellaris Empire Creator!</p>
      <p>This app was made by <b><a style={{ cursor: `url(/images/ui/cursor_pointer.png), pointer` }} href="https://github.com/Nullim">Nullim</a></b></p>
    </div>
  )
}