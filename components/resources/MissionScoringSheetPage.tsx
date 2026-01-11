
import React from 'react';
import { ArrowLeft, Download, Trophy, Target, Shield, Zap } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const MissionScoringSheetPage: React.FC<Props> = ({ onBack }) => {

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

    ctx.fillStyle = "#0F172A";
    ctx.font = "900 60px Montserrat, sans-serif";
    ctx.textAlign = 'left';
    ctx.fillText("THYNKLAB", margin, 120);
    ctx.fillStyle = "#1E293B";
    ctx.font = "500 24px Montserrat, sans-serif";
    ctx.fillText("MINISTRY OF HOME SECURITY • ASSESSMENT", margin, 160);

    const link = document.createElement('a');
    link.download = 'defense_mission_scoring.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in duration-300 font-['Montserrat']">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-indigo-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"><Download size={18} /> Download Scorecard</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative overflow-hidden border-t-[20px] border-slate-900">
            <div className="mb-8">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1">THYNKLAB</h1>
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">Year 5 Defense Academy</p>
            </div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight uppercase tracking-tight">Ministry Defense Assessment</h2>
              <div className="h-1.5 w-20 bg-indigo-600 rounded-full mt-4"></div>
            </div>
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8 mb-4 flex-1">
               <div className="flex items-center justify-between border-b pb-4 mb-8">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Engineering Criteria</span>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Merit Points</span>
               </div>
               <div className="space-y-10">
                  <div className="flex justify-between items-center group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><Shield size={20} /></div>
                        <div><p className="font-black text-sm uppercase">Tower Rigidity</p><p className="text-[10px] text-slate-500 font-bold">Stable Platform for Spike Hub</p></div>
                     </div>
                     <span className="font-black text-xl text-slate-800">/ 25</span>
                  </div>
                  <div className="flex justify-between items-center group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Zap size={20} /></div>
                        <div><p className="font-black text-sm uppercase">Radar Logic</p><p className="text-[10px] text-slate-500 font-bold">Ultrasonic Accuracy & Feedback</p></div>
                     </div>
                     <span className="font-black text-xl text-slate-800">/ 25</span>
                  </div>
                  <div className="flex justify-between items-center group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center"><Target size={20} /></div>
                        <div><p className="font-black text-sm uppercase">System Synthesis</p><p className="text-[10px] text-slate-500 font-bold">Detection to Door Seal Speed</p></div>
                     </div>
                     <span className="font-black text-xl text-slate-800">/ 50</span>
                  </div>
               </div>
            </div>
            <div className="mt-auto border-t-2 border-slate-100 pt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
               <span>OFFICIAL DEFENSE DOCUMENT 1940</span>
               <span>THYNKLAB ACADEMY</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MissionScoringSheetPage;
