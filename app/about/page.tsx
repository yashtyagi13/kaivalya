import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">K</span>
          </div>
          <span className="text-xl font-bold">Kaivalya Digitals</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-green-400 font-semibold">
            About Us
          </Link>
          <Link href="/review" className="text-gray-400 hover:text-white transition-colors">
            Review
          </Link>
          <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
            FAQ&apos;S
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
        
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
          Join The Waitlist
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-900/20 border border-green-500/30 rounded-full px-6 py-2 mb-8">
            <span className="text-green-400 text-sm font-medium">About Kaivalya Digitals</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="shining-text shining-text-glow">Where Creativity</span>
            <br />
            <span className="text-green-300 shining-text-shimmer">Meets Impact</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Innovating Narratives | Empowering Brands | Redefining Digital
          </p>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-green-400">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Kaivalya Digitals Pvt. Ltd. is a full-service creative and digital agency 
                offering 360° solutions in production, marketing, branding, and technology. 
                We help brands, leaders, and institutions amplify their presence through 
                powerful stories, smart campaigns, and impactful digital experiences.
              </p>
              <p>
                Founded on the principles of innovation and excellence, we believe that 
                every brand has a unique story waiting to be told. Our team of creative 
                minds, strategic thinkers, and technical experts work together to transform 
                your vision into compelling digital narratives that resonate with your audience.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">360°</div>
                  <div className="text-sm text-gray-300">Solutions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100+</div>
                  <div className="text-sm text-gray-300">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">5+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Production</h3>
              <p className="text-gray-400 text-sm">
                High-quality video production, photography, and multimedia content creation.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketing</h3>
              <p className="text-gray-400 text-sm">
                Strategic digital marketing campaigns that drive engagement and conversions.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Branding</h3>
              <p className="text-gray-400 text-sm">
                Complete brand identity development and visual storytelling solutions.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Technology</h3>
              <p className="text-gray-400 text-sm">
                Cutting-edge digital solutions and web development services.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-12 border border-green-500/30">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to create something extraordinary. Join our waitlist and be the first to experience our innovative solutions.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            Join The Waitlist
          </button>
          <p className="text-sm text-gray-400 mt-4">No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold">Kaivalya Digitals</span>
          </div>
          
          <div className="flex space-x-6">
            <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <span className="text-white text-lg">💬</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
