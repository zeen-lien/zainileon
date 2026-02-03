import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Komponen LaboratoryLogin - Full Screen Dark Futuristic Login
 * Minimalist but GAHAR design with professional animations
 */
export default function LaboratoryLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password hash (SHA-256 of "felina211225")
  const CORRECT_PASSWORD_HASH = '10b1d00dd2794d3275816634779a426311dc94e6b400de7cf1c8e513b6f60d62';

  /**
   * Simple SHA-256 hash function
   */
  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  /**
   * Handler untuk submit password
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const hashedPassword = await sha256(password);
      
      if (hashedPassword === CORRECT_PASSWORD_HASH) {
        // Password correct - Show success animation
        setIsSuccess(true);
        
        // Wait for animation then redirect
        setTimeout(() => {
          onLoginSuccess();
        }, 4500); // Extended to 4.5 seconds
      } else {
        // Password wrong
        setError('Invalid credentials. Access denied.');
        setPassword('');
      }
    } catch (err) {
      setError('Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_40%,transparent_100%)]" />
        
        {/* Animated Scan Lines */}
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-32"
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-cyan-500/30" />
        <div className="absolute top-0 right-0 w-64 h-64 border-r-2 border-t-2 border-cyan-500/30" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border-l-2 border-b-2 border-cyan-500/30" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-cyan-500/30" />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            {/* Digital Rain Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100 }}
                  animate={{ y: '100vh' }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2
                  }}
                  className="absolute text-cyan-500/20 font-mono text-xs"
                  style={{ left: `${i * 5}%` }}
                >
                  {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl px-6">
              
              {/* Glitch Effect Title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                <motion.h2
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(6,182,212,0.5)',
                      '0 0 20px rgba(6,182,212,0.8), 0 0 30px rgba(6,182,212,0.6)',
                      '0 0 10px rgba(6,182,212,0.5)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl md:text-7xl font-bold text-cyan-400 mb-4 tracking-wider relative"
                >
                  <span className="relative">
                    ACCESS GRANTED
                    {/* Glitch layers */}
                    <motion.span
                      animate={{
                        x: [-2, 2, -2],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                      className="absolute inset-0 text-red-500"
                      style={{ clipPath: 'inset(0 0 50% 0)' }}
                    >
                      ACCESS GRANTED
                    </motion.span>
                    <motion.span
                      animate={{
                        x: [2, -2, 2],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.7 }}
                      className="absolute inset-0 text-blue-500"
                      style={{ clipPath: 'inset(50% 0 0 0)' }}
                    >
                      ACCESS GRANTED
                    </motion.span>
                  </span>
                </motion.h2>
              </motion.div>

              {/* Terminal-style Loading */}
              <div className="bg-black/80 border-2 border-cyan-500/50 rounded-xl p-8 backdrop-blur-sm shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-cyan-400 text-sm font-mono ml-4">SYSTEM_BREACH.exe</span>
                </div>

                {/* Loading Steps */}
                <div className="space-y-3 text-left font-mono text-sm">
                  {[
                    { text: '> Bypassing firewall...', delay: 0 },
                    { text: '> Decrypting access tokens...', delay: 0.5 },
                    { text: '> Establishing secure tunnel...', delay: 1.0 },
                    { text: '> Loading laboratory modules...', delay: 1.5 },
                    { text: '> Initializing workspace...', delay: 2.0 },
                    { text: '> Verifying credentials...', delay: 2.5 },
                    { text: '> BREACH SUCCESSFUL', delay: 3.0, highlight: true }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.delay, duration: 0.3 }}
                      className={`flex items-center gap-3 ${step.highlight ? 'text-green-400 font-bold' : 'text-cyan-300'}`}
                    >
                      {step.highlight ? (
                        <motion.svg
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </motion.svg>
                      ) : (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                        />
                      )}
                      <span>{step.text}</span>
                      {!step.highlight && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          _
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-cyan-400">PROGRESS</span>
                    <motion.span
                      key={Math.random()}
                      className="text-green-400"
                    >
                      <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
                      >
                        {Math.floor(Math.random() * 100)}%
                      </motion.span>
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-cyan-500/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.0, ease: "easeInOut" }}
                      className="h-full relative"
                    >
                      {/* Animated gradient */}
                      <motion.div
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500" />
                    </motion.div>
                  </div>
                </div>

                {/* Data Stream */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-6 pt-6 border-t border-cyan-500/30"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ▓▓▓▓▓▓▓▓▓▓
                    </motion.span>
                    <span>STREAMING DATA...</span>
                  </div>
                </motion.div>
              </div>

              {/* Warning Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 text-red-400 text-sm font-mono"
              >
                [ UNAUTHORIZED ACCESS DETECTED ]
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 h-full flex">
        
        {/* Left Panel - Info */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24"
        >
          {/* Logo/Title */}
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="relative">
                <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-cyan-400/20 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LABORATORY
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2" />
              </div>
            </motion.div>
            
            <p className="text-2xl text-gray-400 leading-relaxed">
              Secure Trading Workspace
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {[
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Trading Journal",
                desc: "Comprehensive trade tracking and analytics"
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                title: "Smart Notes",
                desc: "Organize strategies and market insights"
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Pro Calculators",
                desc: "Advanced risk management tools"
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Performance Metrics",
                desc: "Real-time trading statistics"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-3 text-gray-500 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>SHA-256 Encrypted • Session expires in 24 hours</span>
          </motion.div>
        </motion.div>

        {/* Right Panel - Login Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
        >
          <div className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <svg className="w-20 h-20 text-cyan-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                LABORATORY
              </h1>
              <p className="text-gray-400">Secure Access Required</p>
            </div>

            {/* Login Card */}
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-2xl blur-xl" />
              
              <div className="relative bg-black/40 backdrop-blur-xl border-2 border-gray-800 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,212,255,0.1)] hover:border-cyan-500/50 transition-all duration-500">
                
                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Authentication</h2>
                  <p className="text-gray-400">Enter your credentials to access the laboratory</p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 flex items-start gap-3"
                    >
                      <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-red-400 mb-1">Access Denied</p>
                        <p className="text-sm text-red-300">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password Input */}
                <div className="mb-8">
                  <label htmlFor="password" className="block text-white font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Password
                  </label>
                  
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-4 pr-14 rounded-xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      disabled={isLoading}
                      autoFocus
                    />
                    
                    {/* Toggle Password Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                          className="relative"
                        >
                          <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <motion.div
                            animate={{ opacity: [0, 1, 0], x: [-2, 2, -2] }}
                            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
                            className="absolute inset-0 w-6 h-6"
                          >
                            <div className="absolute top-1 left-0 w-full h-0.5 bg-cyan-400/50" />
                            <div className="absolute bottom-1 left-0 w-full h-0.5 bg-cyan-400/50" />
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0, rotate: 90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                        >
                          <motion.svg
                            className="w-6 h-6 text-gray-600 group-hover:text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.41 3.11 7.24.1.09.21.15.33.18.12.03.25.01.36-.05.11-.06.2-.16.25-.28.05-.12.06-.25.02-.37-.53-1.57-.53-3.27 0-4.84.26-.77.65-1.49 1.15-2.12.5-.63 1.11-1.17 1.8-1.59.69-.42 1.45-.72 2.24-.88.79-.16 1.61-.18 2.41-.06.8.12 1.57.38 2.28.77.71.39 1.35.9 1.89 1.51.54.61.97 1.31 1.26 2.07.29.76.44 1.57.44 2.39 0 .82-.15 1.63-.44 2.39-.05.12-.04.25.02.37.06.12.15.22.26.28.11.06.24.08.36.05.12-.03.23-.09.32-.18C20.8 17.41 22 14.85 22 12c0-5.52-4.48-10-10-10zm-3 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                            <path d="M12 14c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1z"/>
                          </motion.svg>
                        </motion.div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>VERIFYING...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span>ACCESS LABORATORY</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Footer Info */}
                <p className="mt-6 text-center text-gray-500 text-sm">
                  Protected area. Unauthorized access is prohibited.
                </p>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
