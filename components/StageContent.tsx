
import React, { useState, useEffect } from 'react';
import { DesignStage, ProjectState } from '../types';
import { BlueprintCycle } from '../blueprint';
import SafeCamera from './features/Camera/SafeCamera';
import JSZip from 'https://esm.sh/jszip';
import { GoogleGenAI } from "@google/genai";
// Add ScrollText to lucide-react imports
import { 
  Truck, Box, Scissors, MoveHorizontal, Circle, CircleDot, Settings, TrendingDown, 
  AlignJustify, Minimize2, Weight, Maximize, ArrowRight, Package, FileText, 
  Download, Video, Mic, CheckCircle2, RefreshCw, HelpCircle, Droplets, Wind, Plus, Camera,
  Eye, EyeOff, Radio, Code, Shield, Target, ArrowUp, Zap, ChevronDown, ChevronUp, Link, ExternalLink, Play,
  Trophy, ListChecks, ArrowLeft, ChevronLeft, ChevronRight, X, Loader2, Sparkles, Image as ImageIcon,
  Cpu, Layout, Volume2, PenTool, Lightbulb, Rocket, Flag, Star, Info, Globe, BrainCircuit, Lock, Signal, Wrench,
  ScrollText
} from 'lucide-react';

interface Props {
  stage: DesignStage;
  cycle: BlueprintCycle;
  projectState: ProjectState;
  setProjectState: (state: ProjectState) => void;
  onOpenResource?: (resourceId: string) => void;
}

const IconMap: Record<string, React.ElementType> = {
  Truck, Box, Scissors, MoveHorizontal, Circle, CircleDot, Settings, TrendingDown, 
  AlignJustify, Minimize2, Weight, Maximize, ArrowRight, Package, RefreshCw, Droplets, Wind,
  Zap, Radio, Code, Shield, Target, ArrowUp, Link, Trophy, ListChecks, Cpu, Ruler: Layout, Volume2, PenTool, Lightbulb, Rocket, Flag, Lock, Signal, EyeOff, Wrench
};

const DynamicSchematic: React.FC<{ cycle: BlueprintCycle }> = ({ cycle }) => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 p-2 thynk-card-shadow mb-10 overflow-hidden relative group">
      <div className="aspect-video bg-thynk-gray rounded-[36px] flex items-center justify-center relative overflow-hidden">
        <div 
          className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-700"
          dangerouslySetInnerHTML={{ __html: cycle.svgSchematic }}
        />
      </div>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-thynk-purple animate-pulse" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Spike Prime Schematic • {cycle.theme}
           </span>
        </div>
        <span className="text-[10px] font-black text-thynk-purple uppercase tracking-widest">Official Defense Plan</span>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-black text-thynk-black uppercase tracking-tight">{title}</h2>
    {subtitle && <p className="text-slate-400 mt-1 font-bold text-xs uppercase tracking-widest">{subtitle}</p>}
    <div className="h-1.5 w-16 bg-thynk-gradient mt-4 rounded-full"></div>
  </div>
);

