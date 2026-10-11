import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          poster?: string;
          loading?: 'auto' | 'lazy' | 'eager';
          reveal?: 'auto' | 'interaction' | 'manual';
          'auto-rotate'?: boolean | string;
          'camera-controls'?: boolean | string;
          'shadow-intensity'?: string | number;
          'shadow-softness'?: string | number;
          'exposure'?: string | number;
          'environment-image'?: string;
          'skybox-image'?: string;
          'camera-orbit'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'field-of-view'?: string;
          'touch-action'?: string;
          'disable-zoom'?: boolean | string;
          'disable-pan'?: boolean | string;
          'ar'?: boolean | string;
          'ar-modes'?: string;
          'ar-scale'?: string;
          slot?: string;
        },
        HTMLElement
      >;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement> & {
            src?: string;
            alt?: string;
            poster?: string;
            loading?: 'auto' | 'lazy' | 'eager';
            reveal?: 'auto' | 'interaction' | 'manual';
            'auto-rotate'?: boolean | string;
            'camera-controls'?: boolean | string;
            'shadow-intensity'?: string | number;
            'shadow-softness'?: string | number;
            'exposure'?: string | number;
            'environment-image'?: string;
            'skybox-image'?: string;
            'camera-orbit'?: string;
            'min-camera-orbit'?: string;
            'max-camera-orbit'?: string;
            'field-of-view'?: string;
            'touch-action'?: string;
            'disable-zoom'?: boolean | string;
            'disable-pan'?: boolean | string;
            'ar'?: boolean | string;
            'ar-modes'?: string;
            'ar-scale'?: string;
            slot?: string;
          },
          HTMLElement
        >;
      }
    }
  }

  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
