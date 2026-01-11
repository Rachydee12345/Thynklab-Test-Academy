
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Lock, PanelRightClose, PanelRightOpen, ShieldAlert, CheckCircle2, Send, Loader2, AlertTriangle, Wallet, ShieldCheck, ShieldX, History, UserX, Clock, Trash2 } from 'lucide-react';
import { DesignStage, ProjectState, InfractionLog } from '../../../types';
import { GoogleGenAI } from "@google/genai";
import { blueprint } from '../../../blueprint';
import { supabase } from '../../../supabaseClient';

interface Props {
  stage: DesignStage;
  projectState: ProjectState;
  setProjectState: (state: ProjectState) => void;
  minimized?: boolean;
  onToggle?: () => void;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const StubCoach: React.FC<Props> = ({ stage, projectState, setProjectState, minimized, onToggle }) => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSafetyLocked, setIsSafetyLocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const security = blueprint.security;
  const activeRoom = new URLSearchParams(window.location.search).get('room');

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password.toLowerCase() === security.chatbotPassword.toLowerCase()) {
      setIsUnlocked(true);
      setPassword('');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: { systemInstruction: `ThynkBot Year 5 Engineering Mentor. Context: ${blueprint.unit.title}. Tone: Professional, Intelligent. Stage: ${stage}.` }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Command accepted. System standby." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Signal interruption. Please retry." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (minimized) {
    return (
      <div className="flex flex-col h-full bg-white items-center py-8 border-l border-slate-100">
        <button onClick={onToggle} className="p-3 rounded-2xl bg-thynk-gray text-slate-400 mb-8 hover:text-thynk-purple transition-all"><PanelRightOpen size={24} /></button>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-thynk-gradient text-white' : 'bg-slate-100 text-slate-400'}`}><Bot size={20} /></div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="flex flex-col h-full bg-thynk-black w-full text-white overflow-hidden font-sans">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-thynk-purple"><ShieldAlert size={20} /></div><div><h3 className="font-black uppercase text-sm tracking-widest leading-none mb-1">ThynkBot v5</h3><p className="text-[9px] text-slate-500 font-black tracking-widest uppercase">Encryption Active</p></div></div>
          <button onClick={onToggle} className="p-2 text-slate-500 hover:text-white"><PanelRightClose size={20} /></button>
        </div>
        <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 rounded-[32px] bg-white/5 flex items-center justify-center text-thynk-purple mb-8 border border-white/10"><Lock size={32} /></div>
           <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">Terminal Locked</h4>
           <p className="text-xs text-slate-400 mb-10 max-w-[200px]">Unauthorized access is prohibited. Enter defense pulse code.</p>
           <form onSubmit={handleUnlock} className="w-full space-y-4">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border-2 border-white/10 rounded-3xl py-5 px-6 text-center font-black tracking-[0.5em] outline-none focus:border-thynk-purple transition-all" />
              <button type="submit" className="w-full bg-thynk-gradient text-white py-5 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl hover:opacity-90 active:scale-95 transition-all">Initialize Assistant</button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-thynk-gray w-full animate-in fade-in duration-500 font-sans">
      <div className="p-8 border-b border-slate-100 bg-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-thynk-gradient text-white flex items-center justify-center shadow-lg"><Bot size={24} /></div>
          <div>
            <div className="flex items-center gap-2 leading-none mb-1"><h3 className="font-black text-thynk-black text-sm uppercase tracking-tight">ThynkBot</h3><ShieldCheck size={14} className="text-emerald-500" /></div>
            <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase">Tactical Support Active</p>
          </div>
        </div>
        <button onClick={onToggle} className="p-3 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"><PanelRightClose size={20} /></button>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-20 opacity-20"><Bot className="mx-auto mb-6 text-thynk-purple" size={60} /><p className="text-[10px] font-black text-thynk-black uppercase tracking-[0.4em] max-w-[200px] mx-auto">Awaiting Strategic Query</p></div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4`}>
            <div className={`max-w-[90%] px-6 py-4 rounded-[32px] text-sm font-bold leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-thynk-black text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'}`}>{msg.text}</div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-white px-5 py-4 rounded-3xl border border-slate-100 shadow-sm"><Loader2 size={20} className="text-thynk-purple animate-spin" /></div></div>}
      </div>

      <div className="p-8 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="relative">
          <input type="text" disabled={isLoading} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type mission command..." className="w-full bg-thynk-gray border-2 border-transparent rounded-[32px] py-5 pl-8 pr-16 text-sm font-bold outline-none focus:border-thynk-purple focus:bg-white transition-all shadow-inner" />
          <button type="submit" disabled={!inputValue.trim() || isLoading} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-thynk-black text-white rounded-2xl flex items-center justify-center hover:bg-thynk-purple hover:shadow-xl transition-all disabled:opacity-0"><Send size={20} /></button>
        </form>
      </div>
    </div>
  );
};

export default StubCoach;
