import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * ProfitCalculator - Kalkulator untuk menghitung ukuran posisi optimal
 * Berdasarkan account size, risk percentage, dan stop loss
 * DARK FUTURISTIC VERSION
 */
export default function ProfitCalculator() {
  const [accountSize, setAccountSize] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('');
  const [stopLossPips, setStopLossPips] = useState('');
  const [pipValue, setPipValue] = useState('10');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const account = parseFloat(accountSize);
    const risk = parseFloat(riskPercentage);
    const sl = parseFloat(stopLossPips);
    const pv = parseFloat(pipValue);

    if (!account || !risk || !sl || !pv) {
      alert('Please fill all fields');
      return;
    }

    const riskAmount = (account * risk) / 100;
    const positionSize = riskAmount / (sl * pv);
    const lots = positionSize.toFixed(2);
    const contractSize = lots * 100000; // Standard lot = 100,000 units

    setResult({
      riskAmount: riskAmount.toFixed(2),
      positionSize: lots,
      maxLoss: riskAmount.toFixed(2),
      contractSize: contractSize.toLocaleString(),
      riskPerTrade: risk,
    });
  };

  const reset = () => {
    setAccountSize('');
    setRiskPercentage('');
    setStopLossPips('');
    setPipValue('10');
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Position Size Calculator</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Calculate the optimal position size based on your account balance, risk tolerance, and stop loss distance. 
                Proper position sizing is crucial for risk management and long-term profitability.
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
          {/* Animated Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-50" />
          
          <div className="relative z-10 space-y-5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Input Parameters
            </h3>

            {/* Account Size */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Account Balance ($)
              </label>
              <input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Risk Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Risk Per Trade (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  placeholder="1"
                  step="0.1"
                  max="5"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  Recommended: 1-2%
                </span>
              </div>
            </div>

            {/* Stop Loss */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Stop Loss Distance (Pips)
              </label>
              <input
                type="number"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(e.target.value)}
                placeholder="50"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Pip Value */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Lot Type
              </label>
              <select
                value={pipValue}
                onChange={(e) => setPipValue(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              >
                <option value="0.1">Micro Lot ($0.1/pip)</option>
                <option value="1">Mini Lot ($1/pip)</option>
                <option value="10">Standard Lot ($10/pip)</option>
              </select>
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
              {/* Main Result Card */}
              <div className="bg-black border border-cyan-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="text-sm text-cyan-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    OPTIMAL POSITION SIZE
                  </div>
                  <div className="text-6xl font-bold text-white mb-2">
                    {result.positionSize}
                  </div>
                  <div className="text-2xl text-gray-400">lots</div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="text-sm text-gray-500 mb-1">Contract Size</div>
                    <div className="text-xl font-bold text-gray-300">{result.contractSize} units</div>
                  </div>
                </div>
              </div>

              {/* Risk Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black border border-red-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xs text-red-400 mb-1">MAX RISK</div>
                    <div className="text-2xl font-bold text-red-400">${result.maxLoss}</div>
                    <div className="text-xs text-gray-500 mt-1">{result.riskPerTrade}% of account</div>
                  </div>
                </div>

                <div className="bg-black border border-green-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xs text-green-400 mb-1">RISK AMOUNT</div>
                    <div className="text-2xl font-bold text-green-400">${result.riskAmount}</div>
                    <div className="text-xs text-gray-500 mt-1">Per trade</div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-black border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-purple-400 mb-1">Pro Tip</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Never risk more than 1-2% of your account on a single trade. This position size ensures you can survive a series of losses while staying in the game.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-black border border-gray-800 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Enter your parameters to calculate optimal position size
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

