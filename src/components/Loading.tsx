export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
        <div className="absolute rounded-full h-8 w-8 bg-white"></div>
      </div>
    </div>
  );
}
