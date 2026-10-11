import React, { useState } from 'react';
import { ModelViewer3D } from './ModelViewer3D';
import { trackDownload, trackEvent } from '../utils/analytics';
import { Download, FileBox, Archive, CheckCircle2, Wrench, AlertTriangle, Layers, BookOpen } from 'lucide-react';

interface BuildStep {
  stepNumber: string;
  title: string;
  description: string;
  keyCheckpoints: string[];
  warningPlaceholder?: string;
}

const buildSteps: BuildStep[] = [
  {
    stepNumber: '01',
    title: '[INSERT STEP 1: PREPARATION & COMPONENT SOURCING]',
    description: '[INSERT STEP 1 DETAILS: Print tolerances, required tool list (metric hex keys, soldering iron, heat-set insert tip), and pre-assembly cleaning.]',
    keyCheckpoints: [
      '[INSERT CHECKPOINT 1A: VERIFY BED LEVELING & NOZZLE CLEARANCE (0.2MM LAYER HEIGHT)]',
      '[INSERT CHECKPOINT 1B: DEBURR PRINTED FLANGES & TEST M3 SCREW CLEARANCE HOLES]',
      '[INSERT CHECKPOINT 1C: INSPECT STEPPER MOTOR SHAFTS FOR BURRS OR RUNOUT]',
    ],
  },
  {
    stepNumber: '02',
    title: '[INSERT STEP 2: MECHANICAL SUB-ASSEMBLY & TORQUE SPECS]',
    description: '[INSERT STEP 2 DETAILS: Insertion of M3/M4 brass threaded heat-set inserts, bearing press-fit procedure, and belt tensioning calibration.]',
    keyCheckpoints: [
      '[INSERT CHECKPOINT 2A: PRESS M3 HEAT-SET INSERTS AT 220°C FLUSH WITH SURFACE]',
      '[INSERT CHECKPOINT 2B: TORQUE ALL STRUCTURAL M3 FASTENERS TO 1.4 NM]',
      '[INSERT CHECKPOINT 2C: ENSURE DUAL LINEAR RAILS SLIDE FREELY UNDER ZERO BINDING LOAD]',
    ],
    warningPlaceholder: '[INSERT CRITICAL TOLERANCE WARNING: OVER-TIGHTENING CYCLOIDAL HOUSING CAUSES ECCENTRIC BEARING PINCH]',
  },
  {
    stepNumber: '03',
    title: '[INSERT STEP 3: ELECTRONICS, SENSORS & ACTUATOR WIRING]',
    description: '[INSERT STEP 3 DETAILS: Wiring harness routing, twisted-pair CAN bus termination (120 Ohm resistor), and logic power vs motor bus separation.]',
    keyCheckpoints: [
      '[INSERT CHECKPOINT 3A: CRIMP JST-GH CONNECTORS AND VERIFY COLOR PINOUT]',
      '[INSERT CHECKPOINT 3B: CONNECT 24V-48V DC BUS WITH INLINE 15A FAST-BLOW FUSE]',
      '[INSERT CHECKPOINT 3C: VERIFY ENCODER SPI COMMUNICATIONS VIA LOGIC ANALYZER]',
    ],
  },
  {
    stepNumber: '04',
    title: '[INSERT STEP 4: FIRMWARE FLASHING & CLOSED-LOOP CALIBRATION]',
    description: '[INSERT STEP 4 DETAILS: Flashing microcontroller firmware, motor phase identification, PID velocity loop tuning, and homing sensor verification.]',
    keyCheckpoints: [
      '[INSERT CHECKPOINT 4A: FLASH BINARY VIA SWD/JTAG DEBUGGER USING OPENOCD]',
      '[INSERT CHECKPOINT 4B: RUN FIELD-ORIENTED CONTROL (FOC) POLE PAIR CALIBRATION]',
      '[INSERT CHECKPOINT 4C: MONITOR TELEMETRY FOR THERMAL DRIFT OVER 30 MIN CONTINUOUS RUN]',
    ],
  },
];

interface BomRow {
  category: string;
  item: string;
  qty: string;
  spec: string;
  sourcing: string;
  cost: string;
}

