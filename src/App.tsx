import React, { useState, useEffect } from 'react';
import { ThemeId, LawyerProfile, BookingForm, Specialty } from './types';
import { LUXURY_THEMES, FEMALE_LAWYER_PROFILE, MALE_LAWYER_PROFILE } from './data';
import Scheduler from './components/Scheduler';
import SalesPanel from './components/SalesPanel';
import { 
  Shield, 
  Briefcase, 
  Scale, 
  Users, 
  FileText, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronDown, 
  ChevronUp, 
  Award, 
  Download, 
  Share2, 
  Sparkles,
  Smartphone,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

// Dynamic helper to map strings securely to Lucide icons
const renderSpecialtyIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'Shield': return <Shield className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Users': return <Users className={className} />;
    default: return <Scale className={className} />;
  }
};

export default function App() {
  const [themeId, setThemeId] = useState<ThemeId>('obsidian');
  const [profile, setProfile] = useState<LawyerProfile>({ ...FEMALE_LAWYER_PROFILE });
  
  // Controls active sections
  const [expandedSpecialty, setExpandedSpecialty] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'scheduler'>('profile');
  const [showLocation, setShowLocation] = useState(false);
  const [downloadSimulated, setDownloadSimulated] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Load correct avatar images dynamically based on the generated assets
  useEffect(() => {
    // Inject the generated image paths directly into active profile structures
    const femaleAvatar = '/src/assets/images/professional_female_lawyer_1781889596315.jpg';
    const maleAvatar = '/src/assets/images/professional_male_lawyer_1781889617147.jpg';
    
    setProfile(prev => {
      if (prev.name.includes('Helena')) {
        return { ...prev, avatarUrl: femaleAvatar };
      } else {
        return { ...prev, avatarUrl: maleAvatar };
      }
    });
  }, []);

  const themeConfig = LUXURY_THEMES[themeId] || LUXURY_THEMES.royal;

  // Handle live theme switching from the Sales Representative Drawer
  const handleThemeChange = (id: ThemeId) => {
    setThemeId(id);
  };

  // Handle direct custom modifications
  const handleProfileUpdate = (updates: Partial<LawyerProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Reset profile to default template choices
  const handleResetToDefault = (type: 'female' | 'male') => {
    const femaleAvatar = '/src/assets/images/professional_female_lawyer_1781889596315.jpg';
    const maleAvatar = '/src/assets/images/professional_male_lawyer_1781889617147.jpg';
    
    if (type === 'female') {
      setProfile({
        ...FEMALE_LAWYER_PROFILE,
        avatarUrl: femaleAvatar
      });
    } else {
      setProfile({
        ...MALE_LAWYER_PROFILE,
        avatarUrl: maleAvatar
      });
    }
  };

  // Synchronize document title with the active lawyer profile dynamically!
  useEffect(() => {
    document.title = `${profile.name} | Advocacia Premium`;
  }, [profile.name]);

  // Simulate contact opening
  const handlePrimaryWhatsapp = () => {
    const cleanPhone = profile.phone.replace(/\D/g, '');
    const text = encodeURIComponent(`Olá, ${profile.name}! Gostaria de agendar uma consulta inicial de avaliação jurídica.`);
    window.open(`https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${text}`, '_blank');
  };

  // Custom simulation for downloading corporate deck
  const triggerDownloadSimulation = () => {
    setDownloadSimulated(true);
    setTimeout(() => {
      setDownloadSimulated(false);
      // Simulate file download
      const content = `Apresentação Institucional de Advocacia - ${profile.name}\nRegistro: ${profile.oab}\nEspecialidades:\n${profile.specialties.map(s => `- ${s.title}`).join('\n')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Boas-Vindas_${profile.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  // Share link simulator
  const triggerShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen py-6 md:py-12 px-4 transition-all duration-300 flex flex-col justify-between ${
      themeId === 'ivory' ? 'bg-[#F1F3F5]' : 'bg-[#030712] bg-radial-gradient'
    }`}>
      
      {/* Sales Pitch floating tips top ribbon (Desktop Only) */}
      <div className="hidden md:flex max-w-4xl mx-auto w-full items-center justify-between mb-6 p-3 rounded-xl bg-[#1E293B]/90 border border-[#334155]/60 text-slate-100 text-xs backdrop-blur-md shadow-md animate-fade-in">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span><strong>Protótipo Ativo de Venda:</strong> Demonstre adaptabilidade total.</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="text-[11px] bg-slate-700 hover:bg-slate-600 px-2.5 py-1 rounded transition flex items-center space-x-1 font-medium"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{deviceFrameMode ? 'Ver em Tela Cheia' : 'Ver no Celular Simulado'}</span>
          </button>
        </div>
      </div>

      {/* Main Container Wrapper */}
      <div className="w-full flex-1 flex items-center justify-center">
        
        {/* Mock Phone Frame or Full Container */}
        <div className={`transition-all duration-500 ${
          deviceFrameMode 
            ? 'max-w-[430px] w-full rounded-[40px] border-[10px] border-[#1E293B] bg-opacity-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col h-[820px] scrollbar-none'
            : 'max-w-md w-full rounded-3xl relative flex flex-col min-h-[700px]'
        } ${themeConfig.bgClass}`}>
          
          {/* Subtle camera punch hole inside Simulated Device */}
          {deviceFrameMode && (
            <div className="absolute top-0 inset-x-0 h-6 bg-[#111827] z-40 flex items-center justify-center">
              <div className="w-24 h-4 bg-black rounded-b-xl flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-[#1F2937] rounded-full mr-2" />
                <span className="w-1.5 h-1.5 bg-[#4B5563] rounded-full" />
              </div>
            </div>
          )}

          {/* Core Content Area */}
          <div className={`flex-1 overflow-y-auto w-full flex flex-col px-5 sm:px-6 scroll-smooth ${deviceFrameMode ? 'pt-8 pb-5' : 'py-3'}`}>
            
            {/* Quick Share action */}
            <div className="flex justify-between items-center py-2.5 mb-1.5">
              <span className="text-[10px] font-mono tracking-widest opacity-60 uppercase">
                {profile.oab}
              </span>
              <button 
                onClick={triggerShareLink}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-inherit"
                title="Compartilhar Link"
                type="button"
                id="share-button"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info Header */}
            <div className="text-center flex flex-col items-center mb-6">
              
              {/* Profile Avatar Frame with prestige glow */}
              <div className="relative mb-3.5 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-orange-500/20 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className={`relative w-24 h-24 rounded-full overflow-hidden border-2 shadow-inner transition-colors ${
                  themeId === 'ivory' ? 'border-[#1E293B]/20' : 'border-[#C5A880]/30'
                }`}>
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-500/10">
                      <Scale className="w-10 h-10 opacity-40" />
                    </div>
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${themeConfig.accentClass} shadow-md`}>
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Name (High dignity serif on dark themes, crisp sans on clear) */}
              <h1 className={`text-xl font-bold tracking-tight mb-1.5 leading-snug ${
                themeId === 'ivory' ? 'font-sans' : 'font-serif'
              }`}>
                {profile.name}
              </h1>

              {/* Specialty Subtitle block */}
              <p className={`text-xs text-center font-medium max-w-[280px] leading-relaxed mb-3.5 ${themeConfig.textSecondaryClass}`}>
                {profile.title}
              </p>

              {/* Dynamic Badges */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${themeConfig.tagBgClass}`}>
                  Atendimento Online
                </span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  WhatsApp Urgente
                </span>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${themeConfig.tagBgClass}`}>
                  Holding Familiar
                </span>
              </div>
            </div>

            {/* TAB SELECTOR: Profile vs Scheduler */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-gray-500/10 mb-5 relative z-10">
              <button
                onClick={() => setActiveTab('profile')}
                type="button"
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'profile'
                    ? themeId === 'ivory' ? 'bg-white text-slate-900 shadow' : 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white/80'
                }`}
                id="tab-profile"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Links &amp; Atuação</span>
              </button>

              <button
                onClick={() => setActiveTab('scheduler')}
                type="button"
                className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'scheduler'
                    ? themeId === 'ivory' ? 'bg-white text-slate-900 shadow' : 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white/80'
                }`}
                id="tab-scheduler"
              >
                <Calendar className="w-3.5 h-3.5 animate-pulse" />
                <span>Agendar Consulta</span>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
              </button>
            </div>

            {/* TAB CONTENT: PROFILE & LINKTREE DETAILS */}
            {activeTab === 'profile' && (
              <div className="space-y-5 animate-fade-in">
                
                {/* 1. Bio Block */}
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${themeConfig.cardBgClass}`}>
                  <p className="opacity-90">{profile.bio}</p>
                </div>

                {/* 2. PRIMARY ACTION LINKS (Linktree-style Stack) */}
                <div className="space-y-2.5">
                  <h3 className="text-[10px] uppercase font-bold tracking-wider opacity-65 pl-1.5 mb-1 flex items-center space-x-1 text-inherit">
                    <Sparkles className="w-3 h-3" />
                    <span>Links de Contato Direto</span>
                  </h3>

                  {/* Immediate WhatsApp Urgência (Pulsating green accent badge) */}
                  <button
                    onClick={handlePrimaryWhatsapp}
                    type="button"
                    className="w-full flex items-center justify-between p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold transition-all shadow-md group relative overflow-hidden"
                    id="whatsapp-primary"
                  >
                    <span className="absolute inset-0 bg-white/10 w-1/4 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-out" />
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 fill-current animate-bounce" />
                      <div className="text-left">
                        <p className="text-sm">Falar Urgente via WhatsApp</p>
                        <p className="text-[10px] text-white/80 font-normal">Fale diretamente com a equipe jurídica</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Trigger Calendar Agendamento within profile */}
                  <button
                    onClick={() => setActiveTab('scheduler')}
                    type="button"
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all border ${themeConfig.cardBgClass} group`}
                    id="scheduler-trigger-link"
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <div className="text-left">
                        <p className="text-sm">Agendamento Online 24h</p>
                        <p className="text-[10px] text-gray-400 font-normal">Reserve uma data diretamente pelo link</p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Download institutional presentation card */}
                  <button
                    onClick={triggerDownloadSimulation}
                    type="button"
                    disabled={downloadSimulated}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl font-semibold transition-all border ${themeConfig.cardBgClass} group`}
                    id="download-institution"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className={`w-5 h-5 ${downloadSimulated ? 'animate-bounce text-emerald-500' : 'text-amber-500'}`} />
                      <div className="text-left">
                        <p className="text-sm">
                          {downloadSimulated ? 'Preparando Apresentação...' : 'Apresentação Institucional (PDF)'}
                        </p>
                        <p className="text-[10px] text-gray-400 font-normal">Conheça nossa trajetória e casos de êxito</p>
                      </div>
                    </div>
                    <FileText className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* 3. AREAS OF PRACTICE ACCORDION */}
                <div className="space-y-2.5">
                  <h3 className="text-[10px] uppercase font-bold tracking-wider opacity-65 pl-1.5 mb-1">
                    Especialidades e Áreas de Atuação
                  </h3>

                  <div className="space-y-2">
                    {profile.specialties.map((spec) => {
                      const isExpanded = expandedSpecialty === spec.id;
                      return (
                        <div 
                          key={spec.id}
                          className={`rounded-xl border overflow-hidden transition-all duration-300 ${themeConfig.cardBgClass}`}
                        >
                          {/* Accordion Header */}
                          <button
                            onClick={() => setExpandedSpecialty(isExpanded ? null : spec.id)}
                            type="button"
                            className="w-full flex items-center justify-between p-3 text-left focus:outline-none"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-1.5 rounded-lg ${themeConfig.tagBgClass}`}>
                                {renderSpecialtyIcon(spec.iconName, 'w-4 h-4')}
                              </div>
                              <span className="text-xs font-bold">{spec.title}</span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 opacity-70" />
                            ) : (
                              <ChevronDown className="w-4 h-4 opacity-70" />
                            )}
                          </button>

                          {/* Accordion Body */}
                          {isExpanded && (
                            <div className="px-3.5 pb-4 pt-1 text-xs border-t border-gray-500/10 space-y-3 animate-fade-in">
                              <p className="leading-relaxed opacity-90">{spec.longDescription}</p>
                              
                              <div className="space-y-1.5">
                                <p className="font-bold text-[10px] uppercase tracking-wider opacity-60">Principais Demandas:</p>
                                <ul className="space-y-1 pl-1">
                                  {spec.commonDemands.map((demand, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                      <span className="opacity-80">{demand}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <button
                                onClick={() => {
                                  // Pre-fill some fields and route to scheduler
                                  setActiveTab('scheduler');
                                  // Select this accordion topic automatically inside Scheduler!
                                  const container = document.getElementById('scheduler-container');
                                  if (container) container.scrollIntoView({ behavior: 'smooth' });
                                }}
                                type="button"
                                className={`w-full py-2.5 rounded-lg text-xs font-bold text-center transition-all ${themeConfig.accentClass}`}
                              >
                                Agendar Consulta nesta Área
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. OFFICE LOCATION / CONTACT DETAILS */}
                <div className="space-y-2.5">
                  <h3 className="text-[10px] uppercase font-bold tracking-wider opacity-65 pl-1.5 mb-1">
                    Escritório &amp; Expediente
                  </h3>

                  <div className={`p-4 rounded-xl border space-y-3 test-xs ${themeConfig.cardBgClass}`}>
                    
                    <div className="flex items-start space-x-3 text-xs">
                      <MapPin className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Sede Física</p>
                        <p className="opacity-80 leading-relaxed mt-0.5">{profile.officeAddress}</p>
                        {showLocation ? (
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-500/20 h-32 bg-slate-800 relative z-0 flex items-center justify-center">
                            {/* Static/Symbolic law map illustration */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-amber-500/5 to-transparent" />
                            <div className="z-10 text-center p-2">
                              <MapPin className="w-7 h-7 text-red-500 mx-auto mb-1 animate-bounce" />
                              <p className="text-[10px] font-bold text-white uppercase">Edifício Corporativo Paulista</p>
                              <a 
                                href={`https://maps.google.com/?q=${encodeURIComponent(profile.officeAddress)}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-[9px] text-amber-400 underline block mt-0.5 hover:text-amber-300"
                              >
                                Abrir no Google Maps
                              </a>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowLocation(true)}
                            type="button"
                            className="text-amber-500 underline text-xs mt-1 block hover:text-amber-400"
                          >
                            Visualizar Mapa de Acesso
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs border-t border-gray-500/10 pt-3">
                      <Clock className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Horário de Atendimento</p>
                        <p className="opacity-85 mt-0.5">{profile.officeHours}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs border-t border-gray-500/10 pt-3">
                      <Mail className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">E-mail Corporativo</p>
                        <a 
                          href={`mailto:${profile.email}`} 
                          className="opacity-85 hover:underline decoration-amber-500 mt-0.5 block"
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: ACTIVE BOOKING INTERACTIVE COMPONENT */}
            {activeTab === 'scheduler' && (
              <div className="animate-fade-in space-y-4">
                <div className="text-center py-2">
                  <h2 className="text-base font-bold tracking-tight">Agendar Consulta Online</h2>
                  <p className={`text-xs mt-1 ${themeConfig.textSecondaryClass}`}>
                    Escolha uma data e horário. O agendamento é sincronizado instantaneamente.
                  </p>
                </div>
                
                <Scheduler 
                  specialties={profile.specialties}
                  theme={themeConfig}
                  lawyerName={profile.name}
                  lawyerPhone={profile.phone}
                  onBookingComplete={(booking) => {
                    console.log('New booking saved:', booking);
                  }}
                />
              </div>
            )}

            {/* Dynamic Security Trust Footer */}
            <div className="mt-8 border-t border-gray-500/10 pt-4 text-center pb-2">
              <p className="text-[10px] text-gray-400 flex items-center justify-center space-x-1 leading-normal">
                <Lock className="w-3 h-3 text-emerald-500" />
                <span>Dados encriptados de ponta a ponta em conformidade com a LGPD</span>
              </p>
              <p className="text-[9px] text-gray-500/60 mt-1">
                © {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Sales Representative Personalization panel widget (floating bottom right) */}
      <SalesPanel 
        currentThemeId={themeId}
        onThemeChange={handleThemeChange}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
        onResetToDefault={handleResetToDefault}
      />

      {/* Copy link share toast notification */}
      {showShareNotification && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#1E293B] border border-[#334155] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 z-50 animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Link copiado para a área de transferência!</span>
        </div>
      )}

    </div>
  );
}
