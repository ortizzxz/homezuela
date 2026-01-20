export const FullPageLoader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
    {/* Replace with your actual logo */}
    <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center animate-pulse mb-4">
      <span className="text-white font-bold text-xl">P</span>
    </div>
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);