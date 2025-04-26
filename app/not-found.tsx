import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-8 text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 