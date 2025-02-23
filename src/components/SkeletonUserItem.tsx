export default function SkeletonUserItem() {
  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 sm:p-8 rounded-2xl border max-w-3xl w-full mx-auto animate-pulse min-h-[150px]">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 sm:items-start text-center sm:text-left">
        {/* Avatar Skeleton */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 flex-shrink-0" />

        {/* User Info Skeleton */}
        <div className="flex-grow w-full space-y-3 mt-4 sm:mt-0">
          <div className="h-5 w-3/5 bg-gray-300 rounded-md mx-auto sm:mx-0"></div>
          <div className="h-4 w-4/5 bg-gray-200 rounded-md mx-auto sm:mx-0"></div>
          <div className="h-4 w-2/5 bg-gray-200 rounded-md mx-auto sm:mx-0"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-md mx-auto sm:mx-0"></div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex flex-row space-x-4 mt-6 sm:mt-0 sm:flex-col items-center justify-center sm:space-y-4 sm:space-x-0 w-full sm:w-auto">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
