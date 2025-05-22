import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold mb-4">Category Not Found</h2>
            <p className="text-gray-400 mb-8">The category you're looking for doesn't exist.</p>
            <Link 
                href="/store"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
                Return to Store
            </Link>
        </div>
    );
} 