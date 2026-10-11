import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Activity, BarChart3, ExternalLink, Terminal, Copy, Check } from 'lucide-react';

interface AdminAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoggedEvent {
  id: string;
  eventName: string;
  time: string;
  detail: Record<string, unknown>;
}

export const AdminAnalyticsModal: React.FC<AdminAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [eventLogs, setEventLogs] = useState<LoggedEvent[]>([]);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    const handleLocalEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLog: LoggedEvent = {
        id: Math.random().toString(36).substring(2, 9),
        eventName: customEvent.detail?.eventName || 'unknown_event',
        time: new Date().toLocaleTimeString(),
        detail: customEvent.detail || {},
      };
      setEventLogs((prev) => [newLog, ...prev.slice(0, 19)]);
    };

    window.addEventListener('ewenbuilds:event', handleLocalEvent);
    return () => window.removeEventListener('ewenbuilds:event', handleLocalEvent);
  }, []);

  if (!isOpen) return null;

  const copyBeaconTag = () => {
    navigator.clipboard.writeText(
      '<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{"token": "[INSERT CLOUDFLARE WEB ANALYTICS TOKEN]"}\'></script>'
    );
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950 border border-cyan-800/60 rounded-lg text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Cloudflare Admin &amp; Analytics Architecture
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Zero Custom Backend · Native Cloudflare Dashboard
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Architecture Rule Card */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
              <BarChart3 className="w-4 h-4" />
              <span>ADMIN ACCESS MODEL</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              In accordance with high-performance static architecture, <strong>EWENBUILDS.xyz does NOT use a custom auth backend or Firebase Auth</strong>. Your administrative analytics dashboard is Cloudflare itself:
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-300">
              Navigation Path: <span className="text-cyan-400">dash.cloudflare.com</span> &gt; <span className="text-slate-200">Analytics &amp; Logs</span> &gt; <span className="text-white">Web Analytics</span>
            </div>
          </div>

          {/* Cloudflare Beacon Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-medium">
                CLOUDFLARE WEB ANALYTICS BEACON (INDEX.HTML)
              </span>
              <button
                type="button"
                onClick={copyBeaconTag}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy Snippet'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto">
              <code>{`<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "[INSERT CLOUDFLARE WEB ANALYTICS TOKEN]"}'>
</script>`}</code>
            </pre>
          </div>

          {/* Button Click Tracker Live Stream */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>LIVE BUTTON-CLICK &amp; DOWNLOAD EVENT MONITOR</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                DISPATCHING VIA CUSTOM JAVASCRIPT LISTENERS
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-44 overflow-y-auto font-mono text-xs space-y-1.5">
              {eventLogs.length === 0 ? (
                <div className="text-slate-600 italic py-6 text-center">
                  Click any download, slide, or 3D control on the page to watch live events stream here...
                </div>
              ) : (
                eventLogs.map((log) => (
                  <div key={log.id} className="p-2 bg-slate-900/80 rounded border border-slate-800/60 flex items-start justify-between gap-2 text-[11px]">
                    <div>
                      <span className="text-cyan-400 font-bold">{log.eventName}</span>
                      <span className="text-slate-400 ml-2">
                        {JSON.stringify(log.detail).substring(0, 70)}...
                      </span>
                    </div>
                    <span className="text-slate-600 shrink-0">{log.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Optional GA4 Guidance */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2 text-xs font-mono text-slate-400">
            <span className="text-slate-300 font-semibold block">
              OPTIONAL SECONDARY GA4 INTEGRATION
            </span>
            <p>
              If granular button-click telemetry is required in Google Analytics 4, uncomment the GA4 snippet in <code className="text-cyan-400">index.html</code> and insert your Measurement ID: <code className="text-slate-300">[INSERT GA4 MEASUREMENT ID]</code>. All <code className="text-cyan-400">trackDownload()</code> calls automatically stream to <code className="text-slate-300">window.gtag</code>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <a
            href="https://dash.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>Open dash.cloudflare.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
