
import React, { useState, useEffect, useRef } from 'react';
import { DesignStage, ProjectState, INITIAL_PROJECT_STATE, InfractionLog } from './types';
import { blueprint, BlueprintCycle } from './blueprint';
import { supabase } from './supabaseClient';
import StageContent from './components/StageContent';
import AICoachWrapper from './components/features/AICoach';
import DevTools from './components/dev/DevTools';
import ThynkLogo from './components/ui/ThynkLogo';
import ChassisTemplatePage from './components/resources/ChassisTemplatePage';
import AxleAssemblyGuidePage from './components/resources/AxleAssemblyGuidePage';
import MountingInstructionsPage from './components/resources/MountingInstructionsPage';
import SampleLogicGuidePage from './components/resources/SampleLogicGuidePage';
import MissionScoringSheetPage from './components/resources/MissionScoringSheetPage';
import RouteMapPage from './components/resources/RouteMapPage';
import TeacherSupportPage from './components/resources/TeacherSupportPage';
import JSZip from 'https://esm.sh/jszip';
import { drawTeacherSupportPage } from './utils/teacherSupportCanvas';
import { 
  ChevronRight, Triangle, Menu, Truck, Zap, Code, Trophy, 
  Share2, Link as LinkIcon, Check, FileText, Lock, GraduationCap,
  Settings, Rocket, FlaskConical, Lightbulb, Box, Download, Loader2,
  ShieldAlert, X, AlertOctagon, History, ShieldX, UserX, Clock,
  LayoutDashboard, Users, Play, RotateCcw, Copy, ExternalLink, ScrollText, Flag,
  Hammer, Wrench, CheckCircle2, ArrowLeft, ShieldCheck, ArrowRight
} from 'lucide-react';

const stages = Object.values(DesignStage);

type ViewState = 
  | 'WORKBENCH' 
  | 'CHASSIS_TEMPLATE' 
  | 'AXE_GUIDE'
  | 'COUPLING_INSTRUCTIONS' 
  | 'SAMPLE_LOGIC_GUIDE' 
  | 'LOGIC_GUIDE_1' 
  | 'LOGIC_GUIDE_2' 
  | 'MISSION_SCORING_SHEET'
  | 'ROUTE_MAP'
  | 'TEACHER_SUPPORT'
  | 'SAFETY_CENTER';

const IconMap: Record<string, any> = {
  Truck, Zap, Code, Trophy, Settings, Rocket, FlaskConical, Lightbulb, Box
};

const StageIcon = ({ type, size = 20 }: { type: string, size?: number }) => {
  switch (type) {
    case 'MAKE IT': return <Hammer size={size} />;
    case 'THYNK IT': return <Lightbulb size={size} />;
    case 'TWEAK IT': return <Wrench size={size} />;
    case 'TEST IT': return <CheckCircle2 size={size} />;
    default: return <Settings size={size} />;
  }
};

const PasswordLock: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.toLowerCase() === blueprint.security.appPassword.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setPass('');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-thynk-black flex flex-col items-center justify-center p-6">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
         <ThynkLogo />
         <div className="mt-4 text-center">
            <p className="text-[10px] font-black text-thynk-purple uppercase tracking-[0.5em] mb-1">ThynkLab</p>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Authorized Access Only</p>
         </div>
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className={`bg-white/5 border-2 rounded-[48px] p-12 backdrop-blur-xl transition-all duration-300 ${error ? 'border-red-500 shake' : 'border-white/10 shadow-2xl'}`}>
          <div className="mb-10 text-center">
             <div className="w-20 h-20 rounded-[32px] bg-thynk-gradient flex items-center justify-center mx-auto mb-8 shadow-xl shadow-thynk-purple/20">
                <Lock size={32} className="text-white" />
             </div>
             <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Access Terminal</h2>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Enter mission deployment code<br/>to initialize makerspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input 
                autoFocus
                type="password" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border-2 border-white/10 rounded-[32px] py-6 px-8 text-center text-white font-black tracking-[1em] outline-none focus:border-thynk-purple focus:bg-white/10 transition-all placeholder:tracking-normal placeholder:opacity-20"
              />
              {pass && !error && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-thynk-purple animate-pulse">
                  <ShieldCheck size={24} />
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-thynk-gradient text-white py-6 rounded-[32px] font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-thynk-purple/30 hover:shadow-thynk-purple/50 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Verify Credentials <ArrowRight size={16} />
            </button>
          </form>
        </div>
        
        <p className="mt-12 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">
           System Environment: {blueprint.unit.id}<br/>
           &copy; 2026 ThynkLab Education Technology
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}} />
    </div>
  );
};