const openSourceBomData: BomRow[] = [
  {
    category: 'Mechanical',
    item: '[INSERT ITEM: CYCLOIDAL PIN WHEEL & CAM]',
    qty: '[INSERT QTY: 1]',
    spec: '[INSERT SPEC: 4140 STEEL CNC / PETG PROTOTYPE]',
    sourcing: '[INSERT LINK: CAD REPO / VENDOR]',
    cost: '[INSERT $35.00]',
  },
  {
    category: 'Mechanical',
    item: '[INSERT ITEM: DEEP GROOVE BALL BEARINGS 6806-2RS]',
    qty: '[INSERT QTY: 4]',
    spec: '[INSERT SPEC: 30X42X7 MM ABEC-5]',
    sourcing: '[INSERT LINK: MCMASTER / MISUMI]',
    cost: '[INSERT $14.00]',
  },
  {
    category: 'Mechanical',
    item: '[INSERT ITEM: M3 BRASS THREADED HEAT-SET INSERTS]',
    qty: '[INSERT QTY: 24]',
    spec: '[INSERT SPEC: M3X4MM TAPERED BRASS]',
    sourcing: '[INSERT LINK: CNC KITCHEN / AMAZON]',
    cost: '[INSERT $5.50]',
  },
  {
    category: 'Electronics',
    item: '[INSERT ITEM: BLDC OUTRUNNER MOTOR]',
    qty: '[INSERT QTY: 1]',
    spec: '[INSERT SPEC: 5010 300KV HOLLOW SHAFT]',
    sourcing: '[INSERT LINK: T-MOTOR / SUNNYSKY]',
    cost: '[INSERT $42.00]',
  },
  {
    category: 'Electronics',
    item: '[INSERT ITEM: AS5600 12-BIT MAGNETIC ENCODER]',
    qty: '[INSERT QTY: 1]',
    spec: '[INSERT SPEC: I2C/ANALOG RADIAL MAGNET]',
    sourcing: '[INSERT LINK: DIGIKEY / MOUSER]',
    cost: '[INSERT $6.20]',
  },
  {
    category: 'Printed',
    item: '[INSERT ITEM: STRUCTURAL HOUSING (PARTS A & B)]',
    qty: '[INSERT QTY: 1 PAIR]',
    spec: '[INSERT SPEC: PRUSAMENT PETG CARBON FIBER]',
    sourcing: '[INSERT LINK: 3D PRINT FILE]',
    cost: '[INSERT $12.00]',
  },
];

