
import React from 'react';
import { ArrowLeft, Download, Scissors, Box } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ChassisTemplatePage: React.FC<Props> = ({ onBack }) => {

  const drawLogoOnCanvas = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const scale = size / 32;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    const grad = ctx.createLinearGradient(4, 4, 28, 28);
    grad.addColorStop(0, '#7C3AED');
    grad.addColorStop(0.55, '#EC4899');
    grad.addColorStop(0.80, '#F97316');
    grad.addColorStop(1, '#FACC15');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(4, 4);
    ctx.lineTo(16, 16);
    ctx.lineTo(16, 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(28, 4);
    ctx.lineTo(16, 16);
    ctx.stroke();
    ctx.restore();
  };

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
      drawLogoOnCanvas(ctx, margin, 75, 48);
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 60px Montserrat, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText("THYNKLAB", margin + 65, 120);
      ctx.fillStyle = "#64748B";
      ctx.font = "500 24px Montserrat, sans-serif";
      ctx.fillText("YEAR 5 • AIR RAID DEFENSE ACADEMY", margin, 160);
      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.roundRect(margin, 200, width - (margin * 2), 6, 3);
      ctx.fill();
    };

    const drawFooter = () => {
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, height - 120, width, 120);
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 18px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillText(`THYNKLAB 2026 © • UNIT: ANDERSON SHELTER ARCH TEMPLATE`, width / 2, height - 60);
    };

    drawHeader();
    drawFooter();

    ctx.fillStyle = "#1E293B";
    ctx.font = "800 70px Montserrat, sans-serif";
    ctx.fillText("Shelter Arch Blueprint", margin, 320);
    
    const steps = [
      "1. Print this template on A4 paper (100% scale).",
      "2. Cut out the rectangle along the dashed line.",
      "3. Trace onto flexible corrugated cardboard.",
      "4. Gently curve the cardboard to form the protective arch."
    ];

    let stepY = 400;
    steps.forEach(step => {
      ctx.fillStyle = "#475569";
      ctx.font = "500 28px Montserrat, sans-serif";
      ctx.fillText(step, margin, stepY);
      stepY += 50;
    });

    // Schematic
    const diaX = width / 2;
    const diaY = 1000;
    ctx.strokeStyle = "#7C3AED";
    ctx.lineWidth = 4;
    ctx.setLineDash([15, 10]);
    ctx.strokeRect(diaX - 300, diaY - 200, 600, 800);
    
    ctx.setLineDash([]);
    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(diaX - 300, diaY - 200, 600, 800);
    
    ctx.fillStyle = "#94A3B8";
    ctx.font = "900 24px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SHELTER WALL (FLAT)", diaX, diaY + 50);

    const link = document.createElement('a');
    link.download = 'anderson_shelter_template.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 font-['Montserrat']">
      <div className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold uppercase text-xs tracking-widest transition-colors"><ArrowLeft size={16} /> Back to Workbench</button>
        <button onClick={handleDownloadPNG} className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"><Download size={18} /> Download Template</button>
      </div>
      <div className="flex-1 p-8 flex justify-center pb-20">
         <div className="bg-white shadow-2xl w-full max-w-[210mm] aspect-[1/1.414] p-[20mm] flex flex-col relative border-t-[20px] border-[#7C3AED]">
            <div className="mb-10 text-left">
              <h1 className="text-4xl font-black text-slate-900 leading-none mb-1 text-indigo-900">THYNKLAB</h1>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#7C3AED] uppercase">Air Raid Defense Unit</p>
            </div>
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight uppercase tracking-tight">Anderson Shelter Arch Template</h2>
              <div className="h-1.5 w-20 bg-indigo-200 rounded-full mt-4"></div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 relative p-12">
               <div className="absolute top-4 right-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Structural Blueprint</div>
               <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-xl">
                  <rect x="50" y="50" width="200" height="300" fill="none" stroke="#7C3AED" stroke-width="2" stroke-dasharray="10 5" />
                  <rect x="60" y="60" width="180" height="280" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2" rx="4" />
                  <text x="150" y="210" textAnchor="middle" font-family="Montserrat" font-weight="900" font-size="14" fill="#94A3B8" opacity="0.4" transform="rotate(-90 150 210)">SHELTER WALL</text>
               </svg>
            </div>
            <div className="mt-8 bg-white border border-slate-100 rounded-2xl p-6">
               <div className="flex items-center gap-2 mb-4 text-[#7C3AED]">
                 <Scissors size={18} />
                 <h3 className="font-bold text-xs uppercase tracking-widest">Construction Note</h3>
               </div>
               <p className="text-slate-800 font-bold text-xs leading-relaxed text-left">
                 Fold the cardboard across the vertical grain to ensure a smooth, strong curve. Triangulate your base supports for maximum shelter stability!
               </p>
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

export default ChassisTemplatePage;
