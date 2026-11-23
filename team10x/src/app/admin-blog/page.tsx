'use client';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit2, Trash2, Eye, Search, Filter, FileText, Calendar, Tag, TrendingUp, Clock, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';

type PostStatus = 'Published' | 'Draft' | 'Scheduled';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: PostStatus;
  date: string;
  author: string;
  views: number;
  featured: boolean;
}

const initialPosts: BlogPost[] = [
  { id: 'post-1', title: 'How AI is Transforming School Websites in 2026', slug: 'ai-transforming-school-websites-2026', excerpt: 'Discover how artificial intelligence is revolutionizing the way educational institutions present themselves online...', category: 'AI Technology', tags: ['AI', 'Education', 'Websites'], status: 'Published', date: '10 Sep 2026', author: 'Team10x', views: 1240, featured: true },
  { id: 'post-2', title: 'Top 5 Reasons Your Institution Needs a Professional Website', slug: 'top-5-reasons-institution-needs-website', excerpt: 'In today\'s digital-first world, having a professional website is no longer optional for educational institutions...', category: 'Website Development', tags: ['Websites', 'Institutions', 'Digital'], status: 'Published', date: '08 Sep 2026', author: 'Team10x', views: 876, featured: false },
  { id: 'post-3', title: 'Social Media Management for Coaching Institutes: A Complete Guide', slug: 'social-media-coaching-institutes-guide', excerpt: 'Learn how coaching institutes can leverage social media to attract more students and build their brand...', category: 'Social Media', tags: ['Social Media', 'Coaching', 'Marketing'], status: 'Published', date: '05 Sep 2026', author: 'Team10x', views: 654, featured: false },
  { id: 'post-4', title: 'Digital Transformation for NGOs: Where to Start', slug: 'digital-transformation-ngos-guide', excerpt: 'NGOs and non-profit organizations can significantly amplify their impact through strategic digital transformation...', category: 'Digital Marketing', tags: ['NGO', 'Digital', 'Transformation'], status: 'Draft', date: '03 Sep 2026', author: 'Team10x', views: 0, featured: false },
  { id: 'post-5', title: 'WhatsApp Integration for Business Websites: Best Practices', slug: 'whatsapp-integration-business-websites', excerpt: 'WhatsApp has become the preferred communication channel for millions of customers. Learn how to integrate it...', category: 'Website Development', tags: ['WhatsApp', 'Business', 'Integration'], status: 'Scheduled', date: '15 Sep 2026', author: 'Team10x', views: 0, featured: false },
  { id: 'post-6', title: 'SEO for Educational Institutions: Rank Higher, Get More Admissions', slug: 'seo-educational-institutions-guide', excerpt: 'Search engine optimization is crucial for educational institutions looking to attract more students online...', category: 'SEO', tags: ['SEO', 'Education', 'Admissions'], status: 'Draft', date: '01 Sep 2026', author: 'Team10x', views: 0, featured: false },
];

const statusConfig: Record<PostStatus, { cls: string; icon: React.ReactNode }> = {
  Published: { cls: 'bg-success-subtle text-success border border-success/20', icon: <CheckCircle size={10} /> },
  Draft: { cls: 'bg-admin-surface-2 text-admin-muted border border-admin', icon: <FileText size={10} /> },
  Scheduled: { cls: 'bg-warning-subtle text-warning border border-warning/20', icon: <Clock size={10} /> },
};

