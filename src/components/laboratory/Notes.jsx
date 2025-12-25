import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showDeleteConfirm, showSuccess, showError, showToast, showConfirm } from '../../utils/sweetAlertConfig';

/**
 * Komponen Notes - Sistem catatan dengan CRUD, categories, priority, dan pin
 * Data disimpan di localStorage
 */
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, priority, alphabetical
  const [showArchived, setShowArchived] = useState(false);
  const [detailNote, setDetailNote] = useState(null);

  // Load notes dari localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('laboratory_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes ke localStorage
  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('laboratory_notes', JSON.stringify(newNotes));
  };

  // Add new note
  const handleAddNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isArchived: false
    };
    saveNotes([newNote, ...notes]);
    setIsFormOpen(false);
    showToast('success', 'Note created successfully!');
  };

  // Update note
  const handleUpdateNote = (noteData) => {
    const updatedNotes = notes.map(note =>
      note.id === editingNote.id 
        ? { ...note, ...noteData, updatedAt: new Date().toISOString() } 
        : note
    );
    saveNotes(updatedNotes);
    setEditingNote(null);
    setIsFormOpen(false);
    showToast('success', 'Note updated successfully!');
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    const result = await showDeleteConfirm('this note');
    if (result.isConfirmed) {
      saveNotes(notes.filter(note => note.id !== id));
      if (detailNote?.id === id) setDetailNote(null);
      showToast('success', 'Note deleted successfully!');
    }
  };

  // Toggle pin
  const handleTogglePin = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    saveNotes(updatedNotes);
    const note = updatedNotes.find(n => n.id === id);
    showToast('success', note.isPinned ? 'Note pinned!' : 'Note unpinned!');
  };

  // Toggle archive
  const handleToggleArchive = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isArchived: !note.isArchived } : note
    );
    saveNotes(updatedNotes);
    const note = updatedNotes.find(n => n.id === id);
    showToast('success', note.isArchived ? 'Note archived!' : 'Note restored!');
  };

  // Duplicate note
  const handleDuplicateNote = (note) => {
    const duplicatedNote = {
      ...note,
      id: Date.now(),
      title: `${note.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false
    };
    saveNotes([duplicatedNote, ...notes]);
    showToast('success', 'Note duplicated!');
  };

  // Export notes
  const handleExportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Notes exported successfully!');
  };

  // Import notes
  const handleImportNotes = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedNotes = JSON.parse(e.target.result);
          const result = await showConfirm(
            'Import Notes',
            `Import ${importedNotes.length} notes? This will merge with existing notes.`,
            'Yes, import!',
            'Cancel'
          );
          if (result.isConfirmed) {
            saveNotes([...importedNotes, ...notes]);
            showSuccess('Success!', `${importedNotes.length} notes imported successfully!`);
          }
        } catch (error) {
          showError('Invalid File', 'The selected file is not a valid JSON format.');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  // Filter and sort notes
  const getFilteredAndSortedNotes = () => {
    let filtered = notes.filter(note => {
      // Filter archived
      if (!showArchived && note.isArchived) return false;
      if (showArchived && !note.isArchived) return false;

      // Filter category
      if (filterCategory !== 'all' && note.category !== filterCategory) return false;

      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
        );
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      // Pinned notes always on top
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      if (sortBy === 'date') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  };

  const filteredNotes = getFilteredAndSortedNotes();

  // Stats
  const stats = {
    total: notes.filter(n => !n.isArchived).length,
    pinned: notes.filter(n => n.isPinned && !n.isArchived).length,
    archived: notes.filter(n => n.isArchived).length,
    byCategory: {
      trading: notes.filter(n => n.category === 'trading' && !n.isArchived).length,
      learning: notes.filter(n => n.category === 'learning' && !n.isArchived).length,
      personal: notes.filter(n => n.category === 'personal' && !n.isArchived).length,
      code: notes.filter(n => n.category === 'code' && !n.isArchived).length,
      research: notes.filter(n => n.category === 'research' && !n.isArchived).length,
      other: notes.filter(n => n.category === 'other' && !n.isArchived).length
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Notes" value={stats.total} color="text-cyan-400" />
        <StatCard label="Pinned" value={stats.pinned} color="text-purple-400" />
        <StatCard label="Archived" value={stats.archived} color="text-teks-sekunder" />
        <StatCard 
          label="Categories" 
          value={Object.values(stats.byCategory).filter(v => v > 0).length} 
          color="text-green-400" 
        />
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        {/* Search and Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 rounded-lg
                  bg-latar-sekunder border-2 border-cyan-400/30
                  text-teks-utama placeholder-teks-sekunder
                  focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]
                  transition-all duration-300
                "
              />
              <svg className="w-5 h-5 text-teks-sekunder absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingNote(null);
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
            Add Note
          </button>
        </div>

        {/* Filters and View Options */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="
                px-3 py-2 rounded-lg
                bg-latar-sekunder border-2 border-cyan-400/30
                text-teks-utama text-sm
                focus:border-cyan-400 focus:outline-none
                transition-all duration-300
              "
            >
              <option value="all">All Categories</option>
              <option value="trading">Trading Ideas</option>
              <option value="learning">Learning</option>
              <option value="personal">Personal</option>
              <option value="code">Code Snippets</option>
              <option value="research">Research</option>
              <option value="other">Other</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                px-3 py-2 rounded-lg
                bg-latar-sekunder border-2 border-cyan-400/30
                text-teks-utama text-sm
                focus:border-cyan-400 focus:outline-none
                transition-all duration-300
              "
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="alphabetical">Sort A-Z</option>
            </select>

            {/* Show Archived Toggle */}
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-300
                ${showArchived
                  ? 'bg-cyan-400 text-latar-utama shadow-[0_0_10px_rgba(0,212,255,0.5)]'
                  : 'border-2 border-cyan-400/30 text-teks-sekunder hover:border-cyan-400 hover:text-cyan-400'
                }
              `}
            >
              {showArchived ? 'Show Active' : 'Show Archived'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Export/Import */}
            <button
              onClick={handleExportNotes}
              className="p-2 rounded-lg border-2 border-cyan-400/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
              title="Export Notes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <label className="p-2 rounded-lg border-2 border-cyan-400/30 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all cursor-pointer" title="Import Notes">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <input type="file" accept=".json" onChange={handleImportNotes} className="hidden" />
            </label>

            {/* View Toggle */}
            <div className="flex gap-1 bg-latar-sekunder border-2 border-latar-tersier rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  px-3 py-1.5 rounded-md transition-all duration-300
                  ${viewMode === 'grid' 
                    ? 'bg-cyan-400 text-latar-utama shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                    : 'text-teks-sekunder hover:text-cyan-400'
                  }
                `}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`
                  px-3 py-1.5 rounded-md transition-all duration-300
                  ${viewMode === 'list' 
                    ? 'bg-cyan-400 text-latar-utama shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                    : 'text-teks-sekunder hover:text-cyan-400'
                  }
                `}
                title="List View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <EmptyState 
          onAddClick={() => setIsFormOpen(true)} 
          isArchived={showArchived}
          hasSearch={searchQuery.length > 0}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => setDetailNote(note)}
              onEdit={() => {
                setEditingNote(note);
                setIsFormOpen(true);
              }}
              onDelete={() => handleDeleteNote(note.id)}
              onTogglePin={() => handleTogglePin(note.id)}
              onToggleArchive={() => handleToggleArchive(note.id)}
              onDuplicate={() => handleDuplicateNote(note)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              onClick={() => setDetailNote(note)}
              onEdit={() => {
                setEditingNote(note);
                setIsFormOpen(true);
              }}
              onDelete={() => handleDeleteNote(note.id)}
              onTogglePin={() => handleTogglePin(note.id)}
              onToggleArchive={() => handleToggleArchive(note.id)}
              onDuplicate={() => handleDuplicateNote(note)}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <NoteFormModal
            note={editingNote}
            onClose={() => {
              setIsFormOpen(false);
              setEditingNote(null);
            }}
            onSubmit={editingNote ? handleUpdateNote : handleAddNote}
          />
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailNote && (
          <NoteDetailModal
            note={detailNote}
            onClose={() => setDetailNote(null)}
            onEdit={() => {
              setEditingNote(detailNote);
              setDetailNote(null);
              setIsFormOpen(true);
            }}
            onDelete={() => handleDeleteNote(detailNote.id)}
            onTogglePin={() => {
              handleTogglePin(detailNote.id);
              setDetailNote(notes.find(n => n.id === detailNote.id));
            }}
            onToggleArchive={() => {
              handleToggleArchive(detailNote.id);
              setDetailNote(null);
            }}
            onDuplicate={() => {
              handleDuplicateNote(detailNote);
              setDetailNote(null);
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

// Category colors and labels
const CATEGORIES = {
  trading: { label: 'Trading Ideas', color: 'cyan-400', bgColor: 'cyan-400/10' },
  learning: { label: 'Learning', color: 'purple-400', bgColor: 'purple-400/10' },
  personal: { label: 'Personal', color: 'green-400', bgColor: 'green-400/10' },
  code: { label: 'Code Snippets', color: 'yellow-400', bgColor: 'yellow-400/10' },
  research: { label: 'Research', color: 'pink-400', bgColor: 'pink-400/10' },
  other: { label: 'Other', color: 'gray-400', bgColor: 'gray-400/10' }
};

const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'text-red-400', bgColor: 'bg-red-400/20', borderColor: 'border-red-400/30' },
  medium: { label: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20', borderColor: 'border-yellow-400/30' },
  low: { label: 'Low', color: 'text-green-400', bgColor: 'bg-green-400/20', borderColor: 'border-green-400/30' }
};

// Note Card Component (Grid View)
function NoteCard({ note, onClick, onEdit, onDelete, onTogglePin, onToggleArchive, onDuplicate }) {
  const category = CATEGORIES[note.category];
  const priority = PRIORITY_CONFIG[note.priority];
  const preview = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        bg-latar-sekunder border-2 rounded-xl p-5
        hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
        transition-all duration-300 cursor-pointer
        ${note.isPinned 
          ? `border-${category.color} shadow-[0_0_15px_rgba(0,212,255,0.3)]` 
          : 'border-latar-tersier'
        }
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {note.isPinned && (
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 12V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
              </svg>
            )}
            <span className={`text-xs px-2 py-1 rounded-full bg-${category.bgColor} text-${category.color} border border-${category.color}/30`}>
              {category.label}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${priority.bgColor} ${priority.color} border ${priority.borderColor}`}>
              {priority.label}
            </span>
          </div>
          <h3 className="text-lg font-judul font-bold text-teks-utama line-clamp-2">
            {note.title}
          </h3>
        </div>
      </div>

      {/* Content Preview */}
      <p className="text-teks-sekunder text-sm mb-4 line-clamp-3 whitespace-pre-wrap">
        {preview}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-latar-tersier">
        <span className="text-xs text-teks-sekunder">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <ActionButton onClick={onTogglePin} title={note.isPinned ? 'Unpin' : 'Pin'}>
            <svg className="w-4 h-4" fill={note.isPinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onEdit} title="Edit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onDuplicate} title="Duplicate">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onToggleArchive} title={note.isArchived ? 'Unarchive' : 'Archive'}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onDelete} title="Delete" danger>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </ActionButton>
        </div>
      </div>
    </motion.div>
  );
}

