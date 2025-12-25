# Notes System - Laboratory Feature

## Overview
The Notes system is a comprehensive note-taking and organization tool within the Laboratory. It provides full CRUD operations, categorization, priority management, and advanced features like pinning, archiving, search, and export/import.

## Features

### 1. **Full CRUD Operations**
- ✅ Create new notes
- ✅ Read/View notes (Grid and List view)
- ✅ Update existing notes
- ✅ Delete notes

### 2. **Note Properties**
Each note contains:
- **Title**: Main heading of the note
- **Category**: Trading Ideas, Learning, Personal, Code Snippets, Research, Other
- **Priority**: High, Medium, Low (with color coding)
- **Content**: Main text content (supports line breaks)
- **Timestamps**: Created and Last Modified dates
- **Status**: Pinned and Archived flags

### 3. **View Modes**
- **Grid View**: Card-based layout with preview (default)
- **List View**: Compact list with inline preview

### 4. **Organization Features**
- **Pin Notes**: Keep important notes at the top
- **Archive Notes**: Hide completed/old notes without deleting
- **Categories**: 6 predefined categories with color coding
- **Priority Levels**: Visual indicators for urgency

### 5. **Search & Filter**
- **Search**: Search by title or content
- **Category Filter**: Filter by specific category
- **Sort Options**: 
  - By Date (newest first)
  - By Priority (high to low)
  - Alphabetically (A-Z)
- **Archive Toggle**: Switch between active and archived notes

### 6. **Advanced Features**
- **Duplicate**: Clone existing notes
- **Export**: Download all notes as JSON backup
- **Import**: Restore notes from JSON file
- **Character Counter**: Track note length
- **Preview Modal**: Full-screen view with all details

## Data Storage
All notes are stored in browser's `localStorage` under the key `laboratory_notes`.

**Storage Format:**
```json
[
  {
    "id": 1234567890,
    "title": "Note Title",
    "category": "trading",
    "priority": "high",
    "content": "Note content here...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "isPinned": false,
    "isArchived": false
  }
]
```

## Categories & Colors

| Category | Label | Color | Use Case |
|----------|-------|-------|----------|
| `trading` | Trading Ideas | Cyan | Market analysis, trade setups, strategies |
| `learning` | Learning | Purple | Educational content, courses, tutorials |
| `personal` | Personal | Green | Personal thoughts, goals, reflections |
| `code` | Code Snippets | Yellow | Code examples, scripts, algorithms |
| `research` | Research | Pink | Research notes, findings, data |
| `other` | Other | Gray | Miscellaneous notes |

## Priority Levels

| Priority | Color | Use Case |
|----------|-------|----------|
| High | Red | Urgent, important tasks |
| Medium | Yellow | Normal priority items |
| Low | Green | Low priority, nice-to-have |

## Usage Guide

### Creating a Note
1. Click "Add Note" button
2. Fill in:
   - Title (required)
   - Category (select from dropdown)
   - Priority (select from dropdown)
   - Content (required, supports multi-line)
3. Click "Create Note"

### Editing a Note
1. Click the edit icon (pencil) on any note
2. Modify the fields
3. Click "Update Note"

### Viewing Note Details
1. Click anywhere on a note card/row
2. View full content in modal
3. Access quick actions: Edit, Pin, Duplicate, Archive, Delete

### Pinning Notes
- Click the bookmark icon to pin/unpin
- Pinned notes always appear at the top
- Visual indicator: bookmark icon and enhanced glow

### Archiving Notes
- Click the archive icon to archive/unarchive
- Archived notes are hidden by default
- Toggle "Show Archived" to view archived notes

### Searching Notes
- Type in the search box
- Searches both title and content
- Real-time filtering

### Exporting Notes
1. Click the download icon
2. JSON file downloads automatically
3. Filename format: `notes-backup-YYYY-MM-DD.json`

### Importing Notes
1. Click the upload icon
2. Select a JSON file
3. Confirm merge with existing notes
4. Notes are added (not replaced)

## Keyboard Shortcuts
Currently no keyboard shortcuts implemented. Feature can be added in future updates.

## Tips & Best Practices

1. **Use Categories Wisely**: Assign appropriate categories for easy filtering
2. **Set Priorities**: Mark urgent notes as High priority
3. **Pin Important Notes**: Keep frequently accessed notes pinned
4. **Regular Backups**: Export notes periodically as backup
5. **Archive Old Notes**: Keep workspace clean by archiving completed notes
6. **Use Search**: Quickly find notes by keywords
7. **Descriptive Titles**: Use clear, searchable titles

## Technical Details

### Component Structure
```
Notes.jsx (Main Component)
├── StatCard (Statistics display)
├── NoteCard (Grid view item)
├── NoteListItem (List view item)
├── ActionButton (Reusable action button)
├── EmptyState (No notes placeholder)
├── NoteDetailModal (Full note view)
├── NoteFormModal (Create/Edit form)
├── FormInput (Form input field)
└── FormSelect (Form select field)
```

### State Management
- Uses React `useState` for local state
- `useEffect` for localStorage sync
- No external state management library

### Styling
- Tailwind CSS with custom neon cyan theme
- Framer Motion for animations
- Responsive design (mobile-first)

## Future Enhancements (Ideas)

- [ ] Rich text editor (bold, italic, lists)
- [ ] Markdown support
- [ ] Tags system (in addition to categories)
- [ ] Note linking (reference other notes)
- [ ] Attachments/Images
- [ ] Collaborative notes (if backend added)
- [ ] Version history
- [ ] Keyboard shortcuts
- [ ] Dark/Light theme toggle
- [ ] Custom categories
- [ ] Note templates

## Troubleshooting

### Notes not saving
- Check browser localStorage is enabled
- Check browser storage quota (usually 5-10MB)
- Try clearing old data if storage is full

### Import not working
- Ensure JSON file is valid format
- Check file contains array of note objects
- Verify all required fields are present

### Search not working
- Check search query spelling
- Try different keywords
- Clear filters and try again

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Data Privacy
- All data stored locally in browser
- No server communication
- No data collection or tracking
- Export feature for manual backups

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Component**: `landing-page/src/components/laboratory/Notes.jsx`
