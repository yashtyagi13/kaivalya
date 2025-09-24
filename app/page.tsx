'use client';

// import Image from "next/image";
import { useEffect } from 'react';

export default function Home() {
  // FAQ state management
  // const [expandedFAQs, setExpandedFAQs] = useState<number[]>([1, 5]); // Initially expanded FAQs

  // const toggleFAQ = (faqNumber: number) => {
  //   setExpandedFAQs(prev => 
  //     prev.includes(faqNumber) 
  //       ? prev.filter(num => num !== faqNumber)
  //       : [...prev, faqNumber]
  //   );
  // };

  useEffect(() => {
    const animateNumbers = () => {
      const stats = [
        { id: 'stat1', target: 80, suffix: '%', prefix: '+' },
        { id: 'stat2', target: 5, suffix: 'M' },
        { id: 'stat3', target: 10, suffix: 'X' },
        { id: 'stat4', target: 300, suffix: '%' },
        { id: 'stat5', target: 100, suffix: '+' }
      ];

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
            <div className="text-2xl font-bold text-white">
              <span className="text-green-400">Kaivalya</span> Digitals
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-12 text-sm">
            <a href="#" className="text-green-400 font-medium">Home</a>
            <a href="#about" className="text-white hover:text-white/80">About</a>
            <a href="#services" className="text-white hover:text-white/80">Services</a>
            <a href="#contact" className="text-white hover:text-white/80">Contact</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#contact" className="hidden sm:block rounded-full bg-white text-black px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-medium hover:bg-white/90">
              Get a Quote
            </a>
            {/* Mobile menu button */}
            <button className="lg:hidden p-2 text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 text-center">
        <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-green-500/40 bg-green-400/10 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-green-300 shadow-[0_0_30px_-10px_rgba(34,197,94,1)]">
          ✨ Full-Service Creative & Digital Agency
        </div>
        <h1 className="mt-8 sm:mt-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight">
          <span className="shining-text shining-text-glow">Where Creativity Meets Impact</span>
        </h1>
        <p className="mx-auto mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-sm sm:text-base lg:text-lg text-white/70 px-4">
          Innovating Narratives | Empowering Brands | Redefining Digital
        </p>
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 px-4">
          <a href="#services" className="rounded-full bg-[#5b74ff] hover:bg-[#6c83ff] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white shadow-[0_10px_30px_-10px_rgba(91,116,255,.9)] transition-all duration-300">
            Explore Services
          </a>
          <a href="#contact" className="rounded-full bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white shadow-[0_10px_30px_-10px_rgba(34,197,94,.9)] transition-all duration-300">
            Get a Quote
          </a>
        </div>
      </main>

      {/* About Us Section */}
      <section id="about" className="relative py-12 sm:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                About Kaivalya Digitals
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-4xl mx-auto px-4">
                Kaivalya Digitals Pvt. Ltd. is a full-service creative and digital agency offering 360° solutions in production, marketing, branding, and technology. We help brands, leaders, and institutions amplify their presence through powerful stories, smart campaigns, and impactful digital experiences.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-green-600/20 border-2 border-green-400 rounded-xl p-4 sm:p-6 text-center hover:bg-green-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-green-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <h3 className="text-green-400 font-semibold text-sm sm:text-base mb-2">Creativity with Purpose</h3>
                <p className="text-white/70 text-xs sm:text-sm">Innovative solutions that drive real results</p>
              </div>

              <div className="bg-blue-600/20 border-2 border-blue-400 rounded-xl p-4 sm:p-6 text-center hover:bg-blue-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-blue-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-blue-400 font-semibold text-sm sm:text-base mb-2">Integrity</h3>
                <p className="text-white/70 text-xs sm:text-sm">Transparent and honest in all our dealings</p>
              </div>

              <div className="bg-purple-600/20 border-2 border-purple-400 rounded-xl p-4 sm:p-6 text-center hover:bg-purple-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-purple-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-purple-400 font-semibold text-sm sm:text-base mb-2">Client-Centric Approach</h3>
                <p className="text-white/70 text-xs sm:text-sm">Your success is our priority</p>
              </div>

              <div className="bg-orange-600/20 border-2 border-orange-400 rounded-xl p-4 sm:p-6 text-center hover:bg-orange-600/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-orange-400/30">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-orange-400 font-semibold text-sm sm:text-base mb-2">Excellence</h3>
                <p className="text-white/70 text-xs sm:text-sm">Delivering exceptional quality in every project</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-16 sm:py-20 lg:py-24 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/70 max-w-5xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            {/* Production & Post-Production */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-green-400/80 transition-all duration-300 shadow-2xl shadow-green-500/20 h-full flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-green-400/30">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Production & Post-Production</h3>
                <ul className="space-y-4 sm:space-y-5 text-white/70 text-sm sm:text-base lg:text-lg flex-grow">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Corporate videos & brand films</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Event coverage & photography</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Reels & short-form content editing</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Documentaries & storytelling</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advertising & Marketing */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-blue-400/80 transition-all duration-300 shadow-2xl shadow-blue-500/20 h-full flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-blue-400/30">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Advertising & Marketing</h3>
                <ul className="space-y-4 sm:space-y-5 text-white/70 text-sm sm:text-base lg:text-lg flex-grow">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Performance marketing (Meta/Google)</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>SEO & social media management</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Influencer campaigns & outreach</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Creative ad design & optimization</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Branding & Creative */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-purple-400/80 transition-all duration-300 shadow-2xl shadow-purple-500/20 h-full flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-purple-400/30">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Branding & Creative</h3>
                <ul className="space-y-4 sm:space-y-5 text-white/70 text-sm sm:text-base lg:text-lg flex-grow">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Logo design & brand guidelines</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Packaging & stationery design</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Presentations & campaign visuals</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Brand identity development</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Digital Solutions */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-orange-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-orange-400/80 transition-all duration-300 shadow-2xl shadow-orange-500/20 h-full flex flex-col">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-orange-400/30">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Digital Solutions</h3>
                <ul className="space-y-4 sm:space-y-5 text-white/70 text-sm sm:text-base lg:text-lg flex-grow">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Website & app development</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>E-book production & design</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>YouTube channel optimization</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Add-on creative services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Get In Touch
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto">
              Ready to transform your digital presence? Let&apos;s create something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-green-500/20">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-400/30">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Address</h4>
                      <p className="text-white/70">Plot No 33, Budh Vihar Colony<br />Sai Data Road, Arjunganj<br />Lucknow</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Phone</h4>
                      <p className="text-white/70">+91 82997 59969<br />+91 88876 33640</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Email</h4>
                      <p className="text-white/70">bd.team@kaivalyadigitals.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                      <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Website</h4>
                      <p className="text-white/70">www.kaivalyadigitals.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col justify-center">
              <div className="bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-blue-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-500/20 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-white/70 text-lg mb-8">Let&apos;s discuss your project and bring your vision to life.</p>

                <div className="space-y-4">
                  <a href="mailto:bd.team@kaivalyadigitals.com" className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Request a Quote
                  </a>
                  <a href="tel:+918299759969" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Waitlist Footer Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-[#07090b] overflow-hidden">
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
                Ready to Transform Your Digital Presence?
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#services" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Explore Services
                </a>
                <a href="#contact" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                  Get a Quote
                </a>
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="text-2xl font-bold text-white">
                  <span className="text-green-400">Kaivalya</span> Digitals
                </div>
                <p className="text-white/70 text-sm">
                  Full-service creative and digital agency offering 360° solutions in production, marketing, branding, and technology.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-white/70 hover:text-white transition-colors">Home</a>
                  <a href="#about" className="block text-white/70 hover:text-white transition-colors">About</a>
                  <a href="#services" className="block text-white/70 hover:text-white transition-colors">Services</a>
                  <a href="#contact" className="block text-white/70 hover:text-white transition-colors">Contact</a>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">Services</h3>
                <div className="space-y-2">
                  <span className="block text-white/70 text-sm">Production & Post-Production</span>
                  <span className="block text-white/70 text-sm">Advertising & Marketing</span>
                  <span className="block text-white/70 text-sm">Branding & Creative</span>
                  <span className="block text-white/70 text-sm">Digital Solutions</span>
                </div>
              </div>

              {/* Follow Us */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">Follow Us</h3>
                <div className="flex items-center space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>

                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-gray-700">
              <p className="text-white/50 text-sm">
                © 2025 Kaivalya Digitals Pvt. Ltd. – All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Icon */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors cursor-pointer">
          <div className="text-white text-xl">💬</div>
        </div>
      </div>
    </div>
  );
}
