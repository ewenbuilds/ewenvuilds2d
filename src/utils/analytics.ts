/**
 * Lightweight Analytics & Event Tracking Utility
 *
 * Cloudflare Web Analytics operates privacy-first without cookies and tracks pageviews automatically.
 * For button clicks, downloads, and external link clicks, this module:
 * 1. Dispatches standard custom DOM events ('ewenbuilds:event') for local listeners.
 * 2. Forwards to Google Analytics 4 (window.gtag) if configured in index.html.
 * 3. Logs events cleanly to the browser console for live verification during development/testing.
 */

export interface TrackingEventData {
  category: 'download' | 'navigation' | 'contact' | '3d_viewer' | 'project_view' | 'external_link';
  action: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export function trackEvent(eventName: string, data: TrackingEventData): void {
  // 1. Dispatch custom DOM event
  if (typeof window !== 'undefined') {
    const customEvent = new CustomEvent('ewenbuilds:event', {
      detail: {
        eventName,
        ...data,
        timestamp: new Date().toISOString(),
      },
    });
    window.dispatchEvent(customEvent);

    // 2. Dispatch to GA4 if initialized
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        event_category: data.category,
        event_label: data.label,
        value: data.value,
        ...data,
      });
    }

    // 3. Structured console output for development observability
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`📊 [Analytics Event] ${eventName}:`, data);
    }
  }
}

/**
 * Tracks file download actions (e.g., .zip repositories, CAD/STEP packages, PDF resumes)
 */
export function trackDownload(fileName: string, fileType: string, projectName?: string): void {
  trackEvent('file_download', {
    category: 'download',
    action: 'download_click',
    label: fileName,
    file_type: fileType,
    project: projectName || 'general',
  });
}

/**
 * Tracks interactions with the 3D model viewer (rotate, reset, mode changes)
 */
export function track3DInteraction(action: string, modelName: string): void {
  trackEvent('3d_interaction', {
    category: '3d_viewer',
    action,
    label: modelName,
  });
}

/**
 * Tracks outbound professional links (GitHub, LinkedIn, CAD libraries)
 */
export function trackOutboundLink(platform: string, url: string): void {
  trackEvent('outbound_click', {
    category: 'external_link',
    action: 'click_social_or_external',
    label: platform,
    url,
  });
}
