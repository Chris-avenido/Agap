import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search applicants, positions, or documents..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none rounded-full hover:bg-gray-100">
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          <Bell className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