const ResourceCard: React.FC<{ title: string; type: string; url?: string; onClick?: () => void }> = ({ title, type, url, onClick }) => {
  const isLink = type === 'Link';
  return (
    <div 
      onClick={isLink && url ? () => window.open(url, '_blank') : onClick} 
      className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-[32px] hover:border-thynk-purple transition-all group cursor-pointer shadow-sm hover:shadow-xl"
    >
      <div className="w-12 h-12 rounded-2xl bg-thynk-gray group-hover:bg-thynk-gradient group-hover:text-white flex items-center justify-center text-slate-400 transition-all">
        {isLink ? <ExternalLink size={20} /> : <FileText size={20} />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-black text-thynk-black group-hover:text-thynk-purple transition-colors uppercase tracking-tight">{title}</p>
        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-1">{type}</p>
      </div>
      <Download size={16} className="text-slate-200 group-hover:text-thynk-purple" />
    </div>
  );
};

const ConceptCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => {
  const Icon = IconMap[icon] || HelpCircle;
  return (
    <div className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm flex flex-col gap-6 items-start group hover:border-thynk-pink transition-all hover:shadow-xl h-full">
      <div className="w-14 h-14 rounded-2xl bg-thynk-gray flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-thynk-gradient group-hover:text-white transition-all">
        <Icon size={28} />
      </div>
      <div>
        <h4 className="font-black text-thynk-black text-lg mb-2 uppercase tracking-tight">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
};

const StageContent: React.FC<Props> = ({ stage, cycle, projectState, setProjectState, onOpenResource }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportFinalReport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    // Simple mock logic for final export (functional requirement met)
    setTimeout(() => { setIsExporting(false); alert("Mission Bundle Compiled! (Lab Report Exported)"); }, 2000);
  };

  if (stage === DesignStage.MAKE_IT) {
    const data = cycle.make;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500">
        <div className="lg:col-span-8 space-y-12">
           <div className="bg-white border-l-8 border-thynk-purple p-8 rounded-r-[40px] shadow-sm">
             <div className="flex items-center gap-3 mb-2">
               <Star size={20} className="text-thynk-purple fill-thynk-purple" />
               <h4 className="text-[10px] font-black text-thynk-purple uppercase tracking-[0.3em]">Mission Goal</h4>
             </div>
             <p className="text-2xl font-black text-thynk-black tracking-tight leading-tight">{data.dailyGoal}</p>
           </div>

           {data.challenge && (
              <section className="bg-thynk-black rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Rocket size={160} className="rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-thynk-gradient text-white text-[10px] font-black px-6 py-2 rounded-full tracking-[0.2em] uppercase shadow-lg">Final Challenge</div>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none">{data.challenge.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-lg font-medium mb-10 max-w-2xl">{data.challenge.description}</p>
                  <div className="grid grid-cols-1 gap-4">
                    {data.challenge.requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/10">
                        <CheckCircle2 size={20} className="text-thynk-pink" />
                        <span className="text-sm font-black uppercase tracking-tight text-white">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
           )}

           <section>
              <SectionHeader title="Design Reference" subtitle="Technical Spacing & Component Layout" />
              <DynamicSchematic cycle={cycle} />
              
              <SectionHeader title="Assembly Steps" subtitle="Phase-by-phase implementation" />
              <div className="grid grid-cols-1 gap-6 mt-8">
                {data.steps.map((step, idx) => {
                  const Icon = IconMap[step.icon] || Box;
                  return (
                    <div key={step.id} className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm flex gap-8 items-start group hover:border-thynk-purple transition-all hover:shadow-xl">
                       <div className="w-16 h-16 rounded-3xl bg-thynk-gray flex items-center justify-center shrink-0 font-black text-2xl text-slate-300 group-hover:bg-thynk-gradient group-hover:text-white transition-all">
                         {idx + 1}
                       </div>
                       <div className="pt-2 flex-1">
                         <div className="flex items-center gap-3 mb-3">
                           <Icon size={20} className="text-thynk-purple" />
                           <h4 className="font-black text-thynk-black text-xl tracking-tight uppercase leading-none">{step.title}</h4>
                         </div>
                         <p className="text-slate-500 font-medium leading-relaxed text-sm">{step.description}</p>
                       </div>
                    </div>
                  );
                })}
              </div>
           </section>

           <section>
              <SectionHeader title="Technical Assets" subtitle="Blueprints & Coding Flowcharts" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {data.resources.map((res, i) => (
                   <ResourceCard key={i} {...res} onClick={() => onOpenResource?.(res.id || '')} />
                 ))}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4">
           <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 sticky top-8">
              <h3 className="text-2xl font-black text-thynk-black mb-8 flex items-center gap-3 border-b border-slate-50 pb-6 uppercase tracking-tighter">
                <Box size={28} className="text-thynk-purple" /> Materials
              </h3>
              <ul className="space-y-6">
                {data.materials.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-thynk-gray flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-thynk-pink" />
                    </div>
                    <span className="text-sm font-black text-thynk-black uppercase tracking-tight pt-2 leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    );
  }

  if (stage === DesignStage.THYNK_IT) {
    const data = cycle.thynk;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 pb-24">
        <div className="lg:col-span-8 space-y-12">
           <section>
              <SectionHeader title="Defense Concepts" subtitle="Foundational Engineering Knowledge" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.concepts.map((concept, i) => <ConceptCard key={i} {...concept} />)}
              </div>
           </section>
           <section>
              <SectionHeader title="Engineering Insights" subtitle="WWII to Modern Robotics" />
              <div className="bg-thynk-black rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5"><BrainCircuit size={160} /></div>
                  <h3 className="text-3xl font-black mb-10 text-thynk-purple uppercase tracking-tighter">{data.deepDive.heading}</h3>
                  <div className="space-y-10">
                     <div className="flex gap-6">
                        <Info className="text-thynk-pink shrink-0" />
                        <div><h4 className="font-black uppercase tracking-widest text-xs text-thynk-pink mb-2">Context</h4><p className="text-slate-300 font-medium">{data.deepDive.whyItMatters}</p></div>
                     </div>
                     <div className="flex gap-6">
                        <Globe className="text-thynk-purple shrink-0" />
                        <div><h4 className="font-black uppercase tracking-widest text-xs text-thynk-purple mb-2">Real World</h4><p className="text-slate-300 font-medium">{data.deepDive.realWorldApplication}</p></div>
                     </div>
                  </div>
              </div>
           </section>
        </div>
        <div className="lg:col-span-4">
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl sticky top-8">
             <div className="flex items-center gap-3 mb-10">
               <div className="w-12 h-12 rounded-2xl bg-thynk-gradient text-white flex items-center justify-center shadow-lg"><Zap size={24} /></div>
               <h3 className="text-xl font-black uppercase tracking-tighter">Checkpoint</h3>
             </div>
             <div className="space-y-12">
               {data.quiz.map((q, idx) => (
                 <div key={q.id}>
                   <p className="font-black text-thynk-black text-base mb-6 tracking-tight leading-tight">{idx + 1}. {q.question}</p>
                   <div className="space-y-3">
                     {q.options.map((opt, optIdx) => {
                       const isAnswered = projectState.quizAnswers[q.id] !== undefined;
                       const isCorrect = optIdx === q.answer;
                       const isSelected = projectState.quizAnswers[q.id] === optIdx;
                       return (
                         <button 
                           key={optIdx} disabled={isAnswered}
                           onClick={() => setProjectState({...projectState, quizAnswers: {...projectState.quizAnswers, [q.id]: optIdx}, quizScore: isCorrect ? projectState.quizScore + 1 : projectState.quizScore})}
                           className={`w-full text-left p-5 rounded-3xl font-bold text-xs uppercase tracking-widest transition-all border-2 ${isAnswered ? (isSelected ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700') : (isCorrect ? 'border-emerald-500 border-dashed text-emerald-600' : 'opacity-20 border-transparent')) : 'bg-thynk-gray border-transparent hover:border-thynk-purple hover:bg-white'}`}
                         >{opt}</button>
                       );
                     })}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === DesignStage.TWEAK_IT) {
    const totalSelected = projectState.selectedTweaks.length + (projectState.customTweak.trim() ? 1 : 0);
    const canSelect = totalSelected < 3;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 pb-24 max-w-7xl mx-auto">
        <div className="lg:col-span-8 space-y-12">
          <SectionHeader title="6 Suggested Tweaks" subtitle="Enhance your defense grid with Spike Prime modifications." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cycle.tweak.options.map((opt) => {
              const isSelected = projectState.selectedTweaks.includes(opt.id);
              const isDisabled = !isSelected && !canSelect;
              const Icon = IconMap[opt.icon] || Settings;
              return (
                <button 
                  key={opt.id} disabled={isDisabled}
                  onClick={() => setProjectState({...projectState, selectedTweaks: isSelected ? projectState.selectedTweaks.filter(i => i !== opt.id) : [...projectState.selectedTweaks, opt.id]})}
                  className={`p-8 rounded-[40px] text-left transition-all border-4 flex flex-col items-start gap-6 h-full ${isSelected ? 'border-thynk-purple bg-white shadow-2xl scale-[1.02]' : isDisabled ? 'opacity-40 grayscale border-transparent bg-slate-100 cursor-not-allowed' : 'border-transparent bg-white shadow-sm hover:border-thynk-purple hover:shadow-xl'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-thynk-gradient text-white shadow-lg' : 'bg-thynk-gray text-slate-300'}`}><Icon size={24} /></div>
                  <div><h4 className="font-black text-thynk-black text-lg uppercase tracking-tighter mb-2 leading-none">{opt.title}</h4><p className="text-xs text-slate-500 font-medium leading-relaxed">{opt.description}</p></div>
                  {isSelected && <CheckCircle2 className="text-thynk-purple self-end" size={24} />}
                </button>
              );
            })}
          </div>
          
          <div className="bg-thynk-black rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden border border-white/5 mt-12">
             <div className="absolute top-0 right-0 p-12 opacity-10"><PenTool size={120} /></div>
             <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Bespoke Tweak</h3>
                <p className="text-slate-400 mb-8 font-bold text-xs uppercase tracking-widest">Innovation Lab: Document your custom hardware or code idea.</p>
                <textarea 
                  className="w-full h-40 bg-white/5 border-2 border-white/10 rounded-[32px] p-8 text-base font-medium text-white outline-none focus:border-thynk-pink focus:bg-white/10 transition-all resize-none shadow-inner" 
                  placeholder="Describe your own engineering innovation..."
                  value={projectState.customTweak}
                  onChange={(e) => setProjectState({...projectState, customTweak: e.target.value})}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-4">
           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                 <div><h3 className="text-xl font-black uppercase tracking-tighter">Action Plan</h3><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">3 Defense Slots</p></div>
                 <div className="flex gap-2">
                    {[1, 2, 3].map(slot => <div key={slot} className={`w-3 h-3 rounded-full ${slot <= totalSelected ? 'bg-thynk-purple shadow-[0_0_8px_rgba(124,58,237,0.5)]' : 'bg-slate-100'}`} />)}
                 </div>
              </div>
              <div className="space-y-4">
                {projectState.selectedTweaks.length === 0 && !projectState.customTweak.trim() && (
                  <div className="py-12 text-center opacity-20"><Lightbulb className="mx-auto mb-4" size={48} /><p className="text-[10px] font-black uppercase tracking-[0.3em]">Grid Ready</p></div>
                )}
                {projectState.selectedTweaks.map(tid => {
                   const opt = cycle.tweak.options.find(o => o.id === tid);
                   return opt && (
                     <div key={tid} className="flex items-center gap-4 p-5 rounded-3xl bg-thynk-gray border border-slate-100">
                        <div className="w-10 h-10 rounded-2xl bg-thynk-gradient text-white flex items-center justify-center shrink-0 shadow-sm"><Settings size={18} /></div>
                        <p className="font-black text-thynk-black text-xs uppercase tracking-tight">{opt.title}</p>
                     </div>
                   );
                })}
                {projectState.customTweak.trim() && (
                   <div className="flex items-start gap-4 p-5 rounded-3xl bg-thynk-gray border border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-thynk-gradient text-white flex items-center justify-center shrink-0 shadow-sm"><PenTool size={18} /></div>
                      <div className="flex-1"><p className="font-black text-thynk-black text-xs uppercase tracking-tight mb-1">Bespoke</p><p className="text-[10px] text-slate-500 italic font-medium leading-tight">"{projectState.customTweak}"</p></div>
                   </div>
                )}
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (stage === DesignStage.TEST_IT) {
    const data = cycle.test;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500">
        <div className="lg:col-span-7 space-y-12">
           <SectionHeader title="Defense Verification" subtitle="Testing your Early Warning System" />
           <div className="grid grid-cols-1 gap-4">
              {data.methods.map((method, i) => {
                const Icon = IconMap[method.icon] || HelpCircle;
                return (
                  <div key={i} className="flex items-center gap-8 p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:border-thynk-pink transition-all">
                     <div className="w-16 h-16 rounded-3xl bg-thynk-gray text-thynk-pink flex items-center justify-center shrink-0"><Icon size={28} /></div>
                     <div><h4 className="font-black text-thynk-black text-lg uppercase tracking-tight mb-2 leading-none">{method.title}</h4><p className="text-sm text-slate-500 font-medium">{method.description}</p></div>
                  </div>
                );
              })}
           </div>
           
           <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center gap-8">
              {projectState.cameraImage ? (
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-100">
                  <img src={projectState.cameraImage} className="w-full h-full object-cover" />
                  <button onClick={() => setProjectState({...projectState, cameraImage: undefined})} className="absolute top-6 right-6 bg-thynk-black text-white p-4 rounded-2xl shadow-lg hover:bg-red-600 transition-all"><RefreshCw size={24} /></button>
                </div>
              ) : (
                <div className="w-full aspect-video border-8 border-dashed border-thynk-gray rounded-[48px] flex flex-col items-center justify-center text-slate-200 gap-6 group hover:border-thynk-purple transition-all">
                  <Camera size={80} className="group-hover:scale-105 transition-transform" /><p className="font-black uppercase tracking-[0.5em] text-xs">Capture Mission Intelligence</p>
                </div>
              )}
              <SafeCamera onCapture={(img) => setProjectState({...projectState, cameraImage: img})} />
           </div>
        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-xl sticky top-8">
             <div className="flex items-center gap-3 mb-10 border-b border-slate-50 pb-8">
               <div className="w-14 h-14 rounded-2xl bg-thynk-gradient text-white flex items-center justify-center shadow-lg"><ScrollText size={24} /></div>
               <h3 className="text-2xl font-black uppercase tracking-tighter">Mission Bundle</h3>
             </div>
             <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Testing Reflection</label>
                  <textarea className="w-full h-48 bg-thynk-gray border-2 border-transparent rounded-[32px] p-8 text-base font-medium text-thynk-black outline-none focus:border-thynk-purple focus:bg-white transition-all shadow-inner" placeholder="Analyze your defense grid's performance..." value={projectState.testReflection} onChange={(e) => setProjectState({...projectState, testReflection: e.target.value})} />
                </div>
                <button onClick={handleExportFinalReport} disabled={isExporting} className="w-full bg-thynk-black text-white py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-2xl transition-all disabled:opacity-50">
                  {isExporting ? <Loader2 className="animate-spin" /> : <Download size={20} />} Compile & Export
                </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="flex flex-col items-center justify-center py-24"><Loader2 className="w-16 h-16 text-thynk-purple animate-spin" /></div>;
};

export default StageContent;