// Note List Item Component (List View)
function NoteListItem({ note, onClick, onEdit, onDelete, onTogglePin, onToggleArchive, onDuplicate }) {
  const category = CATEGORIES[note.category];
  const priority = PRIORITY_CONFIG[note.priority];
  const preview = note.content.substring(0, 80) + (note.content.length > 80 ? '...' : '');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`
        bg-latar-sekunder border-2 rounded-lg p-4
        hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]
        transition-all duration-300 cursor-pointer
        ${note.isPinned ? 'border-cyan-400/50' : 'border-latar-tersier'}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Pin Indicator */}
        <div className="flex-shrink-0">
          {note.isPinned && (
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 12V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-judul font-bold text-teks-utama truncate">
              {note.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-${category.bgColor} text-${category.color} border border-${category.color}/30 flex-shrink-0`}>
              {category.label}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${priority.bgColor} ${priority.color} border ${priority.borderColor} flex-shrink-0`}>
              {priority.label}
            </span>
          </div>
          <p className="text-teks-sekunder text-sm truncate">{preview}</p>
        </div>

        {/* Date */}
        <div className="flex-shrink-0 text-xs text-teks-sekunder">
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <ActionButton onClick={onTogglePin} title={note.isPinned ? 'Unpin' : 'Pin'}>
            <svg className="w-4 h-4" fill={note.isPinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onEdit} title="Edit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onDuplicate} title="Duplicate">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onToggleArchive} title={note.isArchived ? 'Unarchive' : 'Archive'}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </ActionButton>
          <ActionButton onClick={onDelete} title="Delete" danger>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </ActionButton>
        </div>
      </div>
    </motion.div>
  );
}

// Action Button Component
function ActionButton({ onClick, title, danger, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-1.5 rounded transition-all
        ${danger 
          ? 'hover:bg-red-400/20 text-red-400' 
          : 'hover:bg-cyan-400/20 text-cyan-400'
        }
      `}
    >
      {children}
    </button>
  );
}

