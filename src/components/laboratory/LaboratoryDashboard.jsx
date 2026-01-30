import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TradingJournal from './TradingJournal';
import Notes from './Notes';
import PositionSizeCalculator from './PositionSizeCalculator';
import RiskRewardCalculator from './RiskRewardCalculator';
import PipCalculator from './PipCalculator';
import ProfitCalculator from './ProfitCalculator';

/**
 * Komponen LaboratoryDashboard - Main dashboard setelah login
 * Area private untuk tools, notes, dan experiments
 */
export default function LaboratoryDashboard({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'trading-journal', 
      label: 'Trading Journal', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      id: 'notes', 
      label: 'Notes', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    { 
      id: 'tools', 
      label: 'Tools', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="
              text-4xl md:text-5xl font-judul font-bold mb-2
              text-transparent bg-clip-text
              bg-gradient-to-r from-aksen-primer to-aksen-sekunder
            ">
              Laboratory
            </h1>
            <p className="text-teks-sekunder">
              Private workspace for experiments, tools, and notes
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              px-4 py-2 rounded-lg
              border-2 border-red-500/30 text-red-400
              hover:bg-red-500/10 hover:border-red-500
              transition-all duration-300
              flex items-center gap-2
              font-medium
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 rounded-lg font-judul font-medium
                whitespace-nowrap transition-all duration-300
                flex items-center gap-2
                ${activeTab === tab.id
                  ? 'bg-aksen-primer text-latar-utama'
                  : 'border-2 border-latar-tersier text-teks-sekunder hover:border-aksen-primer hover:text-aksen-primer'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && <OverviewContent onNavigateToTab={setActiveTab} />}
          {activeTab === 'trading-journal' && <TradingJournal />}
          {activeTab === 'notes' && <Notes />}
          {activeTab === 'tools' && <ToolsContent />}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Overview Content - UPGRADED DARK FUTURISTIC VERSION
 * Now with REAL DATA integration from localStorage
 */
function OverviewContent({ onNavigateToTab }) {
  const [realStats, setRealStats] = useState({
    totalTrades: 0,
    winRate: 0,
    profitFactor: 0,
    totalNotes: 0
  });

  // Load real data from localStorage
  useEffect(() => {
    const loadStats = () => {
      // Load Trading Journal data
      const tradesData = localStorage.getItem('trading_journal');
      const trades = tradesData ? JSON.parse(tradesData) : [];
      
      // Load Notes data
      const notesData = localStorage.getItem('laboratory_notes');
      const notes = notesData ? JSON.parse(notesData) : [];
      const activeNotes = notes.filter(n => !n.isArchived);

      // Calculate trading stats
      const wins = trades.filter(t => t.result === 'win').length;
      const losses = trades.filter(t => t.result === 'loss').length;
      const winRate = trades.length > 0 ? ((wins / trades.length) * 100).toFixed(1) : 0;
      
      // Calculate profit factor (total wins / total losses)
      const totalWins = trades
        .filter(t => t.result === 'win')
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.profitLoss) || 0), 0);
      const totalLosses = trades
        .filter(t => t.result === 'loss')
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.profitLoss) || 0), 0);
      const profitFactor = totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : totalWins > 0 ? totalWins.toFixed(2) : '0.00';

      setRealStats({
        totalTrades: trades.length,
        winRate: winRate,
        profitFactor: profitFactor,
        totalNotes: activeNotes.length
      });
    };

    loadStats();

    // Listen for storage changes (when data is updated in other tabs or components)
    const handleStorageChange = () => loadStats();
    window.addEventListener('storage', handleStorageChange);
    
    // Also reload when component becomes visible (for same-tab updates)
    const interval = setInterval(loadStats, 2000); // Check every 2 seconds

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { 
      label: 'Total Trades', 
      value: realStats.totalTrades.toString(), 
      change: realStats.totalTrades > 0 ? `${realStats.totalTrades} logged` : 'Start trading',
      trend: realStats.totalTrades > 0 ? 'up' : 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ), 
      colorClass: 'text-cyan-400',
      bgGradient: 'from-cyan-500/20 to-blue-500/20',
      glowColor: 'bg-cyan-500/10'
    },
    { 
      label: 'Win Rate', 
      value: `${realStats.winRate}%`, 
      change: realStats.winRate >= 50 ? 'Good!' : realStats.winRate > 0 ? 'Keep going' : 'No data',
      trend: realStats.winRate >= 50 ? 'up' : realStats.winRate > 0 ? 'neutral' : 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      colorClass: 'text-green-400',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      glowColor: 'bg-green-500/10'
    },
    { 
      label: 'Profit Factor', 
      value: realStats.profitFactor, 
      change: parseFloat(realStats.profitFactor) >= 2 ? 'Excellent!' : parseFloat(realStats.profitFactor) >= 1 ? 'Profitable' : 'Needs work',
      trend: parseFloat(realStats.profitFactor) >= 1.5 ? 'up' : parseFloat(realStats.profitFactor) >= 1 ? 'neutral' : 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      colorClass: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      glowColor: 'bg-purple-500/10'
    },
    { 
      label: 'Active Notes', 
      value: realStats.totalNotes.toString(), 
      change: realStats.totalNotes > 0 ? `${realStats.totalNotes} notes` : 'Start writing',
      trend: realStats.totalNotes > 0 ? 'up' : 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      colorClass: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      glowColor: 'bg-blue-500/10'
    },
  ];

  const quickActions = [
    {
      title: 'New Trade',
      description: 'Log a new trade entry',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      action: 'trading-journal'
    },
    {
      title: 'Quick Note',
      description: 'Capture an idea',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      action: 'notes'
    },
    {
      title: 'Calculate',
      description: 'Use trading tools',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      action: 'tools'
    },
  ];

  const insights = [
    {
      title: 'Trading Discipline',
      value: 'Building Foundation',
      description: 'Start logging trades to track your progress',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      colorClass: 'text-cyan-400',
      bgGradient: 'from-cyan-500/10'
    },
    {
      title: 'Risk Management',
      value: 'Essential',
      description: 'Use calculators to manage position sizing',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      colorClass: 'text-green-400',
      bgGradient: 'from-green-500/10'
    },
    {
      title: 'Learning Path',
      value: 'Document Everything',
      description: 'Take notes on patterns and strategies',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      colorClass: 'text-purple-400',
      bgGradient: 'from-purple-500/10'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid - UPGRADED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-black border border-gray-800 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-all"
          >
            {/* Animated Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.glowColor} rounded-full blur-3xl`} />
            
            <div className="relative z-10">
              {/* Icon & Value */}
              <div className="flex items-start justify-between mb-4">
                <div className={stat.colorClass}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${stat.colorClass} mb-1`}>
                    {stat.value}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                    stat.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              {/* Label */}
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              onClick={() => onNavigateToTab(action.action)}
              className="bg-black border border-gray-800 rounded-xl p-6 text-left hover:border-cyan-500/50 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.bgColor} border ${action.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className={action.textColor}>
                  {action.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{action.title}</h3>
              <p className="text-sm text-gray-400">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Trading Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          Trading Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              className="bg-black border border-gray-800 rounded-xl p-6 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${insight.bgGradient} to-transparent`} />
              <div className="relative z-10">
                <div className={`mb-3 ${insight.colorClass}`}>{insight.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
                <div className={`text-2xl font-bold ${insight.colorClass} mb-2`}>
                  {insight.value}
                </div>
                <p className="text-sm text-gray-400">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="bg-black border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-3">
              Welcome to Your Trading Laboratory
            </h2>
            <p className="text-gray-400 mb-4">
              Your private workspace for trading excellence. Track performance, document strategies, and use professional tools to improve your trading.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Track every trade with detailed journal</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Document strategies and learnings</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Professional trading calculators</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Analyze and improve performance</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Tools Content
 */
function ToolsContent() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    {
      id: 'position-size',
      name: 'Position Size Calculator',
      description: 'Calculate optimal position size based on risk',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      component: PositionSizeCalculator,
    },
    {
      id: 'risk-reward',
      name: 'Risk/Reward Calculator',
      description: 'Calculate R:R ratio for your trades',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      component: RiskRewardCalculator,
    },
    {
      id: 'pip',
      name: 'Pip Calculator',
      description: 'Convert pips to currency value',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      component: PipCalculator,
    },
    {
      id: 'profit',
      name: 'Profit Calculator',
      description: 'Calculate potential profit/loss',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      component: ProfitCalculator,
    },
  ];

  if (activeTool) {
    const tool = tools.find(t => t.id === activeTool);
    const ToolComponent = tool.component;
    
    return (
      <div>
        <button
          onClick={() => setActiveTool(null)}
          className="mb-6 flex items-center gap-2 text-aksen-primer hover:text-aksen-primer/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tools
        </button>
        <ToolComponent />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool, index) => (
        <motion.button
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          onClick={() => setActiveTool(tool.id)}
          className="
            bg-latar-sekunder border-2 border-latar-tersier
            rounded-xl p-6 text-left
            hover:border-aksen-primer/50 hover:bg-latar-tersier/30
            transition-all duration-300
          "
        >
          <div className="flex items-start gap-4">
            <div className="text-aksen-primer">{tool.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-judul font-bold text-teks-utama mb-2">
                {tool.name}
              </h3>
              <p className="text-teks-sekunder text-sm mb-3">
                {tool.description}
              </p>
              <span className="
                inline-flex items-center gap-2 text-aksen-primer text-sm font-medium
              ">
                Open Calculator
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
