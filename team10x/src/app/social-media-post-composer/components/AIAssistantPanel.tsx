'use client';
import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Hash, Zap, Share2, AlignLeft } from 'lucide-react';
import { toast } from 'sonner';

interface GeneratedContent {
  type: string;
  content: string;
  platform?: string;
}

const aiActions = [
  { id: 'ai-caption', label: 'Generate Caption', icon: <Sparkles size={14} />, description: 'Professional social media copy from topic' },
  { id: 'ai-rewrite', label: 'Rewrite', icon: <RefreshCw size={14} />, description: 'Make it more engaging & professional' },
  { id: 'ai-shorten', label: 'Shorten', icon: <AlignLeft size={14} />, description: 'Create a concise version' },
  { id: 'ai-hashtags', label: 'Generate Hashtags', icon: <Hash size={14} />, description: 'Relevant hashtags for your post' },
  { id: 'ai-cta', label: 'Generate CTA', icon: <Zap size={14} />, description: 'Strong call-to-action text' },
  { id: 'ai-adapt', label: 'Platform Adapt', icon: <Share2 size={14} />, description: 'Optimize for each platform' },
];

// Demo AI responses — Backend integration point: POST /api/ai/generate { action, topic, caption }
const demoResponses: Record<string, GeneratedContent[]> = {
  'ai-caption': [
    { type: 'caption', content: '🚀 Transform your institution\'s digital presence with Team10x.in!\n\nWe build AI-powered, fully responsive websites for schools, colleges, businesses, and NGOs — starting at just ₹6,999/-*\n\n✅ Professional Design\n✅ Mobile Responsive\n✅ AI-Powered Features\n✅ Easy Content Management\n\nYour digital journey starts today. 💡\n\nCall us: +91 92042 45001\nVisit: www.team10x.in\n\n*T&C apply' },
  ],
  'ai-rewrite': [
    { type: 'rewrite', content: '💼 Elevate your organization\'s online presence with a professionally crafted website from Team10x.in.\n\nSpecializing in AI-powered digital solutions for educational institutions, businesses, and NGOs — we deliver modern, mobile-first websites that generate real results.\n\n📞 +91 92042 45001 | 🌐 www.team10x.in' },
  ],
  'ai-shorten': [
    { type: 'short', content: '🚀 Professional AI-powered websites for schools, colleges & businesses — starting ₹6,999/-*\n\nCall Team10x.in: +91 92042 45001' },
  ],
  'ai-hashtags': [
    { type: 'hashtags', content: '#team10x #websitedevelopment #digitalindia #aipowered #schoolwebsite #collegewebsite #institutionalwebsite #digitalmarketing #webdesign #mobileresponsive #seo #socialmediamanagement #digitaltransformation #startupindia #ngowebsite #affordablewebsite #team10xin' },
  ],
  'ai-cta': [
    { type: 'cta', content: '👉 Get your professional website today!\n📞 Call: +91 92042 45001\n💬 WhatsApp: wa.me/919204245001\n🌐 www.team10x.in\n\nLimited time offer — Starting ₹6,999/-*' },
  ],
  'ai-adapt': [
    { type: 'adapt', platform: 'Facebook', content: '🚀 Is your school or business ready for a stunning new website?\n\nTeam10x.in builds AI-powered, professional websites for educational institutions, businesses, and NGOs across India — starting at just ₹6,999/-*\n\n✅ Professional Design ✅ Mobile Responsive ✅ AI Features ✅ Easy CMS\n\nDrop a comment or message us to get started! 👇\n📞 +91 92042 45001 | 🌐 www.team10x.in' },
    { type: 'adapt', platform: 'Instagram', content: '✨ Your institution deserves a world-class website!\n\nWe build AI-powered websites for schools, colleges, businesses & NGOs 🏫🎓💼\n\nStarting at just ₹6,999/-* 🔥\n\nDM us or tap the link in bio to get started! 👆\n\n#team10x #websitedevelopment #digitalindia #schoolwebsite #aipowered #affordablewebsite' },
    { type: 'adapt', platform: 'LinkedIn', content: 'Excited to share that Team10x.in is now helping educational institutions, businesses, and NGOs across India build their digital presence with AI-powered websites.\n\nOur professional website development services start at ₹6,999/- and include responsive design, AI-powered features, easy content management, and ongoing support.\n\nIf your organization is looking for a reliable digital partner, let\'s connect.\n\n📞 +91 92042 45001 | info@team10x.in | www.team10x.in' },
  ],
};

