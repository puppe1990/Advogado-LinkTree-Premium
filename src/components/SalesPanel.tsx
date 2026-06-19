import React, { useState } from 'react';
import { ThemeId, LawyerProfile } from '../types';
import { LUXURY_THEMES, FEMALE_LAWYER_PROFILE, MALE_LAWYER_PROFILE } from '../data';
import { Settings, PenTool, Check, RotateCcw, X, Heart, Smartphone, BadgeCheck, Eye, EyeOff } from 'lucide-react';

interface SalesPanelProps {
  currentThemeId: ThemeId;
  onThemeChange: (id: ThemeId) => void;
  profile: LawyerProfile;
  onProfileUpdate: (updated: Partial<LawyerProfile>) => void;
  onResetToDefault: (profileType: 'female' | 'male') => void;
}

export default function SalesPanel({
  currentThemeId,
  onThemeChange,
  profile,
  onProfileUpdate,
  onResetToDefault,
}: SalesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProfileType, setActiveProfileType] = useState<'female' | 'male'>('female');

  const handleProfileSwitch = (type: 'female' | 'male') => {
    setActiveProfileType(type);
    onResetToDefault(type);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 font-bold px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm group"
        >
          <Settings className="w-5 h-5 animate-spin-slow group-hover:rotate-45 transition-transform" />
          <span>Painel de Venda / Customizar Live ✨</span>
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#020617]/50 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-[#0F172A] border-l border-[#334155]/60 text-slate-100 flex flex-col h-full shadow-2xl relative">
            
            {/* Header */}
            <div className="p-5 border-b border-[#334155]/60 flex justify-between items-center bg-[#1E293B]">
              <div>
                <h3 className="font-bold text-lg text-amber-400 flex items-center space-x-2">
                  <span>Painel de Vendas Live</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">Use para demonstrar o site no celular do advogado!</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 px-1.5 rounded-lg bg-[#334155] text-slate-100 hover:bg-slate-700 transition"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Banner */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-3 text-xs text-amber-200 leading-relaxed">
              💡 <strong>Dica de Fechamento:</strong> Mude o nome do advogado para o nome do seu cliente em tempo real enquanto apresenta. A conversão de vendas aumenta em até 90%!
            </div>

            {/* Scrollable Content */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              {/* 1. Profile Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">1. Escolha o Alvo / Perfil Padrão</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleProfileSwitch('female')}
                    type="button"
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeProfileType === 'female' 
                        ? 'border-amber-400 bg-amber-500/10 text-white' 
                        : 'border-[#334155]/50 bg-[#1E293B]/45 text-slate-300 hover:bg-[#1E293B]/70'
                    }`}
                  >
                    <span className="font-semibold text-sm">Dra. Helena Martins</span>
                    <span className="text-[10px] text-slate-400 mt-1">Foco Civil &amp; Holding</span>
                  </button>

                  <button
                    onClick={() => handleProfileSwitch('male')}
                    type="button"
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeProfileType === 'male' 
                        ? 'border-amber-400 bg-amber-500/10 text-white' 
                        : 'border-[#334155]/50 bg-[#1E293B]/45 text-slate-300 hover:bg-[#1E293B]/70'
                    }`}
                  >
                    <span className="font-semibold text-sm">Dr. Arthur Vasconcelos</span>
                    <span className="text-[10px] text-slate-400 mt-1">Foco Corporativo</span>
                  </button>
                </div>
              </div>

              {/* 2. Theme Preview Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">2. Alterar Tema Visual (Instantâneo)</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(LUXURY_THEMES).map((t) => {
                    const isSelected = currentThemeId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => onThemeChange(t.id)}
                        type="button"
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-[#334155]/40 text-white'
                            : 'border-[#334155]/50 bg-[#1E293B]/30 text-slate-300 hover:bg-[#1E293B]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full border border-gray-600 ${
                            t.id === 'royal' ? 'bg-[#0B1528]' :
                            t.id === 'obsidian' ? 'bg-[#111111]' :
                            t.id === 'ivory' ? 'bg-[#FAF9F6]' : 'bg-[#062421]'
                          }`} />
                          <span className="font-semibold text-xs truncate max-w-[120px]">{t.name.split(' (')[0]}</span>
                        </div>
                        {isSelected && (
                          <span className="absolute top-2 right-2 bg-amber-500 text-slate-900 rounded-full p-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 mt-1.5">{t.id === 'ivory' ? 'Claro' : 'Escuro'} Profissional</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Live Personalization Fields */}
              <div className="space-y-3 border-t border-[#334155]/60 pt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">3. Personalizar na Hora (Digite Livre)</label>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-1">Nome Completo do Advogado</span>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => onProfileUpdate({ name: e.target.value })}
                      placeholder="Ex: Dra. Juliana Souza"
                      className="w-full text-xs bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-1">Título / Slogan Principal</span>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => onProfileUpdate({ title: e.target.value })}
                      placeholder="Ex: Advocacia Penal e Garantias Constitucionais"
                      className="w-full text-xs bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[11px] font-medium text-slate-400 block mb-1">Registro OAB</span>
                      <input
                        type="text"
                        value={profile.oab}
                        onChange={(e) => onProfileUpdate({ oab: e.target.value })}
                        placeholder="Ex: OAB/SP 456.789"
                        className="w-full text-xs bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-medium text-slate-400 block mb-1">WhatsApp Redirecionador</span>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => onProfileUpdate({ phone: e.target.value })}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full text-xs bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-1">Breve Biografia / Autoridade</span>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => onProfileUpdate({ bio: e.target.value })}
                      rows={2}
                      placeholder="Frase curta sobre conquistas e faculdade..."
                      className="w-full text-xs bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Sales Pitch tips */}
              <div className="p-4 rounded-xl bg-slate-900 border border-[#334155]/60 space-y-2">
                <p className="text-xs font-bold text-amber-400 flex items-center space-x-1">
                  <BadgeCheck className="w-4 h-4 text-amber-400" />
                  <span>Diferenciais Imbatíveis para Venda:</span>
                </p>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Linktree Comum vs. Este Premium:</strong> Menos dispersão, focado em agendamento cirúrgico de leads qualificados.</li>
                  <li><strong>WhatsApp Integrado:</strong> Não é apenas um link, o próprio cliente resolve sua agenda e chega no WhatsApp do advogado com os dados da consulta prontos.</li>
                  <li><strong>Totalmente Mobile-First:</strong> Abre de forma espetacular em qualquer celular diretamente do perfil do Instagram.</li>
                </ul>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="p-4 border-t border-[#334155]/60 bg-[#1E293B] flex space-x-2">
              <button
                onClick={() => handleProfileSwitch(activeProfileType)}
                type="button"
                className="flex items-center justify-center space-x-1.5 px-3 py-2 border border-[#334155] hover:bg-slate-700 rounded-lg text-xs font-semibold transition"
                title="Resetar Campos"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar</span>
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg text-xs transition flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>Visualizar LinkTree</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
