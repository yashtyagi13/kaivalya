import Link from 'next/link';

export default function Contact() {
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
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/review" className="text-gray-400 hover:text-white transition-colors">
            Review
          </Link>
          <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
            FAQ&apos;S
          </Link>
          <Link href="/contact" className="text-green-400 font-semibold">
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
            <span className="text-green-400 text-sm font-medium">Get In Touch</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="shining-text shining-text-glow">Contact Us</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your digital presence? Let&apos;s discuss your project and bring your vision to life.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Plot No 33, Budh Vihar Colony,<br />
                    Sai Data Road, Arjunganj,<br />
                    Lucknow
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                  <div className="space-y-1">
                    <p className="text-gray-300">+91 82997 59969</p>
                    <p className="text-gray-300">+91 88876 33640</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-gray-300">bd.team@kaivalyadigitals.com</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Website</h3>
                  <p className="text-gray-300">www.kaivalyadigitals.com</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all">
                Request a Quote
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="+91 12345 67890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Service Interest</label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500">
                  <option>Select a service</option>
                  <option>Production & Post-Production</option>
                  <option>Advertising & Marketing</option>
                  <option>Creative & Branding</option>
                  <option>Digital Solutions</option>
                  <option>All Services</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
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
