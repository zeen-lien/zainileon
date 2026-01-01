import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

/**
 * TradingStats - Dashboard statistik trading journal
 * Menampilkan chart P&L, win rate, dan analytics lainnya
 */
function TradingStats({ daftarJurnal }) {
  // Hitung statistik
  const stats = useMemo(() => {
    if (!daftarJurnal || daftarJurnal.length === 0) {
      return {
        totalTrades: 0,
        winRate: 0,
        totalProfit: 0,
        avgProfit: 0,
        avgLoss: 0,
        profitFactor: 0,
        winTrades: 0,
        lossTrades: 0,
      };
    }

    const totalTrades = daftarJurnal.length;
    const winTrades = daftarJurnal.filter(j => j.hasil === 'profit').length;
    const lossTrades = daftarJurnal.filter(j => j.hasil === 'loss').length;
    const winRate = ((winTrades / totalTrades) * 100).toFixed(2);

    const totalProfit = daftarJurnal.reduce((sum, j) => {
      const profit = parseFloat(j.profit) || 0;
      return sum + profit;
    }, 0);

    const profits = daftarJurnal.filter(j => j.hasil === 'profit').map(j => parseFloat(j.profit) || 0);
    const losses = daftarJurnal.filter(j => j.hasil === 'loss').map(j => Math.abs(parseFloat(j.profit) || 0));

    const avgProfit = profits.length > 0 ? (profits.reduce((a, b) => a + b, 0) / profits.length).toFixed(2) : 0;
    const avgLoss = losses.length > 0 ? (losses.reduce((a, b) => a + b, 0) / losses.length).toFixed(2) : 0;

    const totalProfitAmount = profits.reduce((a, b) => a + b, 0);
    const totalLossAmount = losses.reduce((a, b) => a + b, 0);
    const profitFactor = totalLossAmount > 0 ? (totalProfitAmount / totalLossAmount).toFixed(2) : 0;

    return {
      totalTrades,
      winRate,
      totalProfit: totalProfit.toFixed(2),
      avgProfit,
      avgLoss,
      profitFactor,
      winTrades,
      lossTrades,
    };
  }, [daftarJurnal]);

  // Data untuk Equity Curve (P&L over time)
  const equityCurveData = useMemo(() => {
    let runningTotal = 0;
    return daftarJurnal.map((jurnal, index) => {
      runningTotal += parseFloat(jurnal.profit) || 0;
      return {
        trade: index + 1,
        equity: parseFloat(runningTotal.toFixed(2)),
        tanggal: jurnal.tanggal,
      };
    });
  }, [daftarJurnal]);

  // Data untuk Win/Loss Pie Chart
  const winLossData = [
    { name: 'Win', value: stats.winTrades, color: '#10b981' },
    { name: 'Loss', value: stats.lossTrades, color: '#ef4444' },
  ];

  // Data untuk Asset Distribution
  const assetDistribution = useMemo(() => {
    const distribution = {};
    daftarJurnal.forEach(j => {
      distribution[j.pair] = (distribution[j.pair] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }, [daftarJurnal]);

  if (daftarJurnal.length === 0) {
    return (
      <div className="text-center py-12 text-abu-terang">
        <p className="text-xl">Belum ada data trading untuk ditampilkan</p>
        <p className="text-sm mt-2">Mulai tambah jurnal trading untuk melihat statistik</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Trades" value={stats.totalTrades} color="cyan" />
        <StatCard label="Win Rate" value={`${stats.winRate}%`} color="hijau-mint" />
        <StatCard label="Total P&L" value={`$${stats.totalProfit}`} color={stats.totalProfit >= 0 ? 'hijau-mint' : 'merah'} />
        <StatCard label="Profit Factor" value={stats.profitFactor} color="ungu" />
      </div>

      {/* Equity Curve */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-abu-gelap p-6 rounded-xl border border-abu-sedang"
      >
        <h3 className="text-xl font-bold text-cyan mb-4">Equity Curve</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={equityCurveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="trade" stroke="#a0a0a0" />
            <YAxis stroke="#a0a0a0" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #00d4ff' }}
              labelStyle={{ color: '#00d4ff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="equity" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Win/Loss & Asset Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Win/Loss Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-abu-gelap p-6 rounded-xl border border-abu-sedang"
        >
          <h3 className="text-xl font-bold text-cyan mb-4">Win/Loss Ratio</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={winLossData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Asset Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-abu-gelap p-6 rounded-xl border border-abu-sedang"
        >
          <h3 className="text-xl font-bold text-cyan mb-4">Asset Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={assetDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#a0a0a0" />
              <YAxis stroke="#a0a0a0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #00d4ff' }}
              />
              <Bar dataKey="value" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Avg Win" value={`$${stats.avgProfit}`} color="hijau-mint" size="sm" />
        <StatCard label="Avg Loss" value={`$${stats.avgLoss}`} color="merah" size="sm" />
        <StatCard label="Win Trades" value={stats.winTrades} color="hijau-mint" size="sm" />
      </div>
    </div>
  );
}

/**
 * StatCard - Card untuk menampilkan single stat
 */
function StatCard({ label, value, color, size = 'md' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-abu-gelap p-4 rounded-xl border border-abu-sedang"
    >
      <p className={`text-abu-terang ${size === 'sm' ? 'text-xs' : 'text-sm'} mb-1`}>{label}</p>
      <p className={`font-bold text-${color} ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>{value}</p>
    </motion.div>
  );
}

export default TradingStats;
