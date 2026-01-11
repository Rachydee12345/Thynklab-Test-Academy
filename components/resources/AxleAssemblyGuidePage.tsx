
import React from 'react';
import { ArrowLeft, Download, Shield, AlertCircle, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const AxleAssemblyGuidePage: React.FC<Props> = ({ onBack }) => {

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

    // Header
    ctx.fillStyle = "#0F172A";
    ctx.font = "900 60px Montserrat, sans-serif";
    ctx.textAlign = 'left';
    ctx.fillText("THYNKLAB", margin, 120);
    ctx.fillStyle = "#7C3AED";
    ctx.font = "500 24px Montserrat, sans-serif";
    ctx.fillText("YEAR 5 • SPIKE PRIME WINCH SYSTEM", margin, 160);

    ctx.fillStyle = "#1E293B";
    ctx.font = "800 70px Montserrat, sans-serif";
    ctx.fillText("Motor Coupling Guide", margin, 320);
    
    const diaY = 550;
    const centerX = width / 2;
    
    // Motor Winch Diagram
    ctx.fillStyle = "#7C3AED";
    ctx.beginPath();
    ctx.roundRect(centerX - 100, diaY, 200, 300, 20);
    ctx.fill();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(centerX, diaY + 100, 60, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(centerX, diaY + 100);
    ctx.lineTo(centerX + 200, diaY + 100);
    ctx.stroke();

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 28px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SPIKE MEDIUM MOTOR", centerX, diaY - 40);

    const steps = [
      "1. Align the purple motor disk to the 0-degree mark.",
      "2. Connect a Technic Beam or small Wheel to the center hub.",
      "3. Loop your defense string through the Technic hole.",
      "4. Secure with a Technic friction peg to prevent slipping!"
    ];

    let currentY = 1000;
    steps.forEach((step, i) => {
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.arc(margin + 40, currentY - 15, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "700 30px Montserrat, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText((i + 1).toString(), margin + 40, currentY - 5);
      ctx.fillStyle = "#1E293B";
      ctx.font = "500 30px Montserrat, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(step.substring(3), margin + 100, currentY);
      currentY += 120;
    });

    const link = document.createElement('a');
    link.download = 'spike_motor_winch_guide.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 font-['Montserrat']">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"><Download size={18} /> Download Guide</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative select-none border-t-[20px] border-indigo-600">
            <div className="mb-10 text-left">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1">THYNKLAB</h1>
              <p className="text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase">Year 5 • Air Raid Defense</p>
            </div>
            <div className="mb-8 text-left">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight uppercase tracking-tight">Spike Motor Winch Guide</h2>
              <div className="h-1.5 w-20 bg-indigo-200 rounded-full mt-4"></div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-10 flex-1 overflow-hidden relative flex flex-col items-center justify-center">
                <p className="absolute top-4 left-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Winch Assembly Logic</p>
                <div className="w-full flex flex-col items-center justify-center gap-8">
                   <svg viewBox="0 0 400 300" className="w-full h-48">
                      <rect x="150" y="80" width="100" height="140" rx="10" fill="#7C3AED" />
                      <circle cx="200" cy="150" r="40" fill="white" />
                      <line x1="200" y1="150" x2="350" y2="150" stroke="#334155" stroke-width="8" stroke-dasharray="10 5" />
                      <RefreshCw size={40} className="text-indigo-200 opacity-20" />
                   </svg>
                   <div className="flex items-center gap-4 text-indigo-700 bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                      <AlertCircle size={20} />
                      <p className="text-xs font-black uppercase tracking-tight">Convert Spin to Pull!</p>
                   </div>
                </div>
            </div>
            <div className="mt-auto border-t-2 border-slate-100 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
               <span>THYNKLAB 2026 ©</span>
               <span>Unit: Automated Shelters</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AxleAssemblyGuidePage;
