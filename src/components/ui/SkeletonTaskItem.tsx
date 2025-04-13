const SkeletonTaskItem = () => (
  <div className="w-full bg-[#1a1a1e]/80 p-4 rounded-md border-l-4 border-l-gray-600 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="flex flex-col w-full">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-20 h-6 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default SkeletonTaskItem;