export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="relative flex items-center justify-center">
        {/* Outer Animated Ring */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-500 border-gray-300"></div>
        {/* Inner Circle */}
        <div className="absolute rounded-full h-8 w-8 bg-white shadow-md"></div>
      </div>
    </div>
  );
}