const App: React.FC = () => {
  const [isAppUnlocked, setIsAppUnlocked] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<BlueprintCycle | null>(null);
  const [currentStage, setCurrentStage] = useState<DesignStage>(DesignStage.MAKE_IT);
  const [projectState, setProjectState] = useState<ProjectState>(INITIAL_PROJECT_STATE);
  const [isCoachMinimized, setIsCoachMinimized] = useState(false);
  const [copiedCycleId, setCopiedCycleId] = useState<string | null>(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [view, setView] = useState<ViewState>('WORKBENCH');
  const [isZippingSupport, setIsZippingSupport] = useState(false);
  const [activeBreach, setActiveBreach] = useState<InfractionLog | null>(null);
  const [allBreaches, setAllBreaches] = useState<InfractionLog[]>([]);
  const [activeRoomCode, setActiveRoomCode] = useState<string | null>(() => new URLSearchParams(window.location.search).get('room'));

  useEffect(() => {
    if (activeRoomCode && isTeacherMode) {
      supabase
        .from('infraction_logs')
        .select('*')
        .eq('room_id', activeRoomCode)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (data && !error) {
            const mappedLogs: InfractionLog[] = data.map(item => ({
              message: item.content,
              timestamp: new Date(item.created_at).toLocaleTimeString(),
              stage: 'Cloud Sync',
              reason: item.severity,
              schoolName: blueprint.security.schoolName,
              sessionId: item.room_id
            }));
            setAllBreaches(mappedLogs);
          }
        });
    }

    const channel = supabase
      .channel(`safety-monitoring-${activeRoomCode}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'infraction_logs', filter: activeRoomCode ? `room_id=eq.${activeRoomCode}` : undefined }, (payload) => {
          const item = payload.new;
          const breach: InfractionLog = { message: item.content, timestamp: new Date(item.created_at).toLocaleTimeString(), stage: 'Live Alert', reason: item.severity, schoolName: blueprint.security.schoolName, sessionId: item.room_id };
          setActiveBreach(breach);
          setAllBreaches(prev => [breach, ...prev]);
        }
      ).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activeRoomCode, isTeacherMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTeacherMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  const handleResetSession = () => {
    if (window.confirm("Are you sure you want to reset your mission? All progress will be lost.")) {
      setSelectedCycle(null);
      setCurrentStage(DesignStage.MAKE_IT);
      setProjectState(INITIAL_PROJECT_STATE);
      setView('WORKBENCH');
    }
  };

  const handleStartSession = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setActiveRoomCode(code);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('room', code);
    window.history.pushState({}, '', newUrl);
  };

  const handleCopyClassroomLink = (cycleId?: string) => {
    const url = new URL(window.location.href);
    if (activeRoomCode) url.searchParams.set('room', activeRoomCode);
    if (cycleId) url.searchParams.set('cycle', cycleId);
    navigator.clipboard.writeText(url.toString());
    setCopiedCycleId(cycleId || 'global');
    setTimeout(() => setCopiedCycleId(null), 2000);
  };

  const handleShareToClassroom = (e: React.MouseEvent, cycle: BlueprintCycle) => {
    e.stopPropagation();
    const url = new URL(window.location.href);
    if (activeRoomCode) url.searchParams.set('room', activeRoomCode);
    url.searchParams.set('cycle', cycle.id);
    const shareUrl = `https://classroom.google.com/u/0/share?url=${encodeURIComponent(url.toString())}&title=${encodeURIComponent(`STEM Mission: ${cycle.title}`)}`;
    window.open(shareUrl, '_blank');
  };

  const handleDownloadAllTeacherSupport = async () => {
    if (isZippingSupport) return;
    setIsZippingSupport(true);
    try {
      await document.fonts.ready;
      const zip = new JSZip();
      for (const cycle of blueprint.cycles) {
        const cycleFolder = zip.folder(`Cycle_${cycle.id}`);
        if (!cycleFolder) continue;
        for (let p = 1; p <= 5; p++) {
          const canvas = drawTeacherSupportPage(cycle, p);
          const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
          if (blob) cycleFolder.file(`Page_${p}.png`, blob);
        }
      }
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.download = `ThynkLab_Teacher_Pack.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
    } catch (err) { console.error(err); } finally { setIsZippingSupport(false); }
  };

  const SafetyBreachToast = () => {
    if (!activeBreach || !isTeacherMode || view === 'SAFETY_CENTER') return null;
    return (
      <div className="fixed bottom-6 right-6 z-[100] w-96 bg-red-950 border-2 border-red-500 rounded-[32px] p-6 text-white shadow-2xl animate-in slide-in-from-right-10 duration-500 font-sans">
         <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center animate-pulse"><AlertOctagon size={20} /></div>
               <div>
                 <h4 className="font-black uppercase tracking-tight text-red-100">Safeguarding Breach</h4>
                 <p className="text-[10px] font-black tracking-widest text-red-400 uppercase">Action Required</p>
               </div>
            </div>
            <button onClick={() => setActiveBreach(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={18} /></button>
         </div>
         <p className="text-xs font-bold italic text-red-100/90 leading-tight">"{activeBreach.reason}"</p>
         <div className="mt-6 flex items-center gap-3">
            <button onClick={() => { setView('SAFETY_CENTER'); setActiveBreach(null); }} className="flex-1 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Safety Center</button>
            <button onClick={() => setActiveBreach(null)} className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Dismiss</button>
         </div>
      </div>
    );
  };

  if (!isAppUnlocked) {
    return <PasswordLock onUnlock={() => setIsAppUnlocked(true)} />;
  }

  if (!selectedCycle && view === 'WORKBENCH') {
    return (
      <div className={`min-h-screen bg-thynk-gray text-thynk-black flex flex-col items-center p-6 relative overflow-y-auto pb-24`}>
        {isTeacherMode && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
             <button onClick={() => setView('SAFETY_CENTER')} className={`bg-thynk-black text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 ${allBreaches.length > 0 ? 'ring-2 ring-red-500 animate-pulse' : ''}`}>
              <ShieldAlert size={16} /> Safety Center
            </button>
            <button onClick={handleDownloadAllTeacherSupport} disabled={isZippingSupport} className="bg-thynk-black text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 disabled:opacity-50">
              {isZippingSupport ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Support Pack
            </button>
          </div>
        )}
        <div className="relative z-10 max-w-5xl w-full pt-12">
           <div className="flex flex-col items-center justify-center mb-10">
              <ThynkLogo />
              <div className="text-center mt-4">
                <div className="font-black text-[11px] tracking-[0.5em] text-thynk-purple uppercase mb-1">ThynkLab</div>
                <div className="font-bold tracking-[0.3em] text-sm uppercase opacity-80">Where Future Skills Begin</div>
              </div>
           </div>

           <div className="text-center mb-12">
              <h1 className="text-center text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase leading-tight">Year {blueprint.unit.yearGroup} – {blueprint.unit.title}</h1>
              <div className="h-1.5 w-24 bg-thynk-gradient mx-auto rounded-full"></div>
           </div>

           <div className="mb-12 bg-white thynk-card-shadow rounded-[40px] p-10 max-w-4xl mx-auto border border-thynk-purple/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <ScrollText size={140} className="rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-thynk-gradient flex items-center justify-center shadow-lg shadow-thynk-purple/20">
                    <Flag size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-thynk-purple">The ThynkLink</h2>
                </div>
                <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed italic">
                  "{blueprint.unit.thynkLink.context}"
                </p>
                <div className="mt-8 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ministry Protocol Active</span>
                </div>
              </div>
           </div>

           <div className="mb-16 bg-white/80 backdrop-blur-md border border-slate-100 rounded-[40px] p-8 max-w-2xl mx-auto shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-left w-full">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeRoomCode ? 'bg-thynk-gradient text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-thynk-purple uppercase tracking-widest mb-1">Classroom Hub</p>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-thynk-black">
                      {activeRoomCode ? `Session ID: ${activeRoomCode}` : 'No Active Session'}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {!activeRoomCode ? (
                    <button onClick={handleStartSession} className="bg-thynk-black text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl hover:bg-slate-900">
                      <Play size={14} /> Initialize Hub
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleCopyClassroomLink()} className="bg-thynk-gray border border-slate-200 text-thynk-black px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 hover:bg-white">
                        {copiedCycleId === 'global' ? <Check size={14} className="text-emerald-600" /> : <LinkIcon size={14} />} 
                        {copiedCycleId === 'global' ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={() => { setActiveRoomCode(null); const url = new URL(window.location.href); url.searchParams.delete('room'); window.history.pushState({}, '', url); }} className="p-3 text-slate-400 hover:text-red-500 transition-colors">
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blueprint.cycles.map((cycle) => {
                const Icon = IconMap[cycle.theme] || Box;
                return (
                  <div key={cycle.id} onClick={() => setSelectedCycle(cycle)} className="cursor-pointer group flex flex-col bg-white rounded-[32px] p-8 border border-slate-100 hover:border-thynk-purple transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl relative h-full">
                    <div className="h-14 w-14 rounded-2xl bg-thynk-gray text-thynk-purple flex items-center justify-center mb-6 group-hover:bg-thynk-gradient group-hover:text-white transition-all"><Icon className="w-6 h-6" /></div>
                    <h3 className="text-lg font-black text-thynk-black mb-2 leading-tight uppercase tracking-tight group-hover:text-thynk-purple transition-colors">{cycle.title}</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">{cycle.theme}</p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); handleShareToClassroom(e, cycle); }} className="w-10 h-10 rounded-xl bg-thynk-gray hover:bg-slate-200 flex items-center justify-center transition-all grayscale opacity-50 hover:grayscale-0 hover:opacity-100"><img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png" className="w-5 h-5" /></button>
                          <button onClick={(e) => { e.stopPropagation(); handleCopyClassroomLink(cycle.id); }} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${copiedCycleId === cycle.id ? 'bg-emerald-500 text-white' : 'bg-thynk-gray hover:bg-slate-200 text-slate-400'}`}>{copiedCycleId === cycle.id ? <Check size={18} /> : <LinkIcon size={18} />}</button>
                       </div>
                       <ChevronRight size={20} className="text-slate-300 group-hover:text-thynk-purple transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
           </div>

           <div className="mt-24 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-all">
              <button onClick={() => setIsTeacherMode(!isTeacherMode)} className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest py-3 px-6 rounded-full border transition-all ${isTeacherMode ? 'bg-thynk-black text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-thynk-purple'}`}>{isTeacherMode ? <Lock size={14} /> : <GraduationCap size={16} />}{isTeacherMode ? "Exit Teacher Mode" : "Teacher Command"}</button>
           </div>
        </div>
        <SafetyBreachToast />
        <DevTools />
      </div>
    );
  }

  const handleNextStage = () => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) setCurrentStage(stages[currentIndex + 1]);
  };

  return (
    <div className={`flex h-screen w-full bg-thynk-gray font-sans overflow-hidden`}>
      <aside className="w-72 bg-thynk-black text-white flex flex-col shrink-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-10 cursor-pointer group" onClick={() => { setSelectedCycle(null); setView('WORKBENCH'); }}>
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <ThynkLogo />
            </div>
            <div>
              <div className="text-[9px] font-black text-thynk-purple uppercase tracking-[0.3em] mb-1">ThynkLab</div>
              <h1 className="font-black text-lg leading-none tracking-widest uppercase">Makerspace</h1>
            </div>
          </div>
          <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-4 pl-3">Design Cycle</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {stages.map((stage, idx) => {
            const isActive = currentStage === stage;
            return (
              <button key={stage} onClick={() => { setCurrentStage(stage); setView('WORKBENCH'); }} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-thynk-gradient text-white shadow-xl shadow-thynk-purple/20' : 'text-slate-500 hover:text-white'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                    <StageIcon type={stage} size={16} />
                  </div>
                  <span className={`text-xs font-black tracking-[0.15em] uppercase ${isActive ? 'text-white' : 'text-slate-500'}`}>{stage}</span>
                </div>
                {isActive && <Triangle className="w-2 h-2 fill-current rotate-90" />}
              </button>
            );
          })}
        </nav>
        <div className="p-6 space-y-3">
          <button onClick={handleResetSession} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group">
            <RotateCcw size={16} className="group-hover:rotate-[-90deg] transition-transform duration-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Reset Session</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            {view === 'CHASSIS_TEMPLATE' && <ChassisTemplatePage onBack={() => setView('WORKBENCH')} />}
            {view === 'AXE_GUIDE' && <AxleAssemblyGuidePage onBack={() => setView('WORKBENCH')} />}
            {view === 'COUPLING_INSTRUCTIONS' && <MountingInstructionsPage onBack={() => setView('WORKBENCH')} />}
            {view === 'SAMPLE_LOGIC_GUIDE' && <SampleLogicGuidePage type="GENERAL" onBack={() => setView('WORKBENCH')} />}
            {view === 'LOGIC_GUIDE_1' && <SampleLogicGuidePage type="START_STOP" onBack={() => setView('WORKBENCH')} />}
            {view === 'LOGIC_GUIDE_2' && <SampleLogicGuidePage type="TURNS_MOVES" onBack={() => setView('WORKBENCH')} />}
            {view === 'MISSION_SCORING_SHEET' && <MissionScoringSheetPage onBack={() => setView('WORKBENCH')} />}
            {view === 'ROUTE_MAP' && <RouteMapPage onBack={() => setView('WORKBENCH')} />}
            {view === 'TEACHER_SUPPORT' && selectedCycle && <TeacherSupportPage cycle={selectedCycle} onBack={() => setView('WORKBENCH')} />}
            {view === 'SAFETY_CENTER' && <div className="p-12"><button onClick={() => setView('WORKBENCH')} className="text-thynk-purple font-black uppercase mb-8 flex items-center gap-2"><ArrowLeft size={16}/> Back</button><h2 className="text-4xl font-black mb-8">Safety Logs</h2><div className="space-y-4">{allBreaches.map((b,i) => <div key={i} className="bg-white p-6 rounded-3xl border border-red-100"><p className="font-black text-red-600 mb-2">{b.reason}</p><p className="text-sm font-medium italic">"{b.message}"</p></div>)}</div></div>}
            {view === 'WORKBENCH' && selectedCycle && (
              <div className="p-6 md:p-12 max-w-6xl mx-auto pb-24">
                  <header className="mb-10"><h1 className="text-3xl md:text-5xl font-black text-thynk-black mb-2 uppercase tracking-tight leading-tight">{currentStage}<span className="text-thynk-purple">.</span></h1><p className="text-slate-400 text-lg font-bold uppercase tracking-widest">{selectedCycle.title}</p></header>
                  <StageContent stage={currentStage} cycle={selectedCycle} projectState={projectState} setProjectState={setProjectState} onOpenResource={(id) => {
                         if (id === 'CHASSIS_TEMPLATE') setView('CHASSIS_TEMPLATE');
                         if (id === 'AXE_GUIDE') setView('AXE_GUIDE');
                         if (id === 'COUPLING_INSTRUCTIONS') setView('COUPLING_INSTRUCTIONS');
                         if (id === 'SAMPLE_LOGIC_GUIDE') setView('SAMPLE_LOGIC_GUIDE');
                         if (id === 'LOGIC_GUIDE_1') setView('LOGIC_GUIDE_1');
                         if (id === 'LOGIC_GUIDE_2') setView('LOGIC_GUIDE_2');
                         if (id === 'MISSION_SCORING_SHEET') setView('MISSION_SCORING_SHEET');
                         if (id === 'ROUTE_MAP') setView('ROUTE_MAP');
                  }} />
                  <div className="mt-16 flex justify-end">{currentStage !== DesignStage.TEST_IT && ( <button onClick={handleNextStage} className="group flex items-center gap-4 px-10 py-5 bg-thynk-black text-white rounded-3xl hover:shadow-2xl transition-all"><span className="font-black uppercase tracking-widest text-xs">Proceed to {stages[stages.indexOf(currentStage) + 1]}</span><ChevronRight className="w-4 h-4" /></button> )}</div>
              </div>
            )}
        </div>
        {selectedCycle && view === 'WORKBENCH' && (
          <div className={`hidden lg:flex border-l border-slate-100 bg-white shrink-0 transition-all duration-300 ease-in-out ${isCoachMinimized ? 'w-20' : 'w-[420px]'}`}>
              <AICoachWrapper stage={currentStage} projectState={projectState} setProjectState={setProjectState} minimized={isCoachMinimized} onToggle={() => setIsCoachMinimized(!isCoachMinimized)} />
          </div>
        )}
      </main>
      <SafetyBreachToast />
      <DevTools />
    </div>
  );
};

export default App;
