'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Home() {
  // FAQ state management
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([1, 5]); // Initially expanded FAQs

  // Active section state management
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFAQ = (faqNumber: number) => {
    setExpandedFAQs(prev => 
      prev.includes(faqNumber) 
        ? prev.filter(num => num !== faqNumber)
        : [...prev, faqNumber]
    );


    
  };

  useEffect(() => {
    // Section visibility observer
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    });

    // Observe all sections
    const sections = ['home', 'about', 'services', 'review', 'faqs', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        sectionObserver.observe(element);
      }
    });

    const animateNumbers = () => {
      const stats = [
        { id: 'stat1', target: 80, suffix: '%', prefix: '+' },
        { id: 'stat2', target: 5, suffix: 'M' },
        { id: 'stat3', target: 10, suffix: 'X' },
        { id: 'stat4', target: 300, suffix: '%' },
        { id: 'stat5', target: 100, suffix: '+' }
      ];

      // Reset all stats to 0 first
      stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
          element.textContent = '0' + stat.suffix;
        }
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stat = stats.find(s => s.id === entry.target.id);
            if (stat) {
              animateNumber(entry.target as HTMLElement, stat.target, stat.suffix, stat.prefix);
              observer.unobserve(entry.target);
            }
          }
        });
      }, { threshold: 0.5 });

      stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    const animateNumber = (element: HTMLElement, target: number, suffix: string, prefix: string = '') => {
      let current = 0;
      const increment = target / 60; // 60 frames for smooth animation
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = `${prefix}${Math.floor(current)}${suffix}`;
      }, 16); // ~60fps
    };

    animateNumbers();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#07090b] text-white">
      {/* Glow ring backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="aurora-ring" />
      </div>

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Kaivalya Digitals Pvt. Ltd. logo"
              width={768}
              height={129}
              className="h-6 sm:h-8 w-auto"
              priority
            />
          </div>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-12 text-sm">
            <a 
              href="#home" 
              className={`font-medium transition-colors ${
                activeSection === 'home' 
                  ? 'text-green-400' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`font-medium transition-colors ${
                activeSection === 'about' 
                  ? 'text-green-400' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              About Us
            </a>
            <a 
              href="#services" 
              className={`font-medium transition-colors ${
                activeSection === 'services' 
                  ? 'text-green-400' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Services
            </a>
            <a 
              href="#review" 
              className={`font-medium transition-colors ${
                activeSection === 'review' 
                  ? 'text-green-400' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Review
            </a>
            <a 
              href="#faqs" 
              className={`font-medium transition-colors ${
                activeSection === 'faqs' 
                  ? 'text-green-400' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              FAQ&apos;S
            </a>
            <a 
              href="#contact" 
              className={`font-medium transition-colors ${
                activeSection === 'contact' 
                  ? 'text-green-400' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              Contact Us
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services" target="_blank" rel="noopener noreferrer" className="hidden sm:block rounded-full bg-white text-black px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/90">
              Get Quote
            </a>
            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className="lg:hidden p-2 text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <button
          aria-label="Close menu overlay"
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[80%] bg-black text-white shadow-xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-white/80 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="px-6 py-6 space-y-6">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-white/80">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-white/80">About Us</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-white/80">Services</a>
            <a href="#review" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-white/80">Review</a>
            <a href="#faqs" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-white/80">FAQ&apos;S</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-white/80">Contact Us</a>
            <div className="pt-6 border-t border-white/10">
              <a
                href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90"
              >
                Get Quote
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <main id="home" className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 text-center">
        <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-green-500/40 bg-green-400/10 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-green-300 shadow-[0_0_30px_-10px_rgba(34,197,94,1)]">
          ✨ The World&apos;s Best Vibe Marketing Platform
        </div>
        <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight">
          <span className="shining-text shining-text-glow">Where Creativity Meets Impact</span>
          <br />
          <span className="text-green-300 shining-text-shimmer">Innovating Narratives | Empowering Brands | Redefining Digital</span>
        </h1>
        <p className="mx-auto mt-2 sm:mt-3 max-w-xl sm:max-w-2xl text-sm sm:text-base lg:text-lg text-white/70 px-4">
          Innovating Narratives | Empowering Brands | Redefining Digital
        </p>
        <div className="mt-4 sm:mt-5 flex items-center justify-center px-4">
          <a id="contact" href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#5b74ff] hover:bg-[#6c83ff] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white shadow-[0_10px_30px_-10px_rgba(91,116,255,.9)] transition-all duration-300">
            Get Quote
          </a>
        </div>
        <p className="mt-2 sm:mt-3 text-xs text-white/60">No credit card required</p>
      </main>

      

      {/* Services Section */}
      <section id="services" className="relative py-4 sm:py-6 lg:py-8 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-green-900/20 border border-green-500/30 rounded-full px-6 py-2 mb-4">
              <span className="text-green-400 text-sm font-medium">Our Services</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
              <span className="shining-text shining-text-glow">Key Services</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for all your creative and digital needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Production & Post-Production */}
            <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/30 hover:border-red-400/50 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-3xl">🎬</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Production & Post-Production</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Videos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Photography
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Editing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Documentaries
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Reels
                </li>
              </ul>
            </div>

            {/* Advertising & Marketing */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Advertising & Marketing</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  SEO
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Social Media
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Ad Campaigns
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Influencer Outreach
                </li>
              </ul>
            </div>

            {/* Creative & Branding */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Creative & Branding</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Logo Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Brand Identity
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Packaging Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Graphic Design
                </li>
              </ul>
            </div>

            {/* Digital Solutions */}
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Digital Solutions</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Websites
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Mobile Apps
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  E-books
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  YouTube Channel Optimization
                </li>
              </ul>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-center mb-6 text-green-400">
              Our Process
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">1</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Discovery</h4>
                <p className="text-gray-400">
                  We understand your brand, goals, and target audience to create a tailored strategy.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">2</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Strategy</h4>
                <p className="text-gray-400">
                  We develop a comprehensive plan that aligns with your objectives and budget.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">Execution</h4>
                <p className="text-gray-400">
                  We bring your vision to life with creative excellence and technical precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-block bg-green-900/20 border border-green-500/30 rounded-full px-6 py-2 mb-8">
                <span className="text-green-400 text-sm font-medium">About Kaivalya Digitals</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="shining-text shining-text-glow">Where Creativity</span>
                <br />
                <span className="text-green-300 shining-text-shimmer">Meets Impact</span>
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
              
              <div className="mt-8">
                <a 
                  href="#services" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all"
                >
                  Explore Our Services
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
            
            {/* Right Side - Stats */}
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
        </div>
      </section>

      {/* Campaign Clarity Section */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        {/* Blurred Dashboard Background */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 opacity-30 blur-sm">
            {/* Alerts Widget */}
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
              <h3 className="text-red-400 font-semibold mb-2">Alerts</h3>
              <div className="space-y-2">
                <div className="bg-red-800/40 p-2 rounded text-sm">Followers Tag</div>
                <div className="bg-red-800/40 p-2 rounded text-sm">Followers Tag</div>
                <div className="bg-red-800/40 p-2 rounded text-sm">Followers Tag</div>
              </div>
            </div>

            {/* Performance Widget */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-2">Performance</h3>
              <div className="text-3xl font-bold text-green-400">24.6%</div>
              <div className="text-sm text-green-300">↑ +12.3%</div>
            </div>

            {/* Gross Margin Widget */}
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
              <h3 className="text-red-400 font-semibold mb-2">Gross Margin</h3>
              <div className="space-y-1 text-sm">
                <div className="text-red-400">-15.2%</div>
                <div className="text-red-400">-8.7%</div>
                <div className="text-red-400">-12.4%</div>
              </div>
            </div>

            {/* Spend Widget */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-2">Spend</h3>
              <div className="text-sm text-green-300">$12,450</div>
              <div className="text-sm text-green-300">$8,230</div>
            </div>

            {/* Team Spends */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-2">Team Spends</h3>
              <div className="text-sm text-green-300">$8,230</div>
              <div className="text-sm text-green-300">$5,120</div>
            </div>

            {/* Traffic Source */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-2">Traffic Source</h3>
              <div className="text-sm text-green-300">Facebook: 68%</div>
              <div className="text-sm text-green-300">Google: 22%</div>
            </div>

            {/* Yesterday's Campaign Insights */}
            <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-500/30 col-span-2">
              <h3 className="text-gray-400 font-semibold mb-2">Yesterday&apos;s Campaign Insights</h3>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-300">
                <div>Campaign</div>
                <div>Spend</div>
                <div>ROI</div>
                <div>Facebook Ads</div>
                <div>$2,450</div>
                <div>3.2x</div>
                <div>Google Ads</div>
                <div>$1,230</div>
                <div>2.8x</div>
              </div>
            </div>

            {/* Peak Day */}
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-green-400 font-semibold mb-2">Peak Day</h3>
              <div className="text-sm text-green-300">Wednesday</div>
              <div className="text-sm text-green-300">+15.3%</div>
            </div>
          </div>
        </div>

        {/* Campaign Clarity Modal */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            {/* Modal Header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                Get Campaign Clarity With Kaivalya Digitals.
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">
                One platform to create, optimize, and command every campaign you run.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {/* Top Row */}
              <div className="bg-green-600/20 border-2 border-green-400 rounded-xl p-3 sm:p-4 lg:p-3 sm:p-4 lg:p-6 text-center hover:bg-green-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-2 sm:mb-3 lg:mb-4 border border-green-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-green-400 font-semibold text-sm sm:text-base">Spends</h3>
              </div>

              <div className="bg-gray-700/20 border-2 border-gray-400 rounded-xl p-3 sm:p-4 lg:p-3 sm:p-4 lg:p-6 text-center hover:bg-gray-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(156,163,175,0.3)] hover:shadow-[0_0_30px_rgba(156,163,175,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-2 sm:mb-3 lg:mb-4 border border-gray-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v1a1 1 0 001 1h1a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2h1a1 1 0 001-1V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base">Clicks</h3>
              </div>

              <div className="bg-blue-600/20 border-2 border-blue-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-blue-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-blue-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-blue-400 font-semibold text-sm sm:text-base">Revenue</h3>
              </div>

              {/* Middle Row */}
              <div className="bg-orange-600/20 border-2 border-orange-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-orange-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-orange-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10.414 13H12a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-orange-400 font-semibold text-sm sm:text-base">ROI</h3>
              </div>

              <div className="bg-gray-700/20 border-2 border-gray-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-gray-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(156,163,175,0.3)] hover:shadow-[0_0_30px_rgba(156,163,175,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-gray-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base">Peak Day</h3>
              </div>

              <div className="bg-orange-600/20 border-2 border-orange-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-orange-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-orange-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 className="text-orange-400 font-semibold text-sm sm:text-base">Conversions</h3>
              </div>

              {/* Bottom Row */}
              <div className="bg-red-600/20 border-2 border-red-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-red-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-red-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-red-400 font-semibold text-sm sm:text-base">Alerts</h3>
              </div>

              <div className="bg-gray-700/20 border-2 border-gray-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-gray-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(156,163,175,0.3)] hover:shadow-[0_0_30px_rgba(156,163,175,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-gray-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 7z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base">Gross Margin</h3>
              </div>

              <div className="bg-green-600/20 border-2 border-green-400 rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:bg-green-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 border border-green-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  </svg>
                </div>
                <h3 className="text-green-400 font-semibold text-sm sm:text-base">Team Spend</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Transformation Section - Full Screen */}
      <section className="relative min-h-screen py-12 sm:py-16 lg:py-24">
        {/* Continuous Running Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/8 to-purple-500/5 animate-gradient-shift"></div>
          
          {/* Moving Light Particles */}
          <div className="absolute inset-0">
            {Array.from({length: 20}).map((_, i) => {
              // Use consistent values based on index to avoid hydration mismatch
              const left = (i * 7.3) % 100;
              const top = (i * 11.7) % 100;
              const delay = (i * 0.3) % 5;
              const duration = 8 + (i * 0.2) % 4;
              
              return (
                <div
                  key={i}
                  className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-white/20 rounded-full animate-float"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                  }}
                ></div>
              );
            })}
          </div>
          
          {/* Running Light Streaks */}
          <div className="absolute inset-0">
            {Array.from({length: 6}).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-light-streak"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${6 + i}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-2 sm:gap-3 lg:gap-4 p-4 sm:p-6 lg:p-8">
              {Array.from({length: 120}).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{animationDelay: `${i * 0.05}s`}}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Marketing Transformation
          </h2>
          <p className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto px-4">
            From chaos to clarity in one platform
          </p>
        </div>

        {/* Two Panels */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            
            {/* Left Panel: Chaotic Marketing */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-red-400/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden shadow-2xl shadow-red-500/20">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-sm"></div>
                <div className="absolute inset-1 rounded-2xl sm:rounded-3xl bg-[#1a1a1a]/90 backdrop-blur-sm"></div>
                
                {/* Panel Header */}
                <div className="relative z-10 text-center mb-4 sm:mb-6 lg:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">Marketing looks chaotic?</h3>
                  <p className="text-white/70 text-sm sm:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 lg:mb-6">With Too Many Tools. Too Little Flow.</p>
                  
                  {/* Problem Indicators */}
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-center gap-1 sm:gap-2 text-red-400">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm font-medium">Scattered Data</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-orange-400">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm font-medium">No Integration</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-yellow-400">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm font-medium">Time Wasted</span>
                    </div>
                  </div>
                </div>
                
                {/* 10 Tool Icons Network Layout */}
                <div className="relative z-10 h-full">
                  {/* TikTok - Top Left */}
                  <div className="absolute top-8 sm:top-12 lg:top-12 sm:top-14 lg:top-16 left-4 sm:left-6 lg:left-8 sm:left-12 lg:left-16 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-xl sm:rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.1s'}}>
                    <div className="text-black font-bold text-xs sm:text-sm">TikTok</div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  </div>
                  
                  {/* Google Sheets - Middle Left */}
                  <div className="absolute top-20 sm:top-28 lg:top-32 left-6 sm:left-8 lg:left-12 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Sheets</div>
                  </div>
                  
                  {/* Slack - Bottom Left */}
                  <div className="absolute top-32 sm:top-40 lg:top-48 left-8 sm:left-12 lg:left-16 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.3s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Slack</div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">⚠</div>
                  </div>
                  
                  {/* Google Analytics - Top Center */}
                  <div className="absolute top-12 sm:top-16 lg:top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.4s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Analytics</div>
                  </div>
                  
                  {/* Taboola - Center */}
                  <div className="absolute top-24 sm:top-32 lg:top-36 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Taboola</div>
                  </div>
                  
                  {/* Canva - Top Right */}
                  <div className="absolute top-16 right-2 sm:right-3 lg:right-4 sm:right-6 sm:right-2 sm:right-3 lg:right-4 lg:right-12 lg:right-16 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.6s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Canva</div>
                  </div>
                  
                  {/* Google Ads - Middle Right */}
                  <div className="absolute top-32 right-6 sm:right-2 sm:right-3 lg:right-4 lg:right-12 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.7s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Ads</div>
                  </div>
                  
                  {/* Facebook - Top Far Right */}
                  <div className="absolute top-8 sm:top-10 lg:top-12 right-2 sm:right-3 lg:right-2 sm:right-3 lg:right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.8s'}}>
                    <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">f</div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">9</div>
                  </div>
                  
                  {/* Shopify - Middle Far Right */}
                  <div className="absolute top-40 right-2 sm:right-3 lg:right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.9s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">Shopify</div>
                  </div>
                  
                  {/* AdSpy - Bottom Right */}
                  <div className="absolute top-56 right-2 sm:right-3 lg:right-4 sm:right-6 sm:right-2 sm:right-3 lg:right-4 lg:right-12 lg:right-16 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '1.0s'}}>
                    <div className="text-white font-bold text-xs sm:text-sm">AdSpy</div>
                  </div>
                  
                  {/* Curved Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* TikTok to Google Analytics */}
                    <path d="M 120 120 Q 200 100 240 120" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Google Sheets to TikTok */}
                    <path d="M 100 160 Q 110 140 120 140" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Google Sheets to Slack */}
                    <path d="M 110 180 Q 120 200 120 220" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Slack to Taboola */}
                    <path d="M 140 240 Q 180 220 200 220" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Slack to AdSpy */}
                    <path d="M 140 240 Q 200 280 280 240" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Google Analytics to Taboola */}
                    <path d="M 240 140 Q 240 180 200 200" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Google Analytics to Google Ads */}
                    <path d="M 260 140 Q 300 160 320 160" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Google Analytics to Canva */}
                    <path d="M 260 140 Q 300 120 320 120" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Taboola to Google Analytics */}
                    <path d="M 200 200 Q 220 160 240 160" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Canva to Facebook */}
                    <path d="M 340 120 Q 360 110 360 100" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Google Ads to Shopify */}
                    <path d="M 320 180 Q 340 200 340 220" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Facebook to Shopify */}
                    <path d="M 360 120 Q 380 160 360 200" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                    
                    {/* Shopify to AdSpy */}
                    <path d="M 340 240 Q 360 260 320 280" stroke="white" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.4"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Panel: Successful Integrated Solution */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden shadow-2xl shadow-green-500/20">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 blur-sm"></div>
                <div className="absolute inset-1 rounded-2xl sm:rounded-3xl bg-[#1a1a1a]/90 backdrop-blur-sm"></div>
                
                {/* Panel Header */}
                <div className="relative z-10 text-center mb-4 sm:mb-6 lg:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">Your new way to build successful campaigns.</h3>
                  <p className="text-white/70 text-sm sm:text-base lg:text-lg xl:text-xl mb-3 sm:mb-4 lg:mb-6">One Platform, One Team, Zero Chaos, 10X ROI.</p>
                  <a href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 text-white px-6 sm:px-8 lg:px-12 py-2 sm:py-3 lg:py-4 rounded-full font-medium text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Get Quote
                  </a>
                </div>
                
                {/* Central Platform Logo */}
                <div className="relative z-10 flex justify-center mb-4 sm:mb-6 lg:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-500 to-green-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-green-400/25 animate-pulse">
                    <div className="text-white font-bold text-2xl sm:text-3xl lg:text-5xl">V</div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="text-white text-xs sm:text-sm">✓</div>
                    </div>
                  </div>
                </div>
                
                {/* Feature Icons */}
                <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                  {/* Campaign Intelligence */}
                  <div className="bg-green-600/20 border-2 border-green-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center hover:bg-green-600/30 transition-all cursor-pointer shadow-lg shadow-green-400/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-green-400/40">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="text-green-400 font-semibold text-xs sm:text-sm">Campaign Intelligence</h4>
                  </div>
                  
                  {/* Creative AI Engine */}
                  <div className="bg-purple-600/20 border-2 border-purple-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center hover:bg-purple-600/30 transition-all cursor-pointer shadow-lg shadow-purple-400/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-purple-400/40">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </div>
                    <h4 className="text-purple-400 font-semibold text-xs sm:text-sm">Creative AI Engine</h4>
                  </div>
                  
                  {/* AI Media Buying */}
                  <div className="bg-purple-600/20 border-2 border-purple-400/40 rounded-2xl p-4 text-center hover:bg-purple-600/30 transition-all cursor-pointer shadow-lg shadow-purple-400/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-purple-400/40">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="text-purple-400 font-semibold text-xs sm:text-sm">AI Media Buying</h4>
                  </div>
                  
                  {/* Performance Insights */}
                  <div className="bg-green-600/20 border-2 border-green-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 text-center hover:bg-green-600/30 transition-all cursor-pointer shadow-lg shadow-green-400/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-green-400/40">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                      </svg>
                    </div>
                    <h4 className="text-green-400 font-semibold text-xs sm:text-sm">Performance Insights</h4>
                  </div>
                </div>
                
                {/* Scattered Tool Icons Around Panel Edges */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Canva - Top Left */}
                  <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-purple-500/30 rounded-md sm:rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Canva</div>
                  </div>
                  
                  {/* Facebook - Top Right */}
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-600/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-sm sm:text-base lg:text-lg font-bold">f</div>
                  </div>
                  
                  {/* Google Ads - Middle Top Left */}
                  <div className="absolute top-12 sm:top-14 lg:top-16 left-4 sm:left-6 lg:left-8 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500/30 via-green-500/30 to-yellow-500/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Ads</div>
                  </div>
                  
                  {/* Google Analytics - Middle Top Right */}
                  <div className="absolute top-16 right-2 sm:right-3 lg:right-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-orange-500/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Analytics</div>
                  </div>
                  
                  {/* Shopify - Middle Right */}
                  <div className="absolute top-24 sm:top-28 lg:top-32 right-2 sm:right-3 lg:right-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-600/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Shopify</div>
                  </div>
                  
                  {/* TikTok - Middle Left */}
                  <div className="absolute top-24 sm:top-28 lg:top-32 left-2 sm:left-3 lg:left-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-black text-xs font-bold">TikTok</div>
                  </div>
                  
                  {/* Google Analytics - Bottom Left */}
                  <div className="absolute bottom-12 sm:bottom-14 lg:bottom-16 left-4 sm:left-6 lg:left-8 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-orange-500/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Analytics</div>
                  </div>
                  
                  {/* Google Ads - Bottom Middle Left */}
                  <div className="absolute bottom-12 sm:bottom-14 lg:bottom-16 left-16 sm:left-18 lg:left-20 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-500/30 via-green-500/30 to-yellow-500/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Ads</div>
                  </div>
                  
                  {/* Taboola - Bottom Right */}
                  <div className="absolute bottom-4 right-2 sm:right-3 lg:right-4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-600/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Taboola</div>
                  </div>
                  
                  {/* Slack - Bottom Right */}
                  <div className="absolute bottom-4 right-20 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-md sm:rounded-lg flex items-center justify-center opacity-60 blur-sm">
                    <div className="text-white text-xs font-bold">Slack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services"
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>

      {/* Integrations Slider Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16 gap-4 p-8">
            {Array.from({length: 64}).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: `${(i * 0.1) % 6.4}s`}}></div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Integrated With The Best.
          </h2>
          <p className="text-white/70 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            Seamlessly connect with the platforms you already use
          </p>
        </div>

        {/* Logo Slider - Exact Design */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div 
              className="flex space-x-12 sm:space-x-16 lg:space-x-20" 
              style={{
                width: '200%',
                animation: 'scrollStrip 15s linear infinite',
                willChange: 'transform'
              }}
            >
              {/* First set of logos */}
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full blur-sm opacity-50"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">TikTok</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">V</div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">VOLUUM</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 transform rotate-45 rounded-sm"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-teal-300 to-blue-400 transform rotate-45 rounded-sm"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-teal-400 transform rotate-45 rounded-sm"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">ClickFlare</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent border-r-transparent transform rotate-45"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">REDTRACK</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 text-lg sm:text-xl lg:text-2xl font-bold">facebook</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full blur-sm opacity-50"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">TikTok</span>
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full blur-sm opacity-50"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">TikTok</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">V</div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">VOLUUM</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 transform rotate-45 rounded-sm"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-teal-300 to-blue-400 transform rotate-45 rounded-sm"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-teal-400 transform rotate-45 rounded-sm"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">ClickFlare</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent border-r-transparent transform rotate-45"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">REDTRACK</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-w-max">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 text-lg sm:text-xl lg:text-2xl font-bold">facebook</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-40 bg-gradient-to-r from-[#1a1a1a] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-40 bg-gradient-to-l from-[#1a1a1a] to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* Smarter Campaigns Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16 gap-4 p-8">
            {Array.from({length: 64}).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: `${(i * 0.1) % 6.4}s`}}></div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
            Smarter <span className="text-purple-400">Campaigns.</span>
            <br />
            Ridiculously Better <span className="text-green-400">Outcomes.</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            Every insight, every decision — optimized to scale.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* +80% Box */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-2 border-green-400/50 rounded-2xl p-6 sm:p-8 text-center hover:border-green-400/80 transition-all duration-300">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-400 mb-3 sm:mb-4" id="stat1">
                0%
              </div>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                Reduce manual work with automated audits.
              </p>
            </div>

            {/* 5M Box */}
            <div className="bg-gradient-to-br from-purple-900/30 to-red-900/20 border-2 border-purple-400/50 rounded-2xl p-6 sm:p-8 text-center hover:border-purple-400/80 transition-all duration-300">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-400 mb-3 sm:mb-4" id="stat2">
                0M
              </div>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                Live data refreshed every 5 mins.
              </p>
            </div>

            {/* 10X Box */}
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/20 border-2 border-red-400/50 rounded-2xl p-6 sm:p-8 text-center hover:border-red-400/80 transition-all duration-300">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-400 mb-3 sm:mb-4" id="stat3">
                0X
              </div>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                Speed up creating high-performing, winning Ads.
              </p>
            </div>

            {/* 300% Box */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border-2 border-blue-400/50 rounded-2xl p-6 sm:p-8 text-center hover:border-blue-400/80 transition-all duration-300">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-400 mb-3 sm:mb-4" id="stat4">
                0%
              </div>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                Boost budget efficiency with AI-powered optimizations.
              </p>
            </div>

            {/* 100+ Box */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-2 border-green-400/50 rounded-2xl p-6 sm:p-8 text-center hover:border-green-400/80 transition-all duration-300">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-400 mb-3 sm:mb-4" id="stat5">
                0+
              </div>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                Generate winning ad variations in seconds — without guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16 gap-4 p-8">
            {Array.from({length: 64}).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: `${(i * 0.1) % 6.4}s`}}></div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-purple-400 mb-8 sm:mb-12">
            How It Works?
          </h2>
        </div>

        {/* Steps */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">1</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
                Connect Ad Accounts
              </h3>
              <p className="text-white/70 text-sm sm:text-base lg:text-lg">
                Meta, TikTok
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">2</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
                Kaivalya Digitals Analyzes Performance
              </h3>
              <p className="text-white/70 text-sm sm:text-base lg:text-lg">
                And creative efficiency
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">3</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
                You Kill Waste, Scale ROI
              </h3>
              <p className="text-white/70 text-sm sm:text-base lg:text-lg">
                And vibe responsibly
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-medium text-lg sm:text-xl lg:text-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
              Vibe, Don&apos;t Guess
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Features That <span className="text-green-400">Actually Matter</span>
            </h2>
            <p className="text-white/70 text-lg sm:text-xl lg:text-2xl">
              Everything you need to optimize campaign performance
            </p>
          </div>

          {/* Feature Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <button className="bg-green-900/30 border-2 border-green-400/50 rounded-xl p-4 sm:p-6 text-center hover:border-green-400/80 transition-all duration-300">
              <span className="text-green-400 font-semibold text-sm sm:text-base lg:text-lg">Spend Insights</span>
            </button>
            
            <button className="bg-gray-800/30 border-2 border-gray-400/50 rounded-xl p-4 sm:p-6 text-center hover:border-gray-400/80 transition-all duration-300">
              <span className="text-gray-400 font-semibold text-sm sm:text-base lg:text-lg">ROI Tracking</span>
            </button>
            
            <button className="bg-green-900/30 border-2 border-green-400/50 rounded-xl p-4 sm:p-6 text-center hover:border-green-400/80 transition-all duration-300">
              <span className="text-green-400 font-semibold text-sm sm:text-base lg:text-lg">Smart Alerts</span>
            </button>
            
            <button className="bg-gray-800/30 border-2 border-gray-400/50 rounded-xl p-4 sm:p-6 text-center hover:border-gray-400/80 transition-all duration-300">
              <span className="text-gray-400 font-semibold text-sm sm:text-base lg:text-lg">Ad-Set Performance</span>
            </button>
          </div>
        </div>
      </section>

      {/* Spend Insights Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Main Content */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Spend Insights</h2>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                See exactly where your budget goes and what&apos;s not working.
              </p>

              {/* Feature Icons */}
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 border-2 border-green-400 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">Total Spend</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 border-2 border-green-400 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">Profit Indicator</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 border-2 border-green-400 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">Growth Arrow</span>
                </div>
              </div>

              <button className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
                Click To See What&apos;s Underperforming
              </button>
            </div>

            {/* Right Side - Cards */}
            <div className="relative">
              {/* Insights Card */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Insights</h3>
                </div>
                
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Today&apos;s spend is approximately $1,788, showing a 100.6% increase, indicating a significant rise in marketing investment.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>The overall profit trend suggests positive ROI, but specific ROI details are needed for deeper insights.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Monitoring clicks, impressions, and conversions will help assess campaign efficiency and optimize performance.</span>
                  </li>
                </ul>
                
                <button className="mt-6 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#3a3a3a] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span>Talk More</span>
                </button>
              </div>

              {/* Spend Card - Overlapping */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 absolute -top-4 -right-4 w-80 z-20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Spend</h3>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Chart Area */}
                <div className="h-32 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg mb-4 flex items-end justify-center">
                  <div className="w-full h-full flex items-end justify-center space-x-1 p-4">
                    <div className="w-2 bg-green-400 h-8 rounded-t"></div>
                    <div className="w-2 bg-green-400 h-12 rounded-t"></div>
                    <div className="w-2 bg-green-400 h-16 rounded-t"></div>
                    <div className="w-2 bg-green-400 h-20 rounded-t"></div>
                    <div className="w-2 bg-green-400 h-24 rounded-t"></div>
                    <div className="w-2 bg-green-400 h-28 rounded-t"></div>
                    <div className="w-2 bg-green-400 h-32 rounded-t"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-green-400 text-lg font-semibold mb-1">↑ +100.6%</div>
                  <div className="text-3xl font-bold text-white">$1,787.97</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Kaivalya Digitals Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-[#07090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Choose Kaivalya Digitals
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Panel 01: Campaign Management */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 h-full">
                <div className="text-6xl font-bold text-gray-600 mb-4">01</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Campaign Management</h3>
                
                {/* Dashboard Screenshot */}
                <div className="bg-[#0a0a0a] rounded-2xl p-6 mb-6 border border-gray-700 h-80">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
                      <span className="text-white font-semibold">Vibe</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
                      <div className="text-green-400 text-sm">Revenue</div>
                      <div className="text-white font-bold">$3,168.88</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
                      <div className="text-green-400 text-sm">ROI</div>
                      <div className="text-white font-bold flex items-center justify-center">
                        <span className="text-green-400 mr-1">↑</span>
                        24.6%
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
                      <div className="text-green-400 text-sm">Clicks</div>
                      <div className="text-white font-bold">3,232</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Facebook</span>
                      <span className="text-white text-sm">$124.87</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">TikTok</span>
                      <span className="text-white text-sm">$98.45</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Real-Time Control And AI-Backed Campaign Management.</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    With AI Track Budgets, Scale Winners, And Fix What&apos;s Broken — Before You Even Blink.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel 02: Campaign Planning */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 h-full">
                <div className="text-6xl font-bold text-gray-600 mb-4">02</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Campaign Planning</h3>
                
                {/* Planning Interface Screenshot */}
                <div className="bg-[#0a0a0a] rounded-2xl p-6 mb-6 border border-gray-700">
                  <div className="mb-4">
                    <div className="text-white font-semibold mb-2">Untitled Plan 2</div>
                    <div className="bg-[#1a1a1a] rounded-lg p-4 text-sm text-gray-300">
                      Hey, I need to launch a new campaign for one of my clients. They sell women&apos;s activewear, and they want to reach different audiences. Please create a plan for me...
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="text-white text-sm font-medium">Campaign Brief</div>
                      <div className="text-gray-400 text-xs">Analyzing...</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="text-white text-sm font-medium">Bid Strategy & Budgets</div>
                      <div className="text-gray-400 text-xs">Generating...</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3">
                      <div className="text-white text-sm font-medium">Audience Targeting</div>
                      <div className="text-gray-400 text-xs">Processing...</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-2 bg-[#1a1a1a] rounded-lg p-3">
                    <input 
                      type="text" 
                      placeholder="Ask anything..." 
                      className="bg-transparent text-white text-sm flex-1 outline-none"
                    />
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Your AI Strategist On-Demand.</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    From Killer Content Angles To Smart Timelines — Personalised Plans That Just Work.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel 03: Creative Creation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 h-full">
                <div className="text-6xl font-bold text-gray-600 mb-4">03</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Creative Creation</h3>
                
                {/* Creative Interface Screenshot */}
                <div className="bg-[#0a0a0a] rounded-2xl p-6 mb-6 border border-gray-700">
                  <div className="mb-4">
                    <div className="text-white font-semibold mb-2">Untitled Creative 2</div>
                    <div className="bg-[#1a1a1a] rounded-lg p-3 text-sm text-gray-300 mb-3">
                      Hi, let&apos;s start creating a creative. Tell me what you have in your mind?
                    </div>
                  </div>
                  
                  {/* Creative Image Placeholder */}
                  <div className="bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg h-32 mb-3 flex items-center justify-center">
                    <div className="text-white font-bold text-sm">CREATIVE IMAGE</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="text-black font-bold text-sm">WHO SAID WOMAN WAS NOT MEANT TO FLY</div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="bg-[#1a1a1a] rounded-lg p-2 text-xs text-gray-300">
                      A fantastic day alone at night with music...
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg p-2 text-xs text-gray-300">
                      The Big Beautiful Bill is dumping everything...
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-[#1a1a1a] rounded-lg p-3">
                    <input 
                      type="text" 
                      placeholder="Start typing..." 
                      className="bg-transparent text-white text-sm flex-1 outline-none"
                    />
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Test And Tweak Creatives That Actually Convert.</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Auto-Written Briefs, Scroll-Stopping Hooks, And Ready-To-Go UGC Scripts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Marketers Worldwide Section */}
      <section id="review" className="relative py-12 sm:py-16 lg:py-24 bg-[#07090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full">
              <span className="text-white font-semibold text-sm">REAL VIBES. REAL RESULTS.</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Trusted By Marketers Worldwide
            </h2>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Card 1: Brand Manager */}
              <div className="relative group cursor-pointer">
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    {/* Dummy Profile Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Label */}
                  <div className="p-4 text-center">
                    <span className="text-white font-semibold text-sm">BRAND MANAGER</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Solo Marketer */}
              <div className="relative group cursor-pointer">
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    {/* Dummy Profile Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Label */}
                  <div className="p-4 text-center">
                    <span className="text-white font-semibold text-sm">SOLO MARKETER</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Media Agency */}
              <div className="relative group cursor-pointer">
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                    {/* Dummy Profile Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Label */}
                  <div className="p-4 text-center">
                    <span className="text-white font-semibold text-sm">MEDIA AGENCY</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Growth Team */}
              <div className="relative group cursor-pointer">
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    {/* Dummy Profile Image */}
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Label and Additional Info */}
                  <div className="p-4 text-center">
                    <span className="text-white font-semibold text-sm block mb-2">GROWTH TEAM</span>
                    <p className="text-gray-400 text-xs mb-2">We cut ad waste by 38% and tracked ROI live</p>
                    {/* University Logo Placeholder */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-green-900/20 overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0">
          {Array.from({length: 30}).map((_, i) => {
            const left = (i * 8.7) % 100;
            const top = (i * 12.3) % 100;
            const delay = (i * 0.2) % 3;
            const duration = 4 + (i * 0.1) % 2;
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              ></div>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              FAQ&apos;S
            </h2>
          </div>

          {/* FAQ Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">1.</span>
                    <h3 className="text-white font-semibold text-lg">What is Kaivalya Digitals and how does it work?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(1)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(1) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(1) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    Kaivalya Digitals is an AI-powered platform that lets you build, optimize, and scale ad campaigns using modular, context-aware components called Viblets.
                  </p>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">2.</span>
                    <h3 className="text-white font-semibold text-lg">Who does kaivalya digitals cater to?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(2)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(2) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(2) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    Kaivalya Digitals caters to digital marketers, agencies, e-commerce businesses, and growth teams looking to optimize their advertising campaigns with AI-powered insights and automation.
                  </p>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">3.</span>
                    <h3 className="text-white font-semibold text-lg">Which ad platforms are supported?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(3)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(3) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(3) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    We support all major advertising platforms including Facebook, Instagram, Google Ads, TikTok, Snapchat, Twitter, LinkedIn, and many more through our comprehensive integration network.
                  </p>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">4.</span>
                    <h3 className="text-white font-semibold text-lg">Which tracking tools can I connect?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(4)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(4) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(4) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    You can connect popular tracking tools like Google Analytics, Facebook Pixel, TikTok Pixel, Google Tag Manager, and custom tracking solutions to get comprehensive campaign insights.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* FAQ 5 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">5.</span>
                    <h3 className="text-white font-semibold text-lg">How many ad accounts can I link?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(5)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(5) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(5) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    You can link multiple accounts — there&apos;s no fixed limit, and plans scale with usage.
                  </p>
                )}
              </div>

              {/* FAQ 6 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">6.</span>
                    <h3 className="text-white font-semibold text-lg">How accurate is the data inside Kaivalya Digitals?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(6)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(6) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(6) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    Our data accuracy is 99.9% as we pull real-time data directly from advertising platforms and use advanced AI algorithms to ensure data integrity and consistency across all metrics.
                  </p>
                )}
              </div>

              {/* FAQ 7 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">7.</span>
                    <h3 className="text-white font-semibold text-lg">Can I launch campaigns directly from Kaivalya Digitals?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(7)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(7) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(7) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    Yes! You can create, launch, and manage campaigns directly from Kaivalya Digitals. Our platform integrates seamlessly with all major advertising platforms for end-to-end campaign management.
                  </p>
                )}
              </div>

              {/* FAQ 8 */}
              <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold text-lg">8.</span>
                    <h3 className="text-white font-semibold text-lg">Can I generate UGC ads inside Kaivalya Digitals?</h3>
                  </div>
                  <button 
                    onClick={() => toggleFAQ(8)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedFAQs.includes(8) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                </div>
                {expandedFAQs.includes(8) && (
                  <p className="text-gray-300 text-sm leading-relaxed ml-8">
                    Absolutely! Our AI-powered creative generation tools can create authentic UGC-style ads, including scripts, hooks, and visual concepts that resonate with your target audience and drive engagement.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Quote Footer Section */}
      <section id="contact" className="relative py-12 sm:py-16 lg:py-24 bg-[#07090b] overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-800">
            {/* Main CTA */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
                Ready To Fix Your Next Campaign With Kaivalya Digitals?
              </h2>
              
              <a href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl hover:from-green-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Get Quote Now
              </a>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">K</span>
                  </div>
                  <span className="text-xl font-bold text-white">Kaivalya Digitals</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Full-service creative and digital agency offering 360° solutions in production, 
                  marketing, branding, and technology.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Home</a>
                  <a href="/about" className="text-gray-300 hover:text-green-400 transition-colors text-sm">About</a>
                  <a href="#services" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Services</a>
                  <a href="/contact" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Contact</a>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <div>+91 82997 59969</div>
                      <div>+91 88876 33640</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>bd.team@kaivalyadigitals.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span>www.kaivalyadigitals.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-8 pt-6 border-t border-gray-700">
              {/* Social Media */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex items-center space-x-4">
                  <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                  <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                  <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                  <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <a href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all">
                  Request a Quote
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                © 2025 Kaivalya Digitals Pvt. Ltd. – All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/918299759969?text=Hello%2C%20I%20want%20Information%20About%20Kaivalya%20Digitals%20Services"
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
        </a>
      </section>
    </div>
  );
}