export const BuildGuidesSection: React.FC = () => {
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  return (
    <section id="build-guides" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>SECTION 03</span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span>OPEN SOURCE FABRICATION</span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span>STEP-BY-STEP REPRODUCIBILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Build Guides &amp; 3D Model Repository
          </h2>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base">
            Every assembly is designed for open-source reproducibility. Explore interactive 3D models directly in your browser, follow the fabrication steps, and download certified CAD/CAM packages.
          </p>
        </div>

        {/* 3D Model Viewer + Download Action Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Interactive 3D Canvas */}
          <div className="lg:col-span-7">
            <ModelViewer3D
              modelSrc="/models/[INSERT 3D MODEL FILE].glb"
              modelTitle="[INSERT 3D MODEL: MODULAR CYCLOIDAL ROTARY DRIVE V1]"
              caption="[INSERT 3D MODEL TELEMETRY: 45:1 RATIO · 30NM PEAK TORQUE · FULL CAD BOM READY]"
            />
          </div>

          {/* Download & Spec Card */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                [INSERT MODEL RELEASE: HARDWARE REVISION 1.2]
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                [INSERT OPEN-SOURCE ASSET TITLE]
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                [INSERT BRIEF MODEL SUMMARY: Complete manufacturing package including STEP solids for CNC/machining, oriented STL meshes for FDM/SLA 3D printing, and wiring pinout schematics.]
              </p>
            </div>

            {/* CRITICAL REQUIREMENT: TWO DISTINCT DOWNLOAD BUTTONS PER ITEM */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 font-medium">
                DOWNLOAD PACKAGES (STATIC CLOUDFLARE PAGES BUILDS):
              </div>

              {/* Button 1: Specific Build Files (CAD, STL/STEP or code only) */}
              <a
                href="/downloads/[INSERT BUILD FILES - CAD STL].step"
                download
                onClick={() =>
                  trackDownload(
                    '[INSERT BUILD FILES - CAD STL].step',
                    'cad_step_stl',
                    '[INSERT OPEN-SOURCE ASSET TITLE]'
                  )
                }
                className="w-full px-4 py-3 text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-700/60 rounded-xl transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-900/60 text-cyan-400 group-hover:bg-cyan-800/80 transition-colors">
                    <FileBox className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">Specific Build Files (CAD, STL/STEP)</div>
                    <div className="text-[11px] font-mono text-cyan-400/90">[INSERT CAD &amp; 3D PRINT FILES ONLY]</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-cyan-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Button 2: FULL Project Repository (.zip) */}
              <a
                href="/downloads/[INSERT PROJECT NAME].zip"
                download
                onClick={() =>
                  trackDownload(
                    '[INSERT PROJECT NAME].zip',
                    'full_zip_archive',
                    '[INSERT OPEN-SOURCE ASSET TITLE]'
                  )
                }
                className="w-full px-4 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all flex items-center justify-between group shadow-sm shadow-cyan-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950/20 text-slate-950">
                    <Archive className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-950">FULL Project Repository (.zip)</div>
                    <div className="text-[11px] font-mono text-slate-800">[INSERT COMPLETE ARCHIVE: CAD + CODE + BOM + DOCS]</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-950 shrink-0 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Specification Check Matrix */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs font-mono text-slate-400">
              <div className="flex items-center justify-between">
                <span>CAD Environment:</span>
                <span className="text-slate-200">[INSERT SOLIDWORKS / ONESHAPE / STEP]</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Print Recommended:</span>
                <span className="text-slate-200">[INSERT PETG / ABS / ASA (4 PERIMETERS)]</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Static Asset Path:</span>
                <span className="text-cyan-400">public/models/[INSERT 3D MODEL FILE].glb</span>
              </div>
            </div>
          </div>
        </div>

        {/* Build Guide Steps - Native On-Page Integration */}
        <div className="mb-16">
          <div className="border-b border-slate-800 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">[INSERT BUILD GUIDE PROTOCOL]</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Step-by-Step Fabrication &amp; Commissioning Guide
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-500">
              ESTIMATED ASSEMBLY TIME: [INSERT 3–4 HOURS]
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step Navigation Rail */}
            <div className="lg:col-span-4 space-y-2">
              {buildSteps.map((step, idx) => (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => {
                    setActiveStepTab(idx);
                    trackEvent('build_guide_step_click', {
                      category: 'project_view',
                      action: 'view_guide_step',
                      label: step.stepNumber,
                    });
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                    activeStepTab === idx
                      ? 'bg-slate-900 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <span className={`font-mono text-sm font-bold shrink-0 ${activeStepTab === idx ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className={`text-xs font-mono font-semibold ${activeStepTab === idx ? 'text-white' : 'text-slate-300'}`}>
                      {step.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Detail Content Pane */}
            <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  STEP {buildSteps[activeStepTab].stepNumber} PROTOCOL
                </span>
                <span className="text-xs font-mono text-slate-500">
                  REPRODUCIBILITY CHECKLIST
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {buildSteps[activeStepTab].title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {buildSteps[activeStepTab].description}
                </p>
              </div>

              {/* Quality & Assembly Checkpoints */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Critical Quality Checkpoints:
                </h5>
                <div className="space-y-2">
                  {buildSteps[activeStepTab].keyCheckpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-950 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Callout (if present) */}
              {buildSteps[activeStepTab].warningPlaceholder && (
                <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl flex items-start gap-3 text-xs font-mono text-amber-300">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-sans font-bold text-amber-200 mb-0.5">CRITICAL ASSEMBLY CAUTION</strong>
                    {buildSteps[activeStepTab].warningPlaceholder}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Required Open-Source Bill of Materials (BOM) Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">[INSERT BOM IDENTIFIER: BOM-REV-01]</div>
              <h3 className="text-xl font-bold text-white">
                Comprehensive Bill of Materials (BOM)
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                TOTAL EST. COST: <strong className="text-cyan-400">[INSERT $115.70 USD]</strong>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Subsystem</th>
                  <th className="px-4 py-3 font-semibold">Component Name</th>
                  <th className="px-4 py-3 font-semibold">Qty</th>
                  <th className="px-4 py-3 font-semibold">Engineering Specification</th>
                  <th className="px-4 py-3 font-semibold">Source / Link</th>
                  <th className="px-4 py-3 font-semibold text-right">Est. Unit Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/30 text-slate-300">
                {openSourceBomData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 text-slate-400">{row.category}</td>
                    <td className="px-4 py-3 text-white font-medium">{row.item}</td>
                    <td className="px-4 py-3 text-cyan-400">{row.qty}</td>
                    <td className="px-4 py-3 text-slate-400">{row.spec}</td>
                    <td className="px-4 py-3">
                      <span className="text-cyan-400 underline cursor-pointer hover:text-cyan-300">
                        {row.sourcing}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-200">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
            <span>[INSERT PROCUREMENT NOTES: ALL FASTENERS ARE STANDARD ISO 4762 M3 SOCKET HEAD CAP SCREWS]</span>
            <span>LAST VERIFIED: [INSERT DATE]</span>
          </div>
        </div>
      </div>
    </section>
  );
};
