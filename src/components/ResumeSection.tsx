import React from 'react';
import { trackDownload } from '../utils/analytics';
import { Download, GraduationCap, Briefcase, Wrench, Award, CheckCircle } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Download CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>SECTION 04</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>CURRICULUM VITAE</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>VERIFIABLE CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Engineering Resume &amp; Experience
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Full native web resume integration. Verified experience across mechanical engineering, rapid prototyping, and embedded systems.
            </p>
          </div>

          {/* Prominent "Download Original PDF" button */}
          <a
            href="/downloads/[INSERT RESUME FILE].pdf"
            download
            onClick={() => trackDownload('[INSERT RESUME FILE].pdf', 'pdf', 'Resume Section')}
            className="px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Download Original PDF</span>
          </a>
        </div>

        {/* Integrated Clean Web Resume Document Canvas */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-10 lg:p-12 space-y-12 shadow-2xl relative">
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                [INSERT FULL NAME]
              </h3>
              <p className="text-cyan-400 font-mono text-sm sm:text-base mt-1">
                [INSERT PROFESSIONAL TITLE: MECHANICAL &amp; MECHATRONIC SYSTEMS ENGINEER]
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 space-y-1 text-left md:text-right">
              <div>[INSERT LOCATION: CITY, REGION / COUNTRY]</div>
              <div>[INSERT DIRECT EMAIL ADDRESS]</div>
              <div>[INSERT PORTFOLIO DOMAIN: EWENBUILDS.XYZ]</div>
            </div>
          </div>

          {/* Section 1: Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>

            <div className="space-y-6 border-l border-slate-800 pl-4 sm:pl-6">
              <div className="space-y-2 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    [INSERT DEGREE: B.S. / M.S. IN MECHANICAL / MECHATRONICS ENGINEERING]
                  </h4>
                  <span className="text-xs font-mono text-slate-500">[INSERT GRADUATION YEAR: 2026]</span>
                </div>
                <div className="text-xs font-mono text-cyan-400">
                  [INSERT UNIVERSITY / INSTITUTION NAME] · [INSERT GPA &amp; ACADEMIC HONORS]
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  [INSERT RELEVANT COURSEWORK: Advanced Kinematics, Finite Element Analysis (FEA), Control Theory, Embedded Microcontrollers, Robotics Kinematics &amp; Dynamics, Mechatronics Design Lab.]
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Professional & Research Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>Professional &amp; Lab Experience</span>
            </div>

            <div className="space-y-8 border-l border-slate-800 pl-4 sm:pl-6">
              {/* Experience Item 1 */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    [INSERT ROLE 1: HARDWARE ENGINEERING INTERN / RESEARCH ASSISTANT]
                  </h4>
                  <span className="text-xs font-mono text-slate-500">[INSERT DATES: MAY 2025 – PRESENT]</span>
                </div>
                <div className="text-xs font-mono text-cyan-400">
                  [INSERT COMPANY / LAB NAME] · [INSERT LOCATION]
                </div>
                <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-cyan-500">
                  <li>
                    [INSERT CONTRIBUTION 1: Designed, simulated, and iterated 3 distinct custom cycloidal gearbox reduction stages in SolidWorks, cutting transmission backlash by 40%.]
                  </li>
                  <li>
                    [INSERT CONTRIBUTION 2: Developed automated sensor-logging testbench using Python and CAN bus analyzer, collecting over 50,000 empirical cycle telemetry points.]
                  </li>
                  <li>
                    [INSERT CONTRIBUTION 3: Collaborated with cross-disciplinary team to draft design-for-manufacturing (DFM) drawings adhering to ASME Y14.5 GD&amp;T standards.]
                  </li>
                </ul>
              </div>

              {/* Experience Item 2 */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    [INSERT ROLE 2: MECHANICAL PROTOTYPING SPECIALIST / LEAD]
                  </h4>
                  <span className="text-xs font-mono text-slate-500">[INSERT DATES: SEPT 2024 – MAY 2025]</span>
                </div>
                <div className="text-xs font-mono text-cyan-400">
                  [INSERT ORGANIZATION / UNIVERSITY MAKERSPACE] · [INSERT LOCATION]
                </div>
                <ul className="space-y-2 text-slate-300 text-sm list-disc pl-4 marker:text-cyan-500">
                  <li>
                    [INSERT CONTRIBUTION 1: Maintained and calibrated 8 industrial FDM/SLA 3D printers and a 3-axis CNC router, training over 60 undergraduate engineering students.]
                  </li>
                  <li>
                    [INSERT CONTRIBUTION 2: Engineered custom vacuum-assisted workholding jigs for thin-walled aluminum stock milling with zero part deformation.]
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Skills Matrix */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <Wrench className="w-4 h-4" />
              <span>Technical Skills &amp; Fabrication Competencies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-xs font-mono text-cyan-400 font-semibold block">
                  Mechanical CAD &amp; Simulation
                </span>
                <p className="text-xs font-mono text-slate-300">
                  [INSERT CAD: SOLIDWORKS (CSWP), ONESHAPE, AUTODESK FUSION, ANSYS FEA, GD&amp;T ASME Y14.5]
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-xs font-mono text-cyan-400 font-semibold block">
                  Prototyping &amp; Machining
                </span>
                <p className="text-xs font-mono text-slate-300">
                  [INSERT FABRICATION: 3-AXIS CNC MILLING, FDM/SLA/SLS 3D PRINTING, LATHE TURNING, LASER CUTTING, TIG WELDING]
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-xs font-mono text-cyan-400 font-semibold block">
                  Embedded Electronics &amp; Firmware
                </span>
                <p className="text-xs font-mono text-slate-300">
                  [INSERT FIRMWARE: C/C++, STM32 HAL, ESP32, CAN BUS, SPI, I2C, KICAD PCB DESIGN, OSCILLOSCOPES]
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-xs font-mono text-cyan-400 font-semibold block">
                  Software &amp; Data Pipeline
                </span>
                <p className="text-xs font-mono text-slate-300">
                  [INSERT SOFTWARE: PYTHON (NUMPY, SCIPY), ROS2, MATLAB/SIMULINK, GIT/GITHUB, LINUX/BASH]
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Certifications & Publications */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <Award className="w-4 h-4" />
              <span>Certifications, Patents &amp; Honors</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-mono text-white font-semibold">
                    [INSERT CERTIFICATION 1: SOLIDWORKS CSWP CERTIFIED MECHANICAL DESIGN PROFESSIONAL]
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    ID: [INSERT VERIFICATION ID] · [INSERT YEAR]
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-mono text-white font-semibold">
                    [INSERT HONOR / PUBLICATION 2: IEEE ROBOTICS CONFERENCE PAPER / DEAN'S LIST]
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    [INSERT PUBLICATION DOI / DATE]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
