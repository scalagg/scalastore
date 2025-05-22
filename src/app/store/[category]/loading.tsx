import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-48 bg-gray-700 rounded mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-700"></div>
            <div className="p-6">
              <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-24 bg-gray-700 rounded"></div>
                <div className="h-10 w-32 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 