export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-r-transparent border-blue-700"></div>
      <p className="mt-2">Loading...</p>
    </div>
  )
}