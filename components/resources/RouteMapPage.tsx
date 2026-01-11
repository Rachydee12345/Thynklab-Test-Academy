
import React from 'react';
import { ArrowLeft, Download, Map as MapIcon, Flag, Target, Ruler, Mountain, Radio } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const RouteMapPage: React.FC<Props> = ({ onBack }) => {

  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    const width = 1754; 
    const height = 1240;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    const margin = 100;

    ctx.fillStyle = "#1e293b";
    ctx.font = "900 60px Montserrat, sans-serif";
    ctx.textAlign = 'left';
    ctx.fillText("THYNKLAB", margin, 120);
    ctx.fillStyle = "#7c3aed";
    ctx.font = "500 24px Montserrat, sans-serif";
    ctx.fillText("YEAR 5 • LONDON DEFENSE GRID • 1940", margin, 160);

    const link = document.createElement('a');
    link.download = 'london_defense_grid_map.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in duration-300 font-['Montserrat']">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-indigo-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"><Download size={18} /> Download Grid Map</button>
      </div>
      
      <div className="flex-1 p-8 flex flex-col items-center pb-20">
        <div className="max-w-4xl w-full bg-white rounded-3xl p-6 mb-8 border border-slate-200 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200">
             <Radio size={32} />
           </div>
           <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Defense Grid Map: Sector 7</h3>
              <p className="text-sm font-medium text-slate-500 leading-tight mt-1">Deploy your Watchtowers at the Perimeter, and position Shelters in the Safety Zone.</p>
           </div>
        </div>

        <div className="bg-[#f8fafc] shadow-2xl w-full max-w-[297mm] aspect-[1.414/1] p-[15mm] flex flex-col relative border-[12px] border-slate-900 rounded-sm">
          <div className="mb-6 text-left flex justify-between items-end">
            <div>
               <h1 className="text-4xl font-black text-slate-900 leading-none mb-1">THYNKLAB</h1>
               <p className="text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase">Unit: Air Raid Defense Perimeter</p>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Sector: Central London</span>
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Radar Sweep Zone</h2>
            </div>
          </div>

          <div className="flex-1 border-2 border-dashed border-indigo-100 rounded-3xl relative overflow-hidden bg-white">
             <svg viewBox="0 0 1000 600" className="w-full h-full opacity-30">
                <rect width="100%" height="100%" fill="#EEF2FF" />
                <path d="M 50 300 L 950 300" fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="10 10" />
                <circle cx="500" cy="300" r="150" fill="none" stroke="#6366F1" strokeWidth="4" strokeDasharray="20 10" />
                <circle cx="500" cy="300" r="250" fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="5 5" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                   <div className="w-40 h-40 rounded-full border-4 border-indigo-600/20 animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   <Target size={60} className="text-indigo-600 mx-auto opacity-20" />
                   <p className="font-black text-xs text-indigo-400 uppercase tracking-[0.5em] mt-4">Safe Harbor Area</p>
                </div>
             </div>
          </div>
          <div className="mt-8 flex justify-between items-center">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <Ruler size={16} className="text-slate-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Scale: 1:100 Maker Grid</span>
                </div>
             </div>
             <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>© 1940 MINISTRY OF INFORMATION (THYNKLAB EDITION)</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMapPage;
