import React, { useState, useEffect } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Win Rate', value: '67.8%', subtext: '+5.2% this month', color: 'from-green-500 to-emerald-600' },
    { label: 'Total Picks', value: '1,247', subtext: '+124 this week', color: 'from-blue-500 to-cyan-600' },
    { label: 'Avg ROI', value: '15.3%', subtext: '+2.1% vs last season', color: 'from-purple-500 to-pink-600' },
    { label: 'Active Users', value: '8.4K', subtext: '+1.2K this month', color: 'from-orange-500 to-red-600' },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Data-Driven Picks',
      description: 'Advanced algorithms analyze 50+ data points per game to find the highest value plays',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Live dashboards track performance, trends, and market movements as they happen',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: '🏆',
      title: 'Proven Track Record',
      description: 'Transparent history with every pick graded and verified. No hiding losses.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: '⚡',
      title: 'Instant Notifications',
      description: 'Get alerted the moment new picks drop or when critical line movements occur',
      gradient: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const testimonials = [
    {
      text: "Best sports betting service I've used. Up 40% since joining.",
      author: "Mike T.",
      role: "Premium Member",
      image: "M"
    },
    {
      text: "The analytics are insane. Finally understand the edge.",
      author: "Sarah K.",
      role: "Premium Member",
      image: "S"
    },
    {
      text: "ROI speaks for itself. This is the real deal.",
      author: "James R.",
      role: "Premium Member",
      image: "J"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-float">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500/20 to-purple-500/20 backdrop-blur-xl border border-primary-500/30 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent">
                67.8% WIN RATE THIS SEASON
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-center mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
              Win More.
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Bet Smarter.
            </span>
          </h1>

          <p className="text-center text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join <span className="text-primary-400 font-bold">8,400+ winning bettors</span> who trust RazorEdge for 
            data-driven picks, expert analysis, and consistent profits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-bold text-lg overflow-hidden shadow-2xl shadow-primary-500/50 hover:shadow-primary-500/70 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Start Winning Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/30 transform hover:scale-105 transition-all duration-300">
              View Free Picks
            </button>
          </div>

          {/* Rotating Stats Display */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br opacity-50" style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                '--tw-gradient-from': stats[currentStat].color.split(' ')[0].replace('from-', ''),
                '--tw-gradient-to': stats[currentStat].color.split(' ')[1].replace('to-', '')
              }} />
              
              <div className="relative z-10">
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {stats[currentStat].label}
                  </div>
                  <div className={`text-6xl sm:text-7xl font-black mb-2 bg-gradient-to-r ${stats[currentStat].color} bg-clip-text text-transparent`}>
                    {stats[currentStat].value}
                  </div>
                  <div className="text-sm text-gray-300 font-semibold">
                    {stats[currentStat].subtext}
                  </div>
                </div>

                {/* Stat Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {stats.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStat(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentStat === idx ? 'w-8 bg-white' : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              The RazorEdge Advantage
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Premium tools and insights that give you an unfair advantage over the sportsbooks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group glass-card p-8 hover:bg-white/10 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary-950/20 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Trusted by Winners
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass-card p-6 hover:bg-white/10 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-xs text-primary-400 font-semibold">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20" />
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Start Winning?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join premium today and get instant access to expert picks, advanced analytics, and our winning community.
              </p>
              
              <button className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-bold text-xl overflow-hidden shadow-2xl shadow-primary-500/50 hover:shadow-primary-500/70 transform hover:scale-105 transition-all duration-300 mb-4">
                <span className="relative z-10">Upgrade to Premium</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <p className="text-sm text-gray-400">
                30-day money-back guarantee • Cancel anytime • No commitments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-semibold">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm font-semibold">Verified Track Record</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-semibold">Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💎</span>
              <span className="text-sm font-semibold">Premium Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}