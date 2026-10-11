import React, { useState } from 'react';
import { trackDownload, trackEvent } from '../utils/analytics';
import { Download, FileCode, Layers, ExternalLink, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';

interface ProjectDocumentation {
  abstract: string;
  methodology: string;
  billOfMaterials: Array<{ item: string; qty: string; spec: string; source: string }>;
  conclusion: string;
}

interface ProjectItem {
  id: string;
  category: 'academic' | 'personal' | 'robotics' | 'embedded';
  categoryLabel: string;
  title: string;
  subtitle: string;
  timeline: string;
  zipDownloadPath: string;
  previewImagePlaceholder: string;
  tags: string[];
  doc: ProjectDocumentation;
}

const projectsData: ProjectItem[] = [
  {
    id: 'project-1',
    category: 'academic',
    categoryLabel: '[INSERT CATEGORY: ACADEMIC RESEARCH]',
    title: '[INSERT PROJECT TITLE 1: HIGH-EFFICIENCY MECHATRONIC ACTUATION SYSTEM]',
    subtitle: '[INSERT SUBTITLE 1: THESIS / LAB RESEARCH FOCUS]',
    timeline: '[INSERT TIMELINE: FALL 2025 – SPRING 2026]',
    zipDownloadPath: '/downloads/[INSERT PROJECT NAME].zip',
    previewImagePlaceholder: '[INSERT CAD RENDERING / SCHEMATIC DIAGRAM 1]',
    tags: ['[INSERT TAG 1: MECHATRONICS]', '[INSERT TAG 2: FINITE ELEMENT ANALYSIS]', '[INSERT TAG 3: CAN BUS]'],
    doc: {
      abstract: '[INSERT ABSTRACT: Concisely describes the engineering challenge, performance criteria, target torque-to-weight ratio, and academic research scope.]',
      methodology: '[INSERT METHODOLOGY: Parametric CAD modeling in SolidWorks/Onshape, dynamic load simulation, CNC machining tolerances, and automated testing rig sensor calibration.]',
      billOfMaterials: [
        { item: '[INSERT COMPONENT: BRUSHLESS DC MOTOR]', qty: '[INSERT QTY: 1]', spec: '[INSERT SPEC: 48V / 240KV SENSORLESS]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: CYCLOIDAL PIN WHEEL]', qty: '[INSERT QTY: 1]', spec: '[INSERT SPEC: 4140 STEEL CNC MILLED]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: ABSOLUTE ENCODER]', qty: '[INSERT QTY: 2]', spec: '[INSERT SPEC: 14-BIT MAGNETIC SPI]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: CUSTOM CONTROLLER PCB]', qty: '[INSERT QTY: 1]', spec: '[INSERT SPEC: 4-LAYER 2OZ COPPER]', source: '[INSERT SOURCING LINK]' },
      ],
      conclusion: '[INSERT CONCLUSION: Empirical test data, peak efficiency curves achieved, thermal dissipation under sustained 100% duty cycle, and future academic extensions.]',
    },
  },
  {
    id: 'project-2',
    category: 'personal',
    categoryLabel: '[INSERT CATEGORY: PERSONAL OPEN-SOURCE BUILD]',
    title: '[INSERT PROJECT TITLE 2: PORTABLE CNC DISPENSING & MILLING GANTRY]',
    subtitle: '[INSERT SUBTITLE 2: RAPID FABRICATION DESKTOP TOOL]',
    timeline: '[INSERT TIMELINE: SUMMER 2025]',
    zipDownloadPath: '/downloads/[INSERT PROJECT NAME].zip',
    previewImagePlaceholder: '[INSERT CAD RENDERING / HARDWARE PHOTO 2]',
    tags: ['[INSERT TAG 1: 3D PRINTED TOOL]', '[INSERT TAG 2: STEPPER DRIVERS]', '[INSERT TAG 3: GRBL/KCLIPPER]'],
    doc: {
      abstract: '[INSERT ABSTRACT: Design and fabrication of an ultra-compact, open-source 3-axis motion stage tailored for solder paste dispensing and PCB isolation routing.]',
      methodology: '[INSERT METHODOLOGY: Dual linear rail kinematics on 2020 extrusion, 3D printed PETG brackets with heat-set brass inserts, and custom closed-loop NEMA17 steppers.]',
      billOfMaterials: [
        { item: '[INSERT COMPONENT: MGN12H LINEAR RAILS]', qty: '[INSERT QTY: 3]', spec: '[INSERT SPEC: 350MM PRELOADED]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: LEADSCREWS TR8X8]', qty: '[INSERT QTY: 2]', spec: '[INSERT SPEC: ANTI-BACKLASH BRASS NUT]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: 3D PRINTED CHASSIS]', qty: '[INSERT QTY: 1 SET]', spec: '[INSERT SPEC: PRUSAMENT PETG 60% INFILL]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: CONTROLLER BOARD]', qty: '[INSERT QTY: 1]', spec: '[INSERT SPEC: 32-BIT TMC2209 SILENT]', source: '[INSERT SOURCING LINK]' },
      ],
      conclusion: '[INSERT CONCLUSION: Achieved 15-micron repeatable positional accuracy across 200x200mm work volume; files released under open-source CERN OHL-S license.]',
    },
  },
  {
    id: 'project-3',
    category: 'robotics',
    categoryLabel: '[INSERT CATEGORY: ROBOTICS & EMBEDDED SYSTEMS]',
    title: '[INSERT PROJECT TITLE 3: MODULAR ROBOTIC END-EFFECTOR & GRIPPER]',
    subtitle: '[INSERT SUBTITLE 3: FORCE-FEEDBACK MULTI-MATERIAL MECHANISM]',
    timeline: '[INSERT TIMELINE: WINTER 2025]',
    zipDownloadPath: '/downloads/[INSERT PROJECT NAME].zip',
    previewImagePlaceholder: '[INSERT CAD RENDERING / SCHEMATIC DIAGRAM 3]',
    tags: ['[INSERT TAG 1: COMPLIANT MECHANISMS]', '[INSERT TAG 2: STRAIN GAUGES]', '[INSERT TAG 3: STM32 C++]'],
    doc: {
      abstract: '[INSERT ABSTRACT: A compliant under-actuated robotic gripper featuring embedded piezoresistive touch feedback for fragile payload manipulation in laboratory environments.]',
      methodology: '[INSERT METHODOLOGY: Finite element strain optimization on TPU finger geometries, differential cable drive capstan reduction, and digital filtering algorithms in C++.]',
      billOfMaterials: [
        { item: '[INSERT COMPONENT: CORELESS SERVO ACTUATOR]', qty: '[INSERT QTY: 1]', spec: '[INSERT SPEC: 35KG/CM TITANIUM GEAR]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: FLEX SENSORS & STRAIN STRIPS]', qty: '[INSERT QTY: 4]', spec: '[INSERT SPEC: 0-100N CALIBRATED]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: COMPLIANT FINGERS]', qty: '[INSERT QTY: 2]', spec: '[INSERT SPEC: 95A TPU MONOLITHIC]', source: '[INSERT SOURCING LINK]' },
        { item: '[INSERT COMPONENT: QUICK-RELEASE FLANGE]', qty: '[INSERT QTY: 1]', spec: '[INSERT SPEC: ISO 9409-1-50 COMPATIBLE]', source: '[INSERT SOURCING LINK]' },
      ],
      conclusion: '[INSERT CONCLUSION: Demonstrated slip-free grasping of glass test tubes and deformable samples without crushing, with full ROS2 topic telemetry.]',
    },
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('project-1');
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, 'abstract' | 'methodology' | 'bom' | 'conclusion'>>({
    'project-1': 'abstract',
    'project-2': 'abstract',
    'project-3': 'abstract',
  });

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
    trackEvent('project_toggle_expand', {
      category: 'project_view',
      action: 'expand_documentation',
      label: id,
    });
  };

  const handleTabChange = (projectId: string, tab: 'abstract' | 'methodology' | 'bom' | 'conclusion') => {
    setActiveTabByProject((prev) => ({ ...prev, [projectId]: tab }));
    trackEvent('project_tab_switch', {
      category: 'project_view',
      action: 'view_section_tab',
      label: `${projectId}_${tab}`,
    });
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            {/* Unboxed Metadata (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>SECTION 02</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>ENGINEERING REPOSITORY</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>ACADEMIC &amp; PERSONAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Projects &amp; Technical Archives
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Peer-reviewed academic research and open-source hardware builds. Every project includes complete documentation, BOM breakdowns, and original source packages.
            </p>
          </div>

          {/* Interactive Filter Controls (Functional Button Tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'academic', label: 'Academic' },
              { id: 'personal', label: 'Personal Builds' },
              { id: 'robotics', label: 'Robotics' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id);
                  trackEvent('filter_projects', { category: 'project_view', action: 'filter', label: tab.id });
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-8">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            const currentTab = activeTabByProject[project.id] || 'abstract';

            return (
              <div
                key={project.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors shadow-lg"
              >
                {/* Project Header Row */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Visual Preview Box */}
                    <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-6 min-h-[180px] flex flex-col justify-between relative group overflow-hidden">
                      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
                      
                      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-cyan-400">
                        <span>{project.categoryLabel}</span>
                        <FileCode className="w-4 h-4 text-cyan-400" />
                      </div>

                      <div className="relative z-10 my-4 text-center">
                        <Layers className="w-10 h-10 mx-auto text-slate-600 mb-2 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-xs font-mono font-medium text-slate-300 block">
                          {project.previewImagePlaceholder}
                        </span>
                      </div>

                      <div className="relative z-10 text-[11px] font-mono text-slate-500 flex justify-between">
                        <span>[INSERT CAD VERSION]</span>
                        <span>[INSERT REPO HASH]</span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
                      <div>
                        {/* Unboxed Tags */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                          <span>{project.timeline}</span>
                          <span className="text-slate-600">·</span>
                          {project.tags.map((tag, idx) => (
                            <React.Fragment key={idx}>
                              <span>{tag}</span>
                              {idx < project.tags.length - 1 && <span className="text-slate-600">·</span>}
                            </React.Fragment>
                          ))}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-cyan-400 mt-1 font-mono">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {project.doc.abstract}
                      </p>

                      {/* Download CTA & Documentation Toggle Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {/* CRITICAL: Download .zip button */}
                        <a
                          href={project.zipDownloadPath}
                          download
                          onClick={() => trackDownload('[INSERT PROJECT NAME].zip', 'zip', project.title)}
                          className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-cyan-500/20"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Project Files (.zip)</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => toggleExpand(project.id)}
                          className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>{isExpanded ? 'Collapse Documentation' : 'View Full Documentation'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Native Cleanly Sectioned Web-Integrated Documentation Viewer */}
                {isExpanded && (
                  <div className="border-t border-slate-800 bg-slate-950/70 p-6 md:p-8 space-y-6">
                    {/* Documentation Tabs */}
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
                      {(['abstract', 'methodology', 'bom', 'conclusion'] as const).map((tab) => {
                        const tabLabels = {
                          abstract: '[INSERT ABSTRACT]',
                          methodology: '[INSERT METHODOLOGY]',
                          bom: '[INSERT BILL OF MATERIALS (BOM)]',
                          conclusion: '[INSERT CONCLUSION]',
                        };
                        return (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => handleTabChange(project.id, tab)}
                            className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                              currentTab === tab
                                ? 'bg-slate-800 text-cyan-400 font-semibold border-b-2 border-cyan-400'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                          >
                            {tabLabels[tab]}
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Documentation Content */}
                    <div className="py-2">
                      {currentTab === 'abstract' && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                            [INSERT ABSTRACT SECTION]
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-500/50 pl-4">
                            {project.doc.abstract}
                          </p>
                        </div>
                      )}

                      {currentTab === 'methodology' && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                            [INSERT METHODOLOGY &amp; ENGINEERING EXECUTION]
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-500/50 pl-4">
                            {project.doc.methodology}
                          </p>
                          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 space-y-1">
                            <div>• [INSERT FORMULAS / KINEMATIC EQUATIONS / TORQUE CALCULATIONS]</div>
                            <div>• [INSERT FEA ANALYSIS CONSTRAINTS &amp; SAFETY FACTOR]</div>
                          </div>
                        </div>
                      )}

                      {currentTab === 'bom' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                              [INSERT BILL OF MATERIALS (BOM)]
                            </h4>
                            <span className="text-xs font-mono text-slate-500">
                              CURRENCY: [INSERT USD / EUR]
                            </span>
                          </div>

                          <div className="overflow-x-auto border border-slate-800 rounded-lg">
                            <table className="w-full text-left text-xs font-mono">
                              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                                <tr>
                                  <th className="px-4 py-2.5 font-semibold">Component</th>
                                  <th className="px-4 py-2.5 font-semibold">Qty</th>
                                  <th className="px-4 py-2.5 font-semibold">Specification</th>
                                  <th className="px-4 py-2.5 font-semibold">Source / Link</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 text-slate-300">
                                {project.doc.billOfMaterials.map((bomItem, idx) => (
                                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                                    <td className="px-4 py-2.5 text-white font-medium">{bomItem.item}</td>
                                    <td className="px-4 py-2.5 text-cyan-400">{bomItem.qty}</td>
                                    <td className="px-4 py-2.5 text-slate-400">{bomItem.spec}</td>
                                    <td className="px-4 py-2.5 text-slate-400">
                                      <span className="text-cyan-400 underline">{bomItem.source}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {currentTab === 'conclusion' && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                            [INSERT CONCLUSION &amp; EMPIRICAL RESULTS]
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-500/50 pl-4">
                            {project.doc.conclusion}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                              <span className="text-xs font-mono text-slate-400 block mb-1">Measured Performance</span>
                              <span className="text-sm font-mono text-cyan-400">[INSERT VALIDATION METRICS / EFFICIENCY %]</span>
                            </div>
                            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
                              <span className="text-xs font-mono text-slate-400 block mb-1">Production Readiness</span>
                              <span className="text-sm font-mono text-cyan-400">[INSERT TRL / READINESS LEVEL]</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
