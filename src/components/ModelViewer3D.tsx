import React, { useState, useRef } from 'react';
import { track3DInteraction } from '../utils/analytics';
import { RotateCw, RefreshCw, ZoomIn, Eye, Sparkles, AlertCircle } from 'lucide-react';

interface ModelViewer3DProps {
  modelSrc?: string;
  posterSrc?: string;
  modelTitle?: string;
  caption?: string;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
  modelSrc = '/models/[INSERT 3D MODEL FILE].glb',
  posterSrc = '',
  modelTitle = '[INSERT 3D MODEL FILE: ROBOTIC WRIST ACTUATOR ASSEMBLY]',
  caption = '[INSERT 3D CAPTION: Interactive CAD preview loaded via Google <model-viewer>]',
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteraction, setHasInteraction] = useState(false);
  const viewerRef = useRef<HTMLElement | null>(null);

  const toggleAutoRotate = () => {
    const nextState = !autoRotate;
    setAutoRotate(nextState);
    track3DInteraction(nextState ? 'enable_autorotate' : 'disable_autorotate', modelTitle);
  };

  const resetCamera = () => {
    track3DInteraction('reset_camera', modelTitle);
    if (viewerRef.current && 'resetTurntable' in viewerRef.current) {
      // @ts-expect-error - model-viewer native method
      viewerRef.current.resetTurntable?.();
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
      {/* 3D Viewport Header Bar */}
      <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-mono font-semibold text-slate-200">
            GOOGLE &lt;model-viewer&gt; 3D ENGINE
          </span>
        </div>

        {/* 3D Interactive Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleAutoRotate}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 transition-colors border ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle continuous auto-rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}</span>
          </button>

          <button
            type="button"
            onClick={resetCamera}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 transition-colors"
            title="Reset 3D camera orientation"
            aria-label="Reset camera"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        className="relative w-full h-[400px] sm:h-[480px] bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={() => {
          if (!hasInteraction) {
            setHasInteraction(true);
            track3DInteraction('user_canvas_drag', modelTitle);
          }
        }}
      >
        {/* Engineering Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Google's official <model-viewer> web component */}
        {/* Loaded via CDN script in index.html to guarantee zero SSR crashes and static compatibility */}
        <model-viewer
          ref={viewerRef}
          src={modelSrc}
          poster={posterSrc}
          alt={modelTitle}
          auto-rotate={autoRotate ? true : undefined}
          camera-controls
          shadow-intensity="1.5"
          shadow-softness="0.8"
          exposure="1.2"
          touch-action="pan-y"
          interaction-prompt="auto"
          className="w-full h-full"
        >
          {/* Slot for fallback or loading UI if asset is placeholder */}
          <div
            slot="poster"
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950/80 backdrop-blur-xs"
          >
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-4 text-cyan-400">
              <Eye className="w-10 h-10 animate-pulse" />
            </div>
            <div className="max-w-md space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/50 rounded">
                STATIC 3D VIEWER ACTIVE
              </span>
              <h4 className="text-sm font-semibold text-white">
                {modelTitle}
              </h4>
              <p className="text-xs font-mono text-slate-400">
                Asset URI: <code className="text-cyan-300">{modelSrc}</code>
              </p>
              <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Drop your compiled .glb file into <code className="text-slate-300">public/models/</code></span>
              </div>
            </div>
          </div>
        </model-viewer>

        {/* Interactive Helper Overlay HUD */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-end justify-between">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-2 shadow-lg">
            <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click &amp; drag to rotate · Scroll to zoom</span>
          </div>

          <div className="hidden sm:flex bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400">
            FORMAT: GLTF / GLB 2.0
          </div>
        </div>
      </div>

      {/* Model Information Footer */}
      <div className="px-5 py-3.5 bg-slate-900/70 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="truncate">{caption}</span>
        </div>
        <div className="shrink-0 text-slate-500">
          Source: <span className="text-slate-300">public/models/[INSERT 3D MODEL FILE].glb</span>
        </div>
      </div>
    </div>
  );
};