export default function AIAssistantPanel() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAction = async (actionId: string) => {
    setLoading(actionId);
    // Backend integration point: POST /api/ai/generate { action: actionId, topic, caption }
    await new Promise((r) => setTimeout(r, 1200 + Math.floor(actionId.length * 80)));
    const response = demoResponses[actionId] || [];
    setResults(response);
    setLoading(null);
    toast.success('AI content generated (Demo Mode)');
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const useInComposer = (text: string) => {
    // Dispatch event to composer panel to insert text
    window.dispatchEvent(new CustomEvent('aiInsert', { detail: { text } }));
    toast.success('Inserted into composer');
  };

  return (
    <div className="bg-admin-surface border border-admin rounded-2xl flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-admin">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center">
            <Sparkles size={14} className="text-accent" />
          </div>
          <h2 className="font-600 text-admin-text text-sm">AI Content Assistant</h2>
        </div>
        <p className="text-xs text-admin-muted">Generate platform-optimized content with AI</p>
      </div>

      <div className="p-4 flex-1 overflow-y-auto scrollbar-thin space-y-4">
        {/* Topic input */}
        <div>
          <label className="block text-xs font-600 text-admin-muted mb-1.5">Topic / Context (optional)</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-admin-surface-2 border border-admin text-admin-text text-xs placeholder:text-admin-muted focus:outline-none focus:border-accent/50 transition-all duration-150 resize-none"
            placeholder="e.g. Announcing AI website development service for schools starting ₹6,999"
          />
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <p className="text-xs font-600 text-admin-muted uppercase tracking-wider">AI Actions</p>
          {aiActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={loading !== null}
              className="w-full flex items-start gap-3 px-3 py-3 rounded-xl bg-admin-surface-2 border border-admin hover:border-accent/30 hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 active:scale-98 text-left"
            >
              <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                {loading === action.id ? <Loader2 size={12} className="animate-spin" /> : action.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-600 text-admin-text">{action.label}</p>
                <p className="text-2xs text-admin-muted mt-0.5 leading-snug">{action.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <p className="text-xs font-600 text-admin-muted uppercase tracking-wider">Generated Content</p>
              <div className="flex-1 h-px bg-admin-border" />
            </div>

            {results.map((r, i) => (
              <div key={`result-${i}`} className="rounded-xl bg-admin-bg border border-admin p-3">
                {r.platform && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${
                      r.platform === 'Facebook' ? 'platform-chip-fb' :
                      r.platform === 'Instagram' ? 'platform-chip-ig' : 'platform-chip-li'
                    }`}>
                      {r.platform}
                    </span>
                  </div>
                )}
                <p className="text-xs text-admin-text leading-relaxed whitespace-pre-wrap">{r.content}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => useInComposer(r.content)}
                    className="flex-1 text-2xs font-600 px-2 py-1.5 rounded-lg bg-accent/15 text-accent border border-accent/20 hover:bg-accent/25 transition-all duration-150 active:scale-95"
                  >
                    Use in Composer
                  </button>
                  <button
                    onClick={() => copyToClipboard(r.content, `result-${i}`)}
                    className="flex-1 text-2xs font-500 px-2 py-1.5 rounded-lg bg-admin-surface-2 text-admin-muted border border-admin hover:text-admin-text transition-all duration-150 active:scale-95"
                  >
                    {copiedId === `result-${i}` ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-3">
              <Sparkles size={20} />
            </div>
            <p className="text-xs font-500 text-admin-text">AI Assistant Ready</p>
            <p className="text-2xs text-admin-muted mt-1 leading-relaxed">
              Enter a topic above and click an action to generate content
            </p>
          </div>
        )}
      </div>
    </div>
  );
}