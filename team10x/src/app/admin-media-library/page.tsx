'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Upload, Search, Grid, List, Image as ImageIcon, Video, FileText, Trash2, Copy, FolderOpen, X, Check } from 'lucide-react';
import { toast } from 'sonner';

type MediaType = 'all' | 'image' | 'video' | 'document';
type ViewMode = 'grid' | 'list';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  dimensions?: string;
  url: string;
  folder: string;
  uploadedAt: string;
  alt?: string;
}

const initialMedia: MediaItem[] = [
{ id: 'med-1', name: 'hero-banner.jpg', type: 'image', size: '245 KB', dimensions: '1920×1080', url: "https://img.rocket.new/generatedImages/rocket_gen_img_4639d4f16-1789051740539.png", folder: 'Website', uploadedAt: '10 Sep 2026', alt: 'Hero banner showing digital technology' },
{ id: 'med-2', name: 'school-website-mockup.png', type: 'image', size: '189 KB', dimensions: '1200×800', url: "https://img.rocket.new/generatedImages/rocket_gen_img_11eda67f7-1770291130824.png", folder: 'Portfolio', uploadedAt: '09 Sep 2026', alt: 'School website mockup on laptop screen' },
{ id: 'med-3', name: 'team10x-logo.png', type: 'image', size: '42 KB', dimensions: '400×400', url: "https://img.rocket.new/generatedImages/rocket_gen_img_4e367b66d-1789051741729.png", folder: 'Branding', uploadedAt: '08 Sep 2026', alt: 'Team10x company logo' },
{ id: 'med-4', name: 'ai-technology-bg.jpg', type: 'image', size: '312 KB', dimensions: '1920×1080', url: "https://img.rocket.new/generatedImages/rocket_gen_img_1df03ff9d-1785423388772.png", folder: 'Website', uploadedAt: '07 Sep 2026', alt: 'AI technology abstract background' },
{ id: 'med-5', name: 'college-campus.jpg', type: 'image', size: '278 KB', dimensions: '1600×900', url: "https://img.rocket.new/generatedImages/rocket_gen_img_1c90c6000-1765233619711.png", folder: 'Portfolio', uploadedAt: '06 Sep 2026', alt: 'College campus aerial view' },
{ id: 'med-6', name: 'social-media-post-1.jpg', type: 'image', size: '156 KB', dimensions: '1080×1080', url: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4924450-1784163683397.png", folder: 'Social Media', uploadedAt: '05 Sep 2026', alt: 'Social media promotional post graphic' },
{ id: 'med-7', name: 'team-photo.jpg', type: 'image', size: '198 KB', dimensions: '1200×800', url: "https://images.unsplash.com/photo-1637979911089-bf0d73f0b9c5", folder: 'About', uploadedAt: '04 Sep 2026', alt: 'Team members collaborating in office' },
{ id: 'med-8', name: 'digital-marketing.jpg', type: 'image', size: '221 KB', dimensions: '1600×900', url: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa7dfe68-1772413688180.png", folder: 'Blog', uploadedAt: '03 Sep 2026', alt: 'Digital marketing analytics dashboard' },
{ id: 'med-9', name: 'intro-video.mp4', type: 'video', size: '12.4 MB', url: '', folder: 'Website', uploadedAt: '02 Sep 2026' },
{ id: 'med-10', name: 'brochure-2026.pdf', type: 'document', size: '2.1 MB', url: '', folder: 'Documents', uploadedAt: '01 Sep 2026' }];


const folders = ['All Files', 'Website', 'Portfolio', 'Branding', 'Social Media', 'About', 'Blog', 'Documents'];

const typeIcon = (type: MediaItem['type']) => {
  if (type === 'image') return <ImageIcon size={14} />;
  if (type === 'video') return <Video size={14} />;
  return <FileText size={14} />;
};

export default function AdminMediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MediaType>('all');
  const [folderFilter, setFolderFilter] = useState('All Files');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selected, setSelected] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const filtered = media.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || m.type === typeFilter;
    const matchFolder = folderFilter === 'All Files' || m.folder === folderFilter;
    return matchSearch && matchType && matchFolder;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const deleteSelected = () => {
    setMedia((prev) => prev.filter((m) => !selected.includes(m.id)));
    toast.success(`${selected.length} file(s) deleted`);
    setSelected([]);
  };

  const copyUrl = (url: string, name: string) => {
    if (url) {
      navigator.clipboard?.writeText(url).then(() => toast.success(`URL copied: ${name}`)).catch(() => toast.success(`URL copied: ${name}`));
    } else {
      toast.info('URL not available for this file type in demo mode');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {e.preventDefault();setIsDragging(true);};
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      toast.success(`${files.length} file(s) queued for upload (Demo Mode)`);
    }
  };

  const totalSize = '15.6 MB';

  return (
    <AdminLayout currentPath="/admin-media-library">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-700 text-admin-text">Media Library</h1>
            <p className="text-sm text-admin-muted mt-0.5">{media.length} files · {totalSize} used</p>
          </div>
          <div className="flex items-center gap-2">
            {selected.length > 0 &&
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/20 text-danger text-sm font-600 rounded-xl hover:bg-danger/20 transition-all duration-150 active:scale-95">
              
                <Trash2 size={15} />
                Delete ({selected.length})
              </button>
            }
            <button
              onClick={() => toast.success('Upload dialog opened (Demo Mode)')}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95">
              
              <Upload size={15} />
              Upload Files
            </button>
          </div>
        </div>

        {/* Upload Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer ${
          isDragging ? 'border-accent bg-accent/5' : 'border-admin hover:border-accent/40 hover:bg-admin-surface-2/50'}`
          }
          onClick={() => toast.success('Upload dialog opened (Demo Mode)')}>
          
          <Upload size={28} className={`mx-auto mb-3 ${isDragging ? 'text-accent' : 'text-admin-muted'}`} />
          <p className="text-sm font-500 text-admin-text">Drop files here or click to upload</p>
          <p className="text-xs text-admin-muted mt-1">Supports JPG, PNG, GIF, MP4, PDF · Max 50MB per file</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Folder Sidebar */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="bg-admin-surface border border-admin rounded-xl p-3">
              <p className="text-xs font-600 text-admin-muted uppercase tracking-wider px-2 mb-2">Folders</p>
              {folders.map((folder) => {
                const count = folder === 'All Files' ? media.length : media.filter((m) => m.folder === folder).length;
                return (
                  <button
                    key={`folder-${folder}`}
                    onClick={() => setFolderFilter(folder)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5 ${
                    folderFilter === folder ? 'bg-primary/20 text-accent font-600' : 'text-admin-muted hover:bg-admin-surface-2 hover:text-admin-text'}`
                    }>
                    
                    <div className="flex items-center gap-2">
                      <FolderOpen size={14} />
                      <span className="truncate">{folder}</span>
                    </div>
                    <span className="text-2xs tabular">{count}</span>
                  </button>);

              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-admin-surface border border-admin rounded-xl text-admin-muted text-sm">
                <Search size={15} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search files..."
                  className="flex-1 bg-transparent text-admin-text placeholder:text-admin-muted focus:outline-none text-sm" />
                
                {search &&
                <button onClick={() => setSearch('')} className="text-admin-muted hover:text-admin-text">
                    <X size={14} />
                  </button>
                }
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-admin-surface border border-admin rounded-xl">
                  {(['all', 'image', 'video', 'document'] as MediaType[]).map((t) =>
                  <button
                    key={`type-${t}`}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-500 capitalize transition-all duration-150 ${typeFilter === t ? 'bg-accent text-primary font-600' : 'text-admin-muted hover:text-admin-text'}`}>
                    
                      {t}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1 p-1 bg-admin-surface border border-admin rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all duration-150 ${viewMode === 'grid' ? 'bg-accent text-primary' : 'text-admin-muted hover:text-admin-text'}`}>
                    
                    <Grid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all duration-150 ${viewMode === 'list' ? 'bg-accent text-primary' : 'text-admin-muted hover:text-admin-text'}`}>
                    
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' &&
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {filtered.map((item) =>
              <div
                key={item.id}
                className={`group relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-200 ${
                selected.includes(item.id) ? 'border-accent ring-1 ring-accent/30' : 'border-admin hover:border-accent/30'}`
                }
                onClick={() => toggleSelect(item.id)}>
                
                    {/* Thumbnail */}
                    <div className="aspect-square bg-admin-surface-2 relative overflow-hidden">
                      {item.type === 'image' && item.url ?
                  <img src={item.url} alt={item.alt || item.name} className="w-full h-full object-cover" /> :

                  <div className="w-full h-full flex items-center justify-center">
                          <div className="text-admin-muted opacity-40">
                            {item.type === 'video' ? <Video size={32} /> : <FileText size={32} />}
                          </div>
                        </div>
                  }
                      {/* Select overlay */}
                      <div className={`absolute inset-0 transition-all duration-150 ${selected.includes(item.id) ? 'bg-accent/20' : 'bg-transparent group-hover:bg-black/20'}`}>
                        <div className={`absolute top-2 left-2 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${selected.includes(item.id) ? 'bg-accent border-accent' : 'border-white/60 bg-black/20'}`}>
                          {selected.includes(item.id) && <Check size={11} className="text-primary" />}
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                      onClick={(e) => {e.stopPropagation();copyUrl(item.url, item.name);}}
                      className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-all duration-150">
                      
                          <Copy size={11} />
                        </button>
                        <button
                      onClick={(e) => {e.stopPropagation();setMedia((prev) => prev.filter((m) => m.id !== item.id));toast.success('File deleted');}}
                      className="p-1.5 rounded-lg bg-danger/80 text-white hover:bg-danger transition-all duration-150">
                      
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-2 bg-admin-surface">
                      <p className="text-2xs font-500 text-admin-text truncate">{item.name}</p>
                      <p className="text-2xs text-admin-muted">{item.size}</p>
                    </div>
                  </div>
              )}
              </div>
            }

            {/* List View */}
            {viewMode === 'list' &&
            <div className="bg-admin-surface border border-admin rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-admin">
                      {['', 'File', 'Type', 'Size', 'Dimensions', 'Folder', 'Uploaded', 'Actions'].map((h) =>
                    <th key={`th-media-${h}`} className="text-left px-4 py-3 text-xs font-600 text-admin-muted uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                    )}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) =>
                  <tr key={item.id} className="border-b border-admin last:border-0 hover:bg-admin-surface-2 transition-colors duration-100 group">
                        <td className="px-4 py-3">
                          <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-150 ${selected.includes(item.id) ? 'bg-accent border-accent' : 'border-admin hover:border-accent/50'}`}
                        onClick={() => toggleSelect(item.id)}>
                        
                            {selected.includes(item.id) && <Check size={11} className="text-primary" />}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-admin-surface-2 overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {item.type === 'image' && item.url ?
                          <img src={item.url} alt={item.alt || item.name} className="w-full h-full object-cover" /> :

                          <span className="text-admin-muted">{typeIcon(item.type)}</span>
                          }
                            </div>
                            <p className="text-xs font-500 text-admin-text truncate max-w-[160px]">{item.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="flex items-center gap-1.5 text-xs text-admin-muted capitalize">
                            {typeIcon(item.type)}
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-admin-muted tabular">{item.size}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-admin-muted">{item.dimensions || '—'}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-admin-muted">{item.folder}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-admin-muted">{item.uploadedAt}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                            <button
                          onClick={() => copyUrl(item.url, item.name)}
                          className="p-1.5 rounded-lg text-admin-muted hover:bg-info-subtle hover:text-info transition-all duration-150"
                          title="Copy URL">
                          
                              <Copy size={13} />
                            </button>
                            <button
                          onClick={() => {setMedia((prev) => prev.filter((m) => m.id !== item.id));toast.success('File deleted');}}
                          className="p-1.5 rounded-lg text-admin-muted hover:bg-danger-subtle hover:text-danger transition-all duration-150">
                          
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
                {filtered.length === 0 &&
              <div className="py-16 text-center">
                    <ImageIcon size={32} className="text-admin-muted mx-auto mb-3 opacity-40" />
                    <p className="text-sm text-admin-muted">No files found</p>
                  </div>
              }
              </div>
            }
          </div>
        </div>
      </div>
    </AdminLayout>);

}