// Empty State Component
function EmptyState({ onAddClick, isArchived, hasSearch }) {
  return (
    <div className="bg-latar-sekunder border-2 border-latar-tersier rounded-xl p-12 text-center">
      <svg className="w-20 h-20 mx-auto mb-4 text-teks-sekunder" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="text-xl font-judul font-bold text-teks-utama mb-2">
        {hasSearch ? 'No Notes Found' : isArchived ? 'No Archived Notes' : 'No Notes Yet'}
      </h3>
      <p className="text-teks-sekunder mb-6">
        {hasSearch 
          ? 'Try adjusting your search or filters' 
          : isArchived 
            ? 'Archive notes to see them here'
            : 'Start creating notes to organize your thoughts'
        }
      </p>
      {!hasSearch && !isArchived && (
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
          Create Your First Note
        </button>
      )}
    </div>
  );
}

// Note Detail Modal Component
function NoteDetailModal({ note, onClose, onEdit, onDelete, onTogglePin, onToggleArchive, onDuplicate }) {
  const category = CATEGORIES[note.category];
  const priority = PRIORITY_CONFIG[note.priority];

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
          rounded-xl p-8 max-w-3xl w-full
          max-h-[90vh] overflow-y-auto
          shadow-[0_0_30px_rgba(0,212,255,0.3)]
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {note.isPinned && (
                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 12V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
                </svg>
              )}
              <span className={`text-sm px-3 py-1 rounded-full bg-${category.bgColor} text-${category.color} border border-${category.color}/30`}>
                {category.label}
              </span>
              <span className={`text-sm px-3 py-1 rounded-full ${priority.bgColor} ${priority.color} border ${priority.borderColor}`}>
                {priority.label}
              </span>
              {note.isArchived && (
                <span className="text-sm px-3 py-1 rounded-full bg-gray-400/20 text-gray-400 border border-gray-400/30">
                  Archived
                </span>
              )}
            </div>
            <h2 className="text-3xl font-judul font-bold text-cyan-400 mb-2">
              {note.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-teks-sekunder">
              <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
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

        {/* Content */}
        <div className="bg-latar-utama border-2 border-latar-tersier rounded-lg p-6 mb-6">
          <p className="text-teks-utama leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>
        </div>

        {/* Character Count */}
        <div className="text-sm text-teks-sekunder mb-6">
          {note.content.length} characters
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
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
            Edit
          </button>
          <button
            onClick={onTogglePin}
            className="
              px-6 py-3 rounded-lg
              border-2 border-cyan-400/30 text-cyan-400
              font-medium
              hover:border-cyan-400 hover:bg-cyan-400/10
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-5 h-5" fill={note.isPinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {note.isPinned ? 'Unpin' : 'Pin'}
          </button>
          <button
            onClick={onDuplicate}
            className="
              px-6 py-3 rounded-lg
              border-2 border-cyan-400/30 text-cyan-400
              font-medium
              hover:border-cyan-400 hover:bg-cyan-400/10
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Duplicate
          </button>
          <button
            onClick={onToggleArchive}
            className="
              px-6 py-3 rounded-lg
              border-2 border-yellow-400/30 text-yellow-400
              font-medium
              hover:border-yellow-400 hover:bg-yellow-400/10
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            {note.isArchived ? 'Unarchive' : 'Archive'}
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
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Note Form Modal Component
function NoteFormModal({ note, onClose, onSubmit }) {
  const [formData, setFormData] = useState(note || {
    title: '',
    category: 'other',
    priority: 'medium',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showError('Validation Error', 'Title and content are required!');
      return;
    }
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
          {note ? 'Edit Note' : 'Create New Note'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Enter note title..."
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              options={[
                { value: 'trading', label: 'Trading Ideas' },
                { value: 'learning', label: 'Learning' },
                { value: 'personal', label: 'Personal' },
                { value: 'code', label: 'Code Snippets' },
                { value: 'research', label: 'Research' },
                { value: 'other', label: 'Other' }
              ]}
            />

            <FormSelect
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              options={[
                { value: 'high', label: 'High Priority' },
                { value: 'medium', label: 'Medium Priority' },
                { value: 'low', label: 'Low Priority' }
              ]}
            />
          </div>

          <div>
            <label className="block text-teks-utama font-medium mb-2 text-sm">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your note here..."
              rows={12}
              required
              className="
                w-full px-4 py-3 rounded-lg
                bg-latar-utama border-2 border-cyan-400/30
                text-teks-utama placeholder-teks-sekunder
                focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]
                transition-all duration-300
                resize-none
              "
            />
            <div className="text-sm text-teks-sekunder mt-1">
              {formData.content.length} characters
            </div>
          </div>

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
              {note ? 'Update Note' : 'Create Note'}
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
