import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showDeleteConfirm, showToast } from '../../utils/sweetAlertConfig';

/**
 * Komponen TradingJournal - Full CRUD untuk trading journal
 * Data disimpan di localStorage
 */
export default function TradingJournal() {
  const [trades, setTrades] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [filter, setFilter] = useState('all'); // all, win, loss
  const [viewMode, setViewMode] = useState('table'); // table, card
  const [previewTrade, setPreviewTrade] = useState(null); // untuk preview modal

  // Load trades dari localStorage
  useEffect(() => {
    const savedTrades = localStorage.getItem('trading_journal');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  // Save trades ke localStorage
  const saveTrades = (newTrades) => {
    setTrades(newTrades);
    localStorage.setItem('trading_journal', JSON.stringify(newTrades));
  };

  // Add new trade
  const handleAddTrade = (tradeData) => {
    const newTrade = {
      id: Date.now(),
      ...tradeData,
      createdAt: new Date().toISOString()
    };
    saveTrades([newTrade, ...trades]);
    setIsFormOpen(false);
    showToast('success', 'Trade added successfully!');
  };

  // Update trade
  const handleUpdateTrade = (tradeData) => {
    const updatedTrades = trades.map(trade =>
      trade.id === editingTrade.id ? { ...trade, ...tradeData } : trade
    );
    saveTrades(updatedTrades);
    setEditingTrade(null);
    setIsFormOpen(false);
    showToast('success', 'Trade updated successfully!');
  };

  // Delete trade
  const handleDeleteTrade = async (id) => {
    const result = await showDeleteConfirm('this trade');
    if (result.isConfirmed) {
      saveTrades(trades.filter(trade => trade.id !== id));
      showToast('success', 'Trade deleted successfully!');
    }
  };

  // Calculate stats
  const stats = {
    total: trades.length,
    wins: trades.filter(t => t.result === 'win').length,
    losses: trades.filter(t => t.result === 'loss').length,
    winRate: trades.length > 0 
      ? ((trades.filter(t => t.result === 'win').length / trades.length) * 100).toFixed(1)
      : 0,
    totalPnL: trades.reduce((sum, t) => sum + (parseFloat(t.profitLoss) || 0), 0).toFixed(2)
  };

  // Filter trades
  const filteredTrades = trades.filter(trade => {
    if (filter === 'all') return true;
    return trade.result === filter;
  });

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Trades" value={stats.total} color="text-aksen-primer" />
        <StatCard label="Wins" value={stats.wins} color="text-green-400" />
        <StatCard label="Losses" value={stats.losses} color="text-red-400" />
        <StatCard label="Win Rate" value={`${stats.winRate}%`} color="text-aksen-sekunder" />
        <StatCard 
          label="Total P/L" 
          value={`$${stats.totalPnL}`} 
          color={parseFloat(stats.totalPnL) >= 0 ? 'text-green-400' : 'text-red-400'} 
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex gap-2">
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            label="All"
          />
          <FilterButton 
            active={filter === 'win'} 
            onClick={() => setFilter('win')}
            label="Wins"
          />
          <FilterButton 
            active={filter === 'loss'} 
            onClick={() => setFilter('loss')}
            label="Losses"
          />
        </div>

        <div className="flex gap-2">
          {/* View Toggle */}
          <div className="flex gap-1 bg-latar-sekunder border-2 border-latar-tersier rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`
                px-3 py-1.5 rounded-md transition-all duration-300
                ${viewMode === 'table' 
                  ? 'bg-cyan-400 text-latar-utama shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                  : 'text-teks-sekunder hover:text-cyan-400'
                }
              `}
              title="Table View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`
                px-3 py-1.5 rounded-md transition-all duration-300
                ${viewMode === 'card' 
                  ? 'bg-cyan-400 text-latar-utama shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                  : 'text-teks-sekunder hover:text-cyan-400'
                }
              `}
              title="Card View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              setEditingTrade(null);
              setIsFormOpen(true);
            }}
            className="
              px-4 py-2 rounded-lg
              bg-cyan-400 text-latar-utama
              font-medium
              hover:bg-cyan-300
              shadow-[0_0_15px_rgba(0,212,255,0.5)]
              hover:shadow-[0_0_25px_rgba(0,212,255,0.7)]
              transition-all duration-300
              flex items-center gap-2
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Trade
          </button>
        </div>
      </div>

      {/* Trade List */}
      {filteredTrades.length === 0 ? (
        <EmptyState onAddClick={() => setIsFormOpen(true)} />
      ) : viewMode === 'table' ? (
        <TradeTable
          trades={filteredTrades}
          onPreview={(trade) => setPreviewTrade(trade)}
          onEdit={(trade) => {
            setEditingTrade(trade);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteTrade}
        />
      ) : (
        <div className="space-y-4">
          {filteredTrades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onEdit={() => {
                setEditingTrade(trade);
                setIsFormOpen(true);
              }}
              onDelete={() => handleDeleteTrade(trade.id)}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <TradeFormModal
            trade={editingTrade}
            onClose={() => {
              setIsFormOpen(false);
              setEditingTrade(null);
            }}
            onSubmit={editingTrade ? handleUpdateTrade : handleAddTrade}
          />
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTrade && (
          <TradePreviewModal
            trade={previewTrade}
            onClose={() => setPreviewTrade(null)}
            onEdit={() => {
              setEditingTrade(previewTrade);
              setPreviewTrade(null);
              setIsFormOpen(true);
            }}
            onDelete={() => {
              handleDeleteTrade(previewTrade.id);
              setPreviewTrade(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, color }) {
  return (
    <div className="bg-latar-sekunder border-2 border-cyan-400/30 rounded-lg p-4 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300">
      <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-teks-sekunder text-sm">{label}</div>
    </div>
  );
}

// Trade Table Component (Compact View)
function TradeTable({ trades, onPreview, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-cyan-400/30">
            <th className="text-left py-3 px-4 text-cyan-400 font-medium text-sm">Pair</th>
            <th className="text-left py-3 px-4 text-cyan-400 font-medium text-sm">Date</th>
            <th className="text-center py-3 px-4 text-cyan-400 font-medium text-sm">Direction</th>
            <th className="text-right py-3 px-4 text-cyan-400 font-medium text-sm">Entry</th>
            <th className="text-right py-3 px-4 text-cyan-400 font-medium text-sm">SL</th>
            <th className="text-right py-3 px-4 text-cyan-400 font-medium text-sm">TP</th>
            <th className="text-center py-3 px-4 text-cyan-400 font-medium text-sm">Result</th>
            <th className="text-right py-3 px-4 text-cyan-400 font-medium text-sm">P/L</th>
            <th className="text-center py-3 px-4 text-cyan-400 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <TradeRow key={trade.id} trade={trade} onPreview={onPreview} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Trade Row Component
function TradeRow({ trade, onPreview, onEdit, onDelete }) {
  const resultColors = {
    win: 'text-green-400',
    loss: 'text-red-400',
    breakeven: 'text-yellow-400'
  };

  return (
    <tr className="border-b border-latar-tersier hover:bg-cyan-400/5 transition-colors">
      <td className="py-3 px-4">
        <span className="text-teks-utama font-medium">{trade.pair}</span>
      </td>
      <td className="py-3 px-4">
        <span className="text-teks-sekunder text-sm">
          {new Date(trade.datetime).toLocaleDateString()}
        </span>
      </td>
      <td className="py-3 px-4 text-center">
        <span className={`
          px-2 py-1 rounded text-xs font-medium
          ${trade.direction === 'long' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}
        `}>
          {trade.direction.toUpperCase()}
        </span>
      </td>
      <td className="py-3 px-4 text-right text-teks-utama">{trade.entry}</td>
      <td className="py-3 px-4 text-right text-teks-sekunder">{trade.stopLoss}</td>
      <td className="py-3 px-4 text-right text-teks-sekunder">{trade.takeProfit}</td>
      <td className="py-3 px-4 text-center">
        <span className={`px-2 py-1 rounded text-xs font-medium ${resultColors[trade.result]}`}>
          {trade.result.toUpperCase()}
        </span>
      </td>
      <td className={`py-3 px-4 text-right font-bold ${parseFloat(trade.profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        ${trade.profitLoss}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPreview(trade)}
            className="p-1.5 rounded hover:bg-cyan-400/20 text-cyan-400 transition-all"
            title="Preview"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(trade)}
            className="p-1.5 rounded hover:bg-cyan-400/20 text-cyan-400 transition-all"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(trade.id)}
            className="p-1.5 rounded hover:bg-red-400/20 text-red-400 transition-all"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

// Filter Button Component
function FilterButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-300
        ${active
          ? 'bg-cyan-400 text-latar-utama shadow-[0_0_10px_rgba(0,212,255,0.5)]'
          : 'border-2 border-cyan-400/30 text-teks-sekunder hover:border-cyan-400 hover:text-cyan-400'
        }
      `}
    >
      {label}
    </button>
  );
}

// Empty State Component
function EmptyState({ onAddClick }) {
  return (
    <div className="
      bg-latar-sekunder border-2 border-latar-tersier
      rounded-xl p-12 text-center
    ">
      <svg className="w-20 h-20 mx-auto mb-4 text-teks-sekunder" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="text-xl font-judul font-bold text-teks-utama mb-2">
        No Trades Yet
      </h3>
      <p className="text-teks-sekunder mb-6">
        Start tracking your trades to analyze your performance
      </p>
      <button
        onClick={onAddClick}
        className="
          px-6 py-3 rounded-lg
          bg-cyan-400 text-latar-utama
          font-medium
          hover:bg-cyan-300
          shadow-[0_0_15px_rgba(0,212,255,0.5)]
          hover:shadow-[0_0_25px_rgba(0,212,255,0.7)]
          transition-all duration-300
        "
      >
        Add Your First Trade
      </button>
    </div>
  );
}

// Trade Card Component
function TradeCard({ trade, onEdit, onDelete }) {
  const resultColors = {
    win: 'text-green-400 bg-green-400/10 border-green-400/30',
    loss: 'text-red-400 bg-red-400/10 border-red-400/30',
    breakeven: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="
        bg-latar-sekunder border-2 border-latar-tersier
        rounded-xl p-6
        hover:border-aksen-primer/30
        transition-all duration-300
      "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-judul font-bold text-teks-utama">
              {trade.pair}
            </h3>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium border
              ${trade.direction === 'long' ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-red-400 bg-red-400/10 border-red-400/30'}
            `}>
              {trade.direction.toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${resultColors[trade.result]}`}>
              {trade.result.toUpperCase()}
            </span>
          </div>
          <p className="text-teks-sekunder text-sm">
            {new Date(trade.datetime).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg border-2 border-latar-tersier text-aksen-primer hover:border-aksen-primer transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg border-2 border-latar-tersier text-red-400 hover:border-red-400 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <InfoItem label="Entry" value={trade.entry} />
        <InfoItem label="SL" value={trade.stopLoss} />
        <InfoItem label="TP" value={trade.takeProfit} />
        <InfoItem label="Size" value={trade.positionSize} />
      </div>

      {trade.reason && (
        <div className="mb-4">
          <p className="text-teks-sekunder text-sm mb-1">Reason:</p>
          <p className="text-teks-utama">{trade.reason}</p>
        </div>
      )}

      {trade.notes && (
        <div className="mb-4">
          <p className="text-teks-sekunder text-sm mb-1">Notes:</p>
          <p className="text-teks-utama">{trade.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-latar-tersier">
        <span className="text-teks-sekunder text-sm">P/L:</span>
        <span className={`text-xl font-bold ${parseFloat(trade.profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          ${trade.profitLoss}
        </span>
      </div>
    </motion.div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-teks-sekunder text-xs mb-1">{label}</p>
      <p className="text-teks-utama font-medium">{value}</p>
    </div>
  );
}

// Trade Preview Modal Component
function TradePreviewModal({ trade, onClose, onEdit, onDelete }) {
  const resultColors = {
    win: 'text-green-400 bg-green-400/10 border-green-400/30',
    loss: 'text-red-400 bg-red-400/10 border-red-400/30',
    breakeven: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-latar-sekunder border-2 border-cyan-400/30
          rounded-xl p-8 max-w-2xl w-full
          max-h-[90vh] overflow-y-auto
          shadow-[0_0_30px_rgba(0,212,255,0.3)]
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-judul font-bold text-cyan-400">
                {trade.pair}
              </h2>
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium border
                ${trade.direction === 'long' ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-red-400 bg-red-400/10 border-red-400/30'}
              `}>
                {trade.direction.toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${resultColors[trade.result]}`}>
                {trade.result.toUpperCase()}
              </span>
            </div>
            <p className="text-teks-sekunder">
              {new Date(trade.datetime).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border-2 border-latar-tersier text-teks-sekunder hover:border-cyan-400 hover:text-cyan-400 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-latar-utama border-2 border-cyan-400/20 rounded-lg p-4">
            <p className="text-teks-sekunder text-xs mb-1">Entry Price</p>
            <p className="text-cyan-400 text-xl font-bold">{trade.entry}</p>
          </div>
          <div className="bg-latar-utama border-2 border-red-400/20 rounded-lg p-4">
            <p className="text-teks-sekunder text-xs mb-1">Stop Loss</p>
            <p className="text-red-400 text-xl font-bold">{trade.stopLoss}</p>
          </div>
          <div className="bg-latar-utama border-2 border-green-400/20 rounded-lg p-4">
            <p className="text-teks-sekunder text-xs mb-1">Take Profit</p>
            <p className="text-green-400 text-xl font-bold">{trade.takeProfit}</p>
          </div>
          <div className="bg-latar-utama border-2 border-cyan-400/20 rounded-lg p-4">
            <p className="text-teks-sekunder text-xs mb-1">Position Size</p>
            <p className="text-cyan-400 text-xl font-bold">{trade.positionSize}</p>
          </div>
        </div>

        {/* Reason */}
        {trade.reason && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-cyan-400 font-medium">Reason for Entry</h3>
            </div>
            <div className="bg-latar-utama border-2 border-latar-tersier rounded-lg p-4">
              <p className="text-teks-utama leading-relaxed">{trade.reason}</p>
            </div>
          </div>
        )}

        {/* Notes */}
        {trade.notes && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 className="text-cyan-400 font-medium">Additional Notes</h3>
            </div>
            <div className="bg-latar-utama border-2 border-latar-tersier rounded-lg p-4">
              <p className="text-teks-utama leading-relaxed">{trade.notes}</p>
            </div>
          </div>
        )}

        {/* P/L */}
        <div className="bg-latar-utama border-2 border-cyan-400/30 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-teks-sekunder text-lg">Profit / Loss</span>
            </div>
            <span className={`text-3xl font-bold ${parseFloat(trade.profitLoss) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(trade.profitLoss) >= 0 ? '+' : ''}${trade.profitLoss}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="
              flex-1 px-6 py-3 rounded-lg
              bg-cyan-400 text-latar-utama
              font-medium
              hover:bg-cyan-300
              shadow-[0_0_15px_rgba(0,212,255,0.5)]
              hover:shadow-[0_0_25px_rgba(0,212,255,0.7)]
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Trade
          </button>
          <button
            onClick={onDelete}
            className="
              px-6 py-3 rounded-lg
              border-2 border-red-400/30 text-red-400
              font-medium
              hover:border-red-400 hover:bg-red-400/10
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Trade
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Trade Form Modal Component
function TradeFormModal({ trade, onClose, onSubmit }) {
  const [formData, setFormData] = useState(trade || {
    pair: '',
    datetime: new Date().toISOString().slice(0, 16),
    direction: 'long',
    entry: '',
    stopLoss: '',
    takeProfit: '',
    positionSize: '',
    reason: '',
    result: 'win',
    profitLoss: '0',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-latar-sekunder border-2 border-latar-tersier
          rounded-xl p-8 max-w-2xl w-full
          max-h-[90vh] overflow-y-auto
        "
      >
        <h2 className="text-2xl font-judul font-bold text-teks-utama mb-6">
          {trade ? 'Edit Trade' : 'Add New Trade'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Pair"
              value={formData.pair}
              onChange={(e) => setFormData({...formData, pair: e.target.value})}
              placeholder="EUR/USD, BTC/USD, etc"
              required
            />
            <FormInput
              label="Date & Time"
              type="datetime-local"
              value={formData.datetime}
              onChange={(e) => setFormData({...formData, datetime: e.target.value})}
              required
            />
          </div>

          <FormSelect
            label="Direction"
            value={formData.direction}
            onChange={(e) => setFormData({...formData, direction: e.target.value})}
            options={[
              { value: 'long', label: 'Long (Buy)' },
              { value: 'short', label: 'Short (Sell)' }
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Entry Price"
              type="number"
              step="0.00001"
              value={formData.entry}
              onChange={(e) => setFormData({...formData, entry: e.target.value})}
              required
            />
            <FormInput
              label="Stop Loss"
              type="number"
              step="0.00001"
              value={formData.stopLoss}
              onChange={(e) => setFormData({...formData, stopLoss: e.target.value})}
              required
            />
            <FormInput
              label="Take Profit"
              type="number"
              step="0.00001"
              value={formData.takeProfit}
              onChange={(e) => setFormData({...formData, takeProfit: e.target.value})}
              required
            />
          </div>

          <FormInput
            label="Position Size"
            value={formData.positionSize}
            onChange={(e) => setFormData({...formData, positionSize: e.target.value})}
            placeholder="0.01 lot, $100, etc"
            required
          />

          <FormTextarea
            label="Reason for Entry"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="Why did you take this trade?"
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Result"
              value={formData.result}
              onChange={(e) => setFormData({...formData, result: e.target.value})}
              options={[
                { value: 'win', label: 'Win' },
                { value: 'loss', label: 'Loss' },
                { value: 'breakeven', label: 'Breakeven' }
              ]}
            />
            <FormInput
              label="Profit/Loss ($)"
              type="number"
              step="0.01"
              value={formData.profitLoss}
              onChange={(e) => setFormData({...formData, profitLoss: e.target.value})}
              required
            />
          </div>

          <FormTextarea
            label="Additional Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Any additional observations or lessons learned"
            rows={3}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="
                flex-1 px-6 py-3 rounded-lg
                bg-cyan-400 text-latar-utama
                font-medium
                hover:bg-cyan-300
                shadow-[0_0_15px_rgba(0,212,255,0.5)]
                hover:shadow-[0_0_25px_rgba(0,212,255,0.7)]
                transition-all duration-300
              "
            >
              {trade ? 'Update Trade' : 'Add Trade'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="
                px-6 py-3 rounded-lg
                border-2 border-cyan-400/30 text-cyan-400
                font-medium
                hover:border-cyan-400 hover:bg-cyan-400/10
                transition-all duration-300
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-teks-utama font-medium mb-2 text-sm">
        {label}
      </label>
      <input
        {...props}
        className="
          w-full px-4 py-2 rounded-lg
          bg-latar-utama border-2 border-cyan-400/30
          text-teks-utama placeholder-teks-sekunder
          focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]
          transition-all duration-300
        "
      />
    </div>
  );
}

function FormSelect({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-teks-utama font-medium mb-2 text-sm">
        {label}
      </label>
      <select
        {...props}
        className="
          w-full px-4 py-2 rounded-lg
          bg-latar-utama border-2 border-cyan-400/30
          text-teks-utama
          focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]
          transition-all duration-300
        "
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-teks-utama font-medium mb-2 text-sm">
        {label}
      </label>
      <textarea
        {...props}
        className="
          w-full px-4 py-2 rounded-lg
          bg-latar-utama border-2 border-cyan-400/30
          text-teks-utama placeholder-teks-sekunder
          focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]
          transition-all duration-300
          resize-none
        "
      />
    </div>
  );
}
