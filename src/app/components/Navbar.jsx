"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState('Eng')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const languageOptions = ['Eng', 'Esp', 'Fra', 'Deu']

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev)
  }

  const selectLanguage = (lang) => {
    setActiveLanguage(lang)
    setIsLanguageMenuOpen(false)
  }

  return (
    <motion.div
      className={` top-0 z-50 py-2 transition-all duration-300 `}
    
    >
      <div className='container mx-auto py-3 px-4'>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img
              src="/assets/Supreme_logos.png"
              
              alt="Supreme Logo"
              className="w-30 md:w-36 lg:w-36"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className='hidden md:flex gap-6 items-center'>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className='bg-[#5dd6fc] hover:bg-[#4ac5e9] text-white p-2 rounded-full px-5 transition-all'>
                Contact
              </button>
            </motion.div>

            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Image
                src="/bxl-linkedin.svg.png"
                width={24}
                height={24}
                alt="LinkedIn"
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.a>

            <div className='relative'>
              <motion.button
                className='flex items-center gap-1 text-gray-700'
                onClick={toggleLanguageMenu}
                whileHover={{ scale: 1.05 }}
              >
                <Image src="/translate.png" width={20} height={20} alt="Translate" />
                <span>{activeLanguage}</span>
                <motion.span animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}>▼</motion.span>
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-50'
                  >
                    {languageOptions.map((lang) => (
                      <motion.div
                        key={lang}
                        whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
                        className='px-4 py-2 text-sm text-gray-700 cursor-pointer'
                        onClick={() => selectLanguage(lang)}
                      >
                        {lang}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-700 focus:outline-none'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black z-40 md:hidden"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl z-50 md:hidden"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex justify-end mb-8">
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 focus:outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  <nav className="flex-1 space-y-6">
                    {['Home', 'Products', 'Services', 'About'].map((item) => (
                      <motion.a
                        key={item}
                        href="#"
                        className="block text-2xl font-medium text-gray-800 hover:text-[#5dd6fc]"
                        whileHover={{ x: 10 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </motion.a>
                    ))}
                  </nav>

                  <div className="mt-auto pt-8 border-t border-gray-200">
                    <motion.button
                      className="w-full bg-[#5dd6fc] hover:bg-[#4ac5e9] text-white py-3 rounded-lg text-lg font-medium mb-6"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact Us
                    </motion.button>

                    <div className="flex items-center justify-center space-x-6">
                      <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <Image src="/assets/bxl-linkedin.svg.png" width={28} height={28} alt="LinkedIn" />
                      </motion.a>

                      {/* Language Dropdown */}
                      <div className="relative">
                        <motion.button
                          className="flex items-center gap-2 text-gray-700"
                          onClick={toggleLanguageMenu}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image src="/assets/translate.png" width={24} height={24} alt="Translate" />
                          <span className="text-lg">{activeLanguage}</span>
                        </motion.button>

                        <AnimatePresence>
                          {isLanguageMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-50"
                            >
                              {languageOptions.map((lang) => (
                                <motion.div
                                  key={lang}
                                  whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
                                  className="px-4 py-2 text-base text-gray-700 cursor-pointer"
                                  onClick={() => selectLanguage(lang)}
                                >
                                  {lang}
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Navbar
