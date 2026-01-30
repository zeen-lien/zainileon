import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * RiskRewardCalculator - Kalkulator Risk/Reward Ratio
 * Menghitung R:R ratio dan break-even win rate
 * DARK FUTURISTIC VERSION
 */
export default function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);

    if (!entry || !sl || !tp) {
      alert('Please fill all fields');
      return;
    }

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    const rrRatio = reward / risk;
    const breakEvenWinRate = (1 / (1 + rrRatio)) * 100;

    setResult({
      risk: risk.toFixed(5),
      reward: reward.toFixed(5),
      rrRatio: rrRatio.toFixed(2),
      breakEvenWinRate: breakEvenWinRate.toFixed(2),
      isGoodRatio: rrRatio >= 2,
    });
  };

  const reset = () => {
    setEntryPrice('');
    setStopLoss('');
    setTakeProfit('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header dengan Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 bg-black border border-cyan-500/30 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Risk/Reward Calculator</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Calculate your risk-to-reward ratio and break-even win rate. A minimum 1:2 R:R ratio is recommended for profitable trading.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black border border-gray-800 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-50" />
          
          <div className="relative z-10 space-y-5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Trade Parameters
            </h3>

            {/* Entry Price */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Entry Price
              </label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="1.10000"
                step="0.00001"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Stop Loss */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Stop Loss Price
              </label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="1.09500"
                step="0.00001"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Take Profit */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Take Profit Price
              </label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="1.11000"
                step="0.00001"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={calculate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Calculate</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={reset}
                className="px-6 py-3 border border-gray-700 text-gray-400 rounded-xl font-bold hover:border-red-500 hover:text-red-400 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Result Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {result ? (
            <>
              {/* Main R:R Ratio Card */}
              <div className={`border rounded-2xl p-8 relative overflow-hidden ${
                result.isGoodRatio 
                  ? 'bg-black border-green-500/50' 
                  : 'bg-black border-yellow-500/50'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  result.isGoodRatio 
                    ? 'from-green-500/20 via-transparent to-transparent' 
                    : 'from-yellow-500/20 via-transparent to-transparent'
                }`} />
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
                  result.isGoodRatio ? 'bg-green-500/10' : 'bg-yellow-500/10'
                }`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-400">RISK/REWARD RATIO</div>
                    {result.isGoodRatio ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                        GOOD RATIO
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/30">
                        LOW RATIO
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${
                      result.isGoodRatio ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      1:{result.rrRatio}
                    </div>
                    <p className="text-sm text-gray-400">
                      {result.isGoodRatio ? 'Excellent! Aim for 2:1 or better' : 'Consider adjusting TP/SL for better ratio'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk vs Reward */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black border border-red-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xs text-red-400 mb-1">RISK</div>
                    <div className="text-2xl font-bold text-red-400">{result.risk}</div>
                    <div className="text-xs text-gray-500 mt-1">Price distance</div>
                  </div>
                </div>

                <div className="bg-black border border-green-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xs text-green-400 mb-1">REWARD</div>
                    <div className="text-2xl font-bold text-green-400">{result.reward}</div>
                    <div className="text-xs text-gray-500 mt-1">Price distance</div>
                  </div>
                </div>
              </div>

              {/* Break-even Win Rate */}
              <div className="bg-black border border-purple-500/50 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="text-sm text-purple-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    BREAK-EVEN WIN RATE
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-bold text-purple-400">{result.breakEvenWinRate}%</span>
                    <span className="text-gray-400 mb-2">to break even</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    You need to win at least {result.breakEvenWinRate}% of trades with this R:R to break even
                  </p>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-black border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-cyan-400 mb-1">Pro Tip</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Professional traders aim for minimum 1:2 R:R ratio. This means even with 40% win rate, you'll be profitable.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-black border border-gray-800 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Enter trade parameters to calculate R:R ratio
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