const categories = ['All', 'AI Technology', 'Website Development', 'Social Media', 'Digital Marketing', 'SEO'];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: 'AI Technology', excerpt: '', status: 'Draft' as PostStatus });

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Post deleted');
  };

  const toggleFeatured = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
    toast.success('Featured status updated');
  };

  const createPost = () => {
    if (!newPost.title.trim()) { toast.error('Post title is required'); return; }
    const post: BlogPost = {
      id: `post-${Date.now()}`,
      title: newPost.title,
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: newPost.excerpt || 'No excerpt provided.',
      category: newPost.category,
      tags: [],
      status: newPost.status,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Team10x',
      views: 0,
      featured: false,
    };
    setPosts((prev) => [post, ...prev]);
    setShowNewPostModal(false);
    setNewPost({ title: '', category: 'AI Technology', excerpt: '', status: 'Draft' });
    toast.success('Post created successfully');
  };

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: <FileText size={18} />, color: 'text-info', bg: 'bg-info-subtle' },
    { label: 'Published', value: posts.filter((p) => p.status === 'Published').length, icon: <CheckCircle size={18} />, color: 'text-success', bg: 'bg-success-subtle' },
    { label: 'Drafts', value: posts.filter((p) => p.status === 'Draft').length, icon: <FileText size={18} />, color: 'text-admin-muted', bg: 'bg-admin-surface-2' },
    { label: 'Scheduled', value: posts.filter((p) => p.status === 'Scheduled').length, icon: <Clock size={18} />, color: 'text-warning', bg: 'bg-warning-subtle' },
    { label: 'Total Views', value: posts.reduce((a, p) => a + p.views, 0).toLocaleString(), icon: <TrendingUp size={18} />, color: 'text-accent', bg: 'bg-warning-subtle' },
  ];

  return (
    <AdminLayout currentPath="/admin-blog">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-700 text-admin-text">Blog & News</h1>
            <p className="text-sm text-admin-muted mt-0.5">Create and manage blog posts, news and updates</p>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
          >
            <Plus size={15} />
            New Post
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((s) => (
            <div key={`blog-stat-${s.label}`} className="p-4 bg-admin-surface border border-admin rounded-xl flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center ${s.color} flex-shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-lg font-700 text-admin-text tabular">{s.value}</p>
                <p className="text-2xs text-admin-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-admin-surface border border-admin rounded-xl text-admin-muted text-sm">
            <Search size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 bg-transparent text-admin-text placeholder:text-admin-muted focus:outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 p-1 bg-admin-surface border border-admin rounded-xl">
              {['All', 'Published', 'Draft', 'Scheduled'].map((s) => (
                <button
                  key={`status-filter-${s}`}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-500 transition-all duration-150 ${filterStatus === s ? 'bg-accent text-primary font-600' : 'text-admin-muted hover:text-admin-text'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-admin-muted" />
          {categories.map((cat) => (
            <button
              key={`cat-chip-${cat}`}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-500 border transition-all duration-150 ${filterCat === cat ? 'bg-primary/20 text-accent border-accent/30' : 'bg-admin-surface border-admin text-admin-muted hover:text-admin-text'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Table */}
        <div className="bg-admin-surface border border-admin rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-admin">
            <p className="text-sm font-600 text-admin-text">{filtered.length} posts found</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-admin">
                  {['Title', 'Category', 'Tags', 'Status', 'Date', 'Views', 'Actions'].map((h) => (
                    <th key={`th-blog-${h}`} className="text-left px-4 py-3 text-xs font-600 text-admin-muted uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr key={post.id} className="border-b border-admin last:border-0 hover:bg-admin-surface-2 transition-colors duration-100 group">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        {post.featured && (
                          <span className="flex-shrink-0 mt-0.5 text-accent text-xs">★</span>
                        )}
                        <div>
                          <p className="font-500 text-admin-text text-xs line-clamp-2 max-w-[240px]">{post.title}</p>
                          <p className="text-2xs text-admin-muted mt-0.5 font-mono">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs text-admin-muted">{post.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap max-w-[140px]">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={`tag-${post.id}-${tag}`} className="text-2xs px-1.5 py-0.5 rounded bg-admin-surface-2 border border-admin text-admin-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-2xs font-600 ${statusConfig[post.status].cls}`}>
                        {statusConfig[post.status].icon}
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-admin-muted">
                        <Calendar size={11} />
                        {post.date}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-admin-muted tabular">
                        <TrendingUp size={11} />
                        {post.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          onClick={() => toggleFeatured(post.id)}
                          title={post.featured ? 'Unfeature' : 'Feature post'}
                          className={`p-1.5 rounded-lg transition-all duration-150 ${post.featured ? 'text-accent' : 'text-admin-muted hover:text-accent'}`}
                        >
                          <Tag size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg text-admin-muted hover:bg-info-subtle hover:text-info transition-all duration-150">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg text-admin-muted hover:bg-warning-subtle hover:text-warning transition-all duration-150">
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 rounded-lg text-admin-muted hover:bg-danger-subtle hover:text-danger transition-all duration-150"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <FileText size={32} className="text-admin-muted mx-auto mb-3 opacity-40" />
              <p className="text-sm text-admin-muted">No posts found matching your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
          <div className="w-full max-w-lg bg-admin-surface border border-admin rounded-2xl shadow-card-admin animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-admin">
              <h3 className="font-600 text-admin-text">Create New Post</h3>
              <button onClick={() => setShowNewPostModal(false)} className="p-1.5 rounded-lg text-admin-muted hover:text-admin-text hover:bg-admin-surface-2 transition-all duration-150">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Post Title *</label>
                <input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title..."
                  className="w-full bg-admin-bg border border-admin rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full bg-admin-bg border border-admin rounded-xl px-3 py-2.5 text-sm text-admin-text focus:outline-none focus:border-accent/50"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={`opt-${c}`} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Status</label>
                  <select
                    value={newPost.status}
                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value as PostStatus })}
                    className="w-full bg-admin-bg border border-admin rounded-xl px-3 py-2.5 text-sm text-admin-text focus:outline-none focus:border-accent/50"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-600 text-admin-muted uppercase tracking-wider block mb-1.5">Excerpt</label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  placeholder="Brief description of the post..."
                  rows={3}
                  className="w-full bg-admin-bg border border-admin rounded-xl px-4 py-2.5 text-sm text-admin-text placeholder:text-admin-muted focus:outline-none focus:border-accent/50 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 px-5 py-4 border-t border-admin">
              <button
                onClick={createPost}
                className="flex-1 py-2.5 bg-accent text-primary text-sm font-600 rounded-xl hover:bg-yellow-400 transition-all duration-150 active:scale-95"
              >
                Create Post
              </button>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-5 py-2.5 bg-admin-surface-2 border border-admin text-admin-muted text-sm font-500 rounded-xl hover:text-admin-text transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
