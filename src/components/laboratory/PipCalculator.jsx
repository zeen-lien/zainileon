import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * PipCalculator - Kalkulator nilai pip dalam currency
 * Support berbagai currency pairs dan lot sizes
 * DARK FUTURISTIC VERSION
 */
export default function PipCalculator() {
  const [lotSize, setLotSize] = useState('1');
  const [pips, setPips] = useState('');
  const [currencyPair, setCurrencyPair] = useState('EURUSD');
  const [result, setResult] = useState(null);

  // Pip values untuk standard lot (100,000 units)
  const pipValues = {
    'EURUSD': 10,
    'GBPUSD': 10,
    'USDJPY': 9.09, // Approximate
    'USDCHF': 10,
    'AUDUSD': 10,
    'NZDUSD': 10,
    'USDCAD': 7.69, // Approximate
  };

  const calculate = () => {
    const lot = parseFloat(lotSize);
    const pipCount = parseFloat(pips);

    if (!lot || !pipCount) {
      alert('Please fill all fields');
      return;
    }

    const basePipValue = pipValues[currencyPair] || 10;
    const value = lot * pipCount * basePipValue;

    setResult({
      value: value.toFixed(2),
      perPip: (lot * basePipValue).toFixed(2),
      lotSize: lot,
      pips: pipCount,
    });
  };

  const reset = () => {
    setLotSize('1');
    setPips('');
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Pip Calculator</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Calculate the monetary value of pips for different currency pairs and lot sizes. Essential for understanding your potential profit and loss.
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
              Calculation Parameters
            </h3>

            {/* Currency Pair */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Currency Pair
              </label>
              <select
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              >
                <option value="EURUSD">EUR/USD</option>
                <option value="GBPUSD">GBP/USD</option>
                <option value="USDJPY">USD/JPY</option>
                <option value="USDCHF">USD/CHF</option>
                <option value="AUDUSD">AUD/USD</option>
                <option value="NZDUSD">NZD/USD</option>
                <option value="USDCAD">USD/CAD</option>
              </select>
            </div>

            {/* Lot Size */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Lot Size
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['0.01', '0.1', '1', '10'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setLotSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      lotSize === size
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-black/50 border border-gray-700 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                placeholder="1.0"
                step="0.01"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Number of Pips */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Number of Pips
              </label>
              <input
                type="number"
                value={pips}
                onChange={(e) => setPips(e.target.value)}
                placeholder="50"
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
              {/* Total Value Card */}
              <div className="bg-black border border-cyan-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="text-sm text-cyan-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    TOTAL VALUE
                  </div>
                  <div className="text-6xl font-bold text-white mb-2">
                    ${result.value}
                  </div>
                  <div className="text-lg text-gray-400">
                    {result.pips} pips × {result.lotSize} lots
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black border border-green-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xs text-green-400 mb-1">VALUE PER PIP</div>
                    <div className="text-2xl font-bold text-green-400">${result.perPip}</div>
                    <div className="text-xs text-gray-500 mt-1">Per pip movement</div>
                  </div>
                </div>

                <div className="bg-black border border-purple-500/30 rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-xs text-purple-400 mb-1">CURRENCY PAIR</div>
                    <div className="text-2xl font-bold text-purple-400">{currencyPair}</div>
                    <div className="text-xs text-gray-500 mt-1">Selected pair</div>
                  </div>
                </div>
              </div>

              {/* Lot Size Info */}
              <div className="bg-black border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Lot Size</span>
                  <span className="text-lg font-bold text-blue-400">{result.lotSize} lots</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Contract Size</span>
                  <span className="text-lg font-bold text-blue-400">{(result.lotSize * 100000).toLocaleString()} units</span>
                </div>
              </div>

              {/* Info Tip */}
              <div className="bg-black border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-yellow-400 mb-1">Note</div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      This calculation is approximate. Actual pip values may vary based on current exchange rates and broker specifications.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-black border border-gray-800 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Enter parameters to calculate pip value
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
