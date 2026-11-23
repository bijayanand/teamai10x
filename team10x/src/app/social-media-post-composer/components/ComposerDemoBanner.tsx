import React from 'react';
import { Zap } from 'lucide-react';

export default function ComposerDemoBanner() {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-warning-subtle border border-warning/30">
      <Zap size={16} className="text-warning flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-600 text-warning">Demo Mode Active</p>
        <p className="text-xs text-warning/80 mt-0.5">
          Social media API credentials are not configured. Posts will be simulated and will NOT be published to actual platforms. Connect your Facebook, Instagram, and LinkedIn accounts in Settings → Connected Accounts to enable real publishing.
        </p>
      </div>
    </div>
  );
}