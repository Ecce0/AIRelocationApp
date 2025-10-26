import TechnicalError from "./TechnicalError"

const ErrorOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <TechnicalError error={new Error("DataFetchError")} />
    </div>
  )
}

export default ErrorOverlay
