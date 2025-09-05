import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Users, CheckCircle, ArrowRight, Phone, Mail, Globe } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Government Header - Enhanced Fixed Position */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-orange-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full p-2 shadow-sm">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Jharkhand_Rajakiya_Chihna.svg" 
                  alt="Government of Jharkhand" 
                  className="w-10 h-10"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-gray-900 font-bold text-xl leading-tight">Government of Jharkhand</h1>
                <p className="text-orange-600 text-sm font-medium">Municipal Administration Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <Link 
                to="/login" 
                className="btn btn-primary shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background - Enhanced with better spacing */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://plus.unsplash.com/premium_photo-1697730373510-51b7fcf2ff52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        {/* Hero Content */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-6 text-center text-white">
            <div className="max-w-5xl mx-auto py-20">
              <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Jharkhand Municipal
                  <span className="block text-orange-400 mt-2">Civic Issues Portal</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/95 leading-relaxed max-w-3xl mx-auto">
                  Empowering citizens and administrators to build a better Jharkhand through 
                  efficient civic issue management and transparent governance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/login" 
                    className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Users className="w-5 h-5" />
                    Administrator Access
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a 
                    href="#features" 
                    className="btn text-lg px-8 py-4 bg-white/25 text-white border-2 border-white/60 hover:bg-white/35 hover:border-white/80 transition-all duration-300 backdrop-blur-sm"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Digital Governance for Modern Jharkhand
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform streamlines civic issue management, 
              ensuring transparency and accountability in municipal administration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Issue Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time monitoring and management of civic issues across all municipal areas 
                with location-based tracking and priority management.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Resolution Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient workflow for issue resolution with status updates, 
                progress tracking, and completion verification systems.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Administrative Control</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive dashboard for municipal administrators to oversee 
                operations, generate reports, and ensure service delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Making a Difference</h2>
            <p className="text-xl text-orange-100">
              Transforming civic governance through digital innovation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">24</div>
              <div className="text-orange-100">Districts Covered</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-orange-100">Issues Resolved</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-orange-100">Municipal Bodies</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">System Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              For technical support or administrative queries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card p-6 text-center">
              <Phone className="w-8 h-8 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600">+91-651-2490000</p>
            </div>
            <div className="card p-6 text-center">
              <Mail className="w-8 h-8 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600">support@jharkhand.gov.in</p>
            </div>
            <div className="card p-6 text-center">
              <Globe className="w-8 h-8 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Official Website</h3>
              <p className="text-gray-600">www.jharkhand.gov.in</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JH</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Government of Jharkhand</h3>
                  <p className="text-gray-400 text-sm">Municipal Administration</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Committed to transparent governance and efficient public service delivery 
                through innovative digital solutions for the people of Jharkhand.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Admin Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RTI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Government of Jharkhand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
