import Home from "./components/Home";

export default function App() {
  return (
    <div className="main">
      <img className="w-full h-screen object-cover" draggable="false" src="/images/background.png" />
      <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
        <Home />
      </div>
    </div>
  )
}
