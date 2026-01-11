
import React from 'react';
import { ArrowLeft, Download, Code, Play, Clock, Zap, Target, ChevronDown } from 'lucide-react';

interface Props {
  onBack: () => void;
  type?: 'GENERAL' | 'START_STOP' | 'TURNS_MOVES';
}

const SampleLogicGuidePage: React.FC<Props> = ({ onBack, type = 'GENERAL' }) => {

  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    const width = 1240;
    const height = 1754;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    const margin = 100;

    const drawHeader = () => {
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 60px Montserrat, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText("THYNKLAB", margin, 120);
      ctx.fillStyle = "#7C3AED";
      ctx.font = "500 24px Montserrat, sans-serif";
      ctx.fillText("YEAR 5 • SPIKE RADAR PROGRAMMING", margin, 160);
    };

    drawHeader();
    const link = document.createElement('a');
    link.download = `spike_radar_logic.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in duration-300 font-['Montserrat']">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"><Download size={18} /> Download Logic Guide</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative overflow-hidden border-t-[20px] border-emerald-500">
            <div className="mb-8 text-left">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1 text-indigo-900">THYNKLAB</h1>
              <p className="text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase">Spike Word Block Sequence</p>
            </div>
            <div className="mb-6 text-left">
              <h2 className="text-3xl font-extrabold text-emerald-600 leading-tight uppercase tracking-tight">Early Warning Radar Logic</h2>
              <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Spike Prime Flowchart</p>
              <div className="h-1.5 w-20 bg-emerald-100 rounded-full mt-4"></div>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-8 mb-8 flex-1 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-4 w-full">
                   <div className="w-64 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-sm uppercase shadow-md border-b-4 border-emerald-700">1. WAIT UNTIL (DISTANCE &lt; 50)</div>
                   <ChevronDown className="text-emerald-300" />
                   <div className="w-64 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center text-white font-black text-sm uppercase shadow-md border-b-4 border-indigo-700">2. PLAY SOUND (SIREN)</div>
                   <ChevronDown className="text-indigo-200" />
                   <div className="w-64 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-sm uppercase shadow-md border-b-4 border-orange-700">3. HUB MATRIX (PULSE RED)</div>
                </div>
            </div>
            <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-4">
               <div className="flex items-center gap-2 mb-2 text-emerald-600">
                  <Code size={18} />
                  <h3 className="font-bold text-xs uppercase tracking-widest">Logic Thresholds</h3>
               </div>
               <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center text-[10px] font-bold border-b pb-2">
                     <span className="text-slate-400">SENSOR PORT</span>
                     <span className="text-emerald-700">PORT E (ULTRASONIC)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold border-b pb-2">
                     <span className="text-slate-400">CRITICAL DISTANCE</span>
                     <span className="text-orange-700">50cm OR LESS</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                     <span className="text-slate-400">SIREN PITCH</span>
                     <span className="text-indigo-700">800Hz / 2 SEC</span>
                  </div>
               </div>
            </div>
            <div className="mt-auto border-t-2 border-slate-100 pt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
               <span>THYNKLAB 2026 ©</span>
               <span>Year 5 • Radar Logic</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SampleLogicGuidePage;
