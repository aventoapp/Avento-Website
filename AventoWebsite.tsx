import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Share2, Users, Camera, Sparkles, Heart, Calendar, MessageCircle, Check, ChevronDown, Mail, MapPin, Phone, Briefcase, Shield, FileText, Send, Menu, X } from 'lucide-react';

interface AventoWebsiteProps {
  onBack?: () => void;
}

export default function AventoWebsite({ onBack }: AventoWebsiteProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const faqs = [
    {
      question: "What is Avento?",
      answer: "Avento is a comprehensive event management and photo sharing platform that helps you create, manage, and celebrate events with friends and family. From birthday parties to group gatherings, Avento makes every event memorable."
    },
    {
      question: "How does AI photo filtering work?",
      answer: "Our AI technology automatically organizes photos by detecting faces and grouping them by person. This makes it incredibly easy to find photos of specific people at your events without manual tagging."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use bank-level encryption to protect your photos and personal information. Your data is stored securely and we never share it with third parties without your explicit consent."
    },
    {
      question: "Can I use Avento for free?",
      answer: "Yes! Avento offers a free plan with up to 1,000 photos. You can create unlimited events and groups, and access all core features. Premium plans offer more storage and advanced features."
    },
    {
      question: "How do group contributions work?",
      answer: "Group admins can optionally enable fund collection for events. Members can contribute via UPI or cash payments, and all transactions require admin approval for transparency and security."
    },
    {
      question: "What platforms is Avento available on?",
      answer: "Currently, Avento is available on Android and iOS. We're also working on a web version for desktop access."
    },
    {
      question: "Can I export my photos?",
      answer: "Yes! You can download all your photos anytime. We believe your memories belong to you, and you should have full access to them."
    },
    {
      question: "How do I delete my account?",
      answer: "You can delete your account anytime from Settings > Privacy & Security > Delete Account. All your data will be permanently removed within 30 days."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 font-['Poppins',sans-serif]">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow border border-purple-100"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>
              )}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Avento
                </h1>
                <p className="text-xs text-gray-500">Where Events Come Alive</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection('features')} className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="text-sm text-gray-600 hover:text-purple-600 transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('about')} className="text-sm text-gray-600 hover:text-purple-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Contact</button>
              <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.avento.app', '_blank')} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Download App
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm flex items-center gap-2">
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              Menu
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-purple-100">
              <nav className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('features')} className="text-left px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">Features</button>
                <button onClick={() => scrollToSection('pricing')} className="text-left px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">Pricing</button>
                <button onClick={() => scrollToSection('faq')} className="text-left px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">FAQ</button>
                <button onClick={() => scrollToSection('about')} className="text-left px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">About</button>
                <button onClick={() => scrollToSection('contact')} className="text-left px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">Contact</button>
                <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.avento.app', '_blank')} className="text-left px-4 py-2 text-sm text-purple-600 font-semibold hover:bg-purple-50 rounded-lg transition-colors">Download App</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Event Management Reimagined
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              Where Events
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Come Alive
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create unforgettable memories with seamless event management, AI-powered photo sharing, 
            and collaborative celebrations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => scrollToSection('features')} className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Hero Image - Mock Phone Screenshot */}
          <div className="relative max-w-sm mx-auto">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-gray-800 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-8">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-inner">
                {/* Mock App Interface */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">My Events</h3>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  </div>
                  
                  {/* Mock Event Cards */}
                  {[1, 2].map((i) => (
                    <div key={i} className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-800">Birthday Party</span>
                      </div>
                      <div className="h-2 w-3/4 bg-purple-200 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-purple-100 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 blur-xl opacity-60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need for
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Perfect Events</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From planning to memories, Avento handles it all with style and simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl hover:shadow-purple-500/20 transition-all border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Event Management</h3>
              <p className="text-gray-600">
                Create and manage events effortlessly with RSVP tracking, reminders, and countdown timers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl hover:shadow-purple-500/20 transition-all border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Photo Galleries</h3>
              <p className="text-gray-600">
                Let AI organize photos by faces automatically. Find your memories in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 hover:shadow-xl hover:shadow-purple-500/20 transition-all border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Collaborative Groups</h3>
              <p className="text-gray-600">
                Create groups, share moments, and celebrate together with seamless collaboration.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-xl hover:shadow-purple-500/20 transition-all border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Share2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Photo Contributions</h3>
              <p className="text-gray-600">
                Everyone can upload and share photos. Build collective memories together.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl hover:shadow-purple-500/20 transition-all border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Group & Private Chats</h3>
              <p className="text-gray-600">
                Stay connected with group conversations and 1-on-1 messaging built right in.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-xl hover:shadow-purple-500/20 transition-all border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Birthday Celebrations</h3>
              <p className="text-gray-600">
                Never miss a birthday with special festive cards and automatic reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-indigo-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Pricing</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your event needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">₹0</span>
                </div>
                <p className="text-sm text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 1,000 photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited groups</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">AI photo filtering</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic support</span>
                </li>
              </ul>
            </div>

            {/* Monthly Plan - Popular */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 border-2 border-purple-600 shadow-2xl shadow-purple-500/50 transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Plan 1</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">₹99</span>
                </div>
                <p className="text-sm text-purple-200">For active event planners</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Up to 5,000 photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Everything in Free</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Custom event themes</span>
                </li>
              </ul>
            </div>

            {/* Yearly Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Plan 2</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">₹999</span>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-2">
                  Save 16%
                </div>
                <p className="text-sm text-gray-600">Best value for power users</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 80,000 photos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in Monthly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 premium support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Early access to features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom branding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Avento
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About Avento
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how people celebrate and share life's special moments. 
              Founded in 2026, Avento brings together cutting-edge technology and thoughtful design 
              to create the ultimate event management experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-purple-100">
                To bring people closer through seamless event experiences and shared memories.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-purple-100">
                To be the world's most loved platform for creating and celebrating memorable events.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Our Values</h3>
              <p className="text-purple-100">
                Innovation, privacy, community, and making every celebration truly special.
              </p>
            </div>
          </div>

          {/* <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Join Our Growing Community</h3>
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-8">
                <div>
                  <div className="text-4xl font-bold mb-1">10K+</div>
                  <div className="text-purple-200">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">50K+</div>
                  <div className="text-purple-200">Events Created</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">1M+</div>
                  <div className="text-purple-200">Photos Shared</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-indigo-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Touch</span>
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">avento.events963@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Policy</span>
            </h2>
            <p className="text-sm text-gray-500">Last updated: February 15, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Privacy Matters</h3>
              <p className="text-gray-700 leading-relaxed">
                At Avento, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our services.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Name, phone number, and date of birth</li>
                  <li>Photos and videos you upload</li>
                  <li>Event and group information</li>
                  <li>Messages and communications within the app</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>To provide and improve our services</li>
                  <li>To organize and display your photos using AI technology</li>
                  <li>To facilitate communication between group members</li>
                  <li>To process payments and contributions</li>
                  <li>To send notifications about events and activities</li>
                  <li>To provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Data Security</h3>
                <p className="text-gray-700 leading-relaxed">
                  We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">4. Your Rights</h3>
                <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">5. Contact Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:avento.events963@gmail.com" className="text-purple-600 hover:text-purple-700 font-semibold">
                    avento.events963@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Service Section */}
      <section id="terms" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-indigo-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Service</span>
            </h2>
            <p className="text-sm text-gray-500">Last updated: February 15, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 mb-8 border border-purple-100 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Agreement to Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Avento, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Use of Service</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You must be at least 13 years old to use Avento. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not use the service for illegal purposes</li>
                  <li>Respect other users' privacy and rights</li>
                  <li>Not upload malicious content or spam</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Content Ownership</h3>
                <p className="text-gray-700 leading-relaxed">
                  You retain all rights to the content you upload to Avento. By uploading content, you grant us a license to store, display, and share it according to your privacy settings and the purpose of the service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Prohibited Activities</h3>
                <p className="text-gray-700 leading-relaxed mb-3">You may not:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on others' intellectual property</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Attempt to gain unauthorized access to the service</li>
                  <li>Interfere with the proper functioning of the service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">4. Payment Terms</h3>
                <p className="text-gray-700 leading-relaxed">
                  Paid subscriptions are billed in advance on a recurring basis. You can cancel your subscription anytime, but no refunds are provided for partial billing periods.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">5. Limitation of Liability</h3>
                <p className="text-gray-700 leading-relaxed">
                  Avento is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to data loss, unauthorized access, or service interruptions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">6. Changes to Terms</h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">7. Contact Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  For questions about these Terms of Service, contact us at{' '}
                  <a href="mailto:avento.events963@gmail.com" className="text-purple-600 hover:text-purple-700 font-semibold">
                    avento.events963@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make Your
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Events Come Alive?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of users creating unforgettable memories with Avento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.avento.app', '_blank')} className="group px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2">
              Download Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Avento
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Where Events Come Alive
              </p>
              <p className="text-xs text-gray-500">
                Making every celebration memorable since 2026.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-purple-600 transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-purple-600 transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-purple-600 transition-colors">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-purple-600 transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-purple-600 transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => scrollToSection('privacy')} className="hover:text-purple-600 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => scrollToSection('terms')} className="hover:text-purple-600 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2026 Avento. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
