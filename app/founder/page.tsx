import Link from 'next/link'
import ClientWrapper from './client'

export default function FounderPage() {
  return (
    <ClientWrapper>
      <div className="min-h-screen bg-black text-white py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
              Our Founder
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading innovation in AI analytics and mindscape technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
            <div className="md:col-span-4">
              <div className="aspect-square relative bg-gradient-to-br from-red-900/50 to-black rounded-xl overflow-hidden">
                {/* Placeholder for founder image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-red-700/30 flex items-center justify-center">
                    <span className="text-5xl font-bold">MS</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8">
              <h2 className="text-3xl font-bold mb-4">Dr. Alex Morgan</h2>
              <h3 className="text-xl text-red-500 mb-6">Founder & CEO</h3>
              <p className="text-gray-300 mb-6">
                With over 15 years of experience in AI and machine learning, Dr. Morgan founded Mindscape Analytics 
                with a vision to transform how businesses leverage data for strategic decision-making. Their pioneering 
                work in neural network optimization and predictive analytics has shaped the foundation of our technology.
              </p>
              <p className="text-gray-300 mb-6">
                Prior to founding Mindscape, Dr. Morgan led research teams at leading technology firms and published 
                numerous papers on advanced machine learning applications in enterprise environments.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/about" 
              className="inline-flex items-center px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-md transition-all"
            >
              Learn More About Our Team
            </Link>
          </div>
        </div>
      </div>
    </ClientWrapper>
  )
} 