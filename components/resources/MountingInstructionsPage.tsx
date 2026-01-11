
import React from 'react';
import { ArrowLeft, Download, Scissors, Link as LinkIcon, Zap, Target, Cpu } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const MountingInstructionsPage: React.FC<Props> = ({ onBack }) => {

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
      ctx.fillText("YEAR 5 • SPIKE HARD-POINT MOUNTING", margin, 160);
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.roundRect(margin, 200, width - (margin * 2), 6, 3);
      ctx.fill();
    };

    drawHeader();

    ctx.fillStyle = "#1E293B";
    ctx.font = "800 70px Montserrat, sans-serif";
    ctx.fillText("Hub & Sensor Mounting", margin, 320);
    
    const steps = [
      "1. Prepare Tower Deck: Ensure the top plate is level and rigid.",
      "2. Hub Alignment: Place the Spike Hub in the center for balance.",
      "3. Sensor Placement: Mount the Ultrasonic sensor on the edge.",
      "4. Wire Management: Use Technic pegs or elastic bands to tidy cables.",
      "5. Power Test: Can you reach the Hub's button without the tower tilting?"
    ];

    let stepY = 450;
    steps.forEach(step => {
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.arc(margin + 40, stepY - 10, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1E293B";
      ctx.font = "500 32px Montserrat, sans-serif";
      ctx.fillText(step, margin + 70, stepY);
      stepY += 100;
    });

    const link = document.createElement('a');
    link.download = 'spike_mounting_guide.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 font-['Montserrat']">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"><Download size={18} /> Download as PNG</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative select-none border-t-[20px] border-indigo-600">
            <div className="mb-10 text-left">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1 text-indigo-900">THYNKLAB</h1>
              <p className="text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase">Spike Prime Integration</p>
            </div>
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-extrabold text-indigo-600 leading-tight uppercase tracking-tight">Hub & Sensor Mounting</h2>
              <div className="h-1.5 w-20 bg-indigo-100 rounded-full mt-4"></div>
            </div>
            <div className="bg-slate-50 border-2 border-indigo-100 rounded-3xl p-8 mb-8 flex-1 flex flex-col items-center justify-center">
               <p className="absolute top-4 left-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Mass Distribution Guide</p>
               <svg viewBox="0 0 400 200" className="w-full">
                  <rect x="150" y="50" width="100" height="100" rx="10" fill="#FACC15" stroke="#1E293B" stroke-width="4" />
                  <circle cx="170" cy="180" r="10" fill="#334155" />
                  <circle cx="230" cy="180" r="10" fill="#334155" />
                  <rect x="160" y="160" width="80" height="20" rx="4" fill="#E2E8F0" />
                  <text x="200" y="105" textAnchor="middle" font-family="Montserrat" font-weight="900" font-size="12" fill="#1E293B">SPIKE HUB</text>
                  <text x="200" y="145" textAnchor="middle" font-family="Montserrat" font-weight="900" font-size="8" fill="#7C3AED">CENTER OF MASS</text>
               </svg>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6">
               <div className="flex items-center gap-2 mb-4 text-indigo-600">
                 <Cpu size={18} />
                 <h3 className="font-bold text-xs uppercase tracking-widest">Mounting Hardware</h3>
               </div>
               <div className="space-y-4">
                 {[
                   { icon: Target, text: "Hub buttons must be accessible for manual start/stop." },
                   { icon: Zap, text: "Ultrasonic sensor eyes must be clear of structural struts." }
                 ].map((step, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm"><step.icon size={16} /></div>
                     <p className="text-indigo-950 font-bold text-xs leading-snug text-left">{step.text}</p>
                   </div>
                 ))}
               </div>
            </div>
            <div className="mt-auto border-t-2 border-slate-100 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
               <span>THYNKLAB 2026 ©</span>
               <span>Year 5 • Air Raid Defense</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MountingInstructionsPage;
