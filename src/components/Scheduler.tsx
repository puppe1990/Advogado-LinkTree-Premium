import React, { useState, useMemo } from 'react';
import { Specialty, ThemeConfig, BookingForm } from '../types';
import { AVAILABLE_SLOTS } from '../data';
import { Calendar as CalendarIcon, Clock, User, MessageSquare, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle, Smartphone } from 'lucide-react';

interface SchedulerProps {
  specialties: Specialty[];
  theme: ThemeConfig;
  lawyerName: string;
  lawyerPhone: string;
  onBookingComplete: (booking: BookingForm) => void;
}

export default function Scheduler({ specialties, theme, lawyerName, lawyerPhone, onBookingComplete }: SchedulerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(specialties[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [caseBrief, setCaseBrief] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [lastRef, setLastRef] = useState('');

  // Calendar logic for generating dynamically
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed is May, but let's do 5 for June 2026)

  const MONTHS_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  const calendarDays = useMemo(() => {
    const days = [];
    // Spacing for starting week day
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }, [daysInMonth, firstDayOfWeek]);

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const isDateSelectable = (day: number) => {
    // Cannot select past dates
    const dateObj = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0,0,0,0);
    return dateObj >= today && dateObj.getDay() !== 0 && dateObj.getDay() !== 6; // exclude weekends
  };

  const formatDateString = (day: number) => {
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientWhatsapp) {
      alert('Por favor, informe seu nome e celular WhatsApp.');
      return;
    }
    
    const formattedDate = selectedDate.split('-').reverse().join('/');
    const generatedRef = 'ADV-' + Math.floor(100000 + Math.random() * 900000);
    setLastRef(generatedRef);

    const booking: BookingForm = {
      name: clientName,
      email: clientEmail,
      whatsapp: clientWhatsapp,
      specialtyId: selectedSpecialty,
      date: selectedDate,
      time: selectedTime,
      brief: caseBrief,
    };

    setStep(3);
    setBookingConfirmed(true);
    onBookingComplete(booking);
  };

  const handleSendToWhatsapp = () => {
    const selectedSpec = specialties.find(s => s.id === selectedSpecialty)?.title || 'Nova Consulta';
    const formattedDate = selectedDate.split('-').reverse().join('/');
    const textMsg = `Olá, ${lawyerName}! Agendei uma consulta de avaliação jurídica de forma online.\n\n*Detalhes do Agendamento:*\n🔹 *Área:* ${selectedSpec}\n📅 *Data:* ${formattedDate}\n⏰ *Hora:* ${selectedTime}\n👤 *Cliente:* ${clientName}\n📱 *WhatsApp:* ${clientWhatsapp}\n📝 *Breve Relato:* ${caseBrief || 'Não informado'}\n🔖 *Ref:* ${lastRef}\n\nPor favor, me confirme a recepção do agendamento!`;
    
    const cleanPhone = lawyerPhone.replace(/\D/g, '');
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${encoded}`, '_blank');
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setClientName('');
    setClientEmail('');
    setClientWhatsapp('');
    setCaseBrief('');
    setBookingConfirmed(false);
  };

  const selectedSpecialtyObj = specialties.find(s => s.id === selectedSpecialty);

  return (
    <div id="scheduler-container" className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${theme.id === 'ivory' ? 'bg-[#FCFCFC] border-[#E2E8F0] text-[#1E293B]' : 'bg-[#121B2A]/90 border-[#FAF9F6]/10 text-white'}`}>
      
      {/* Step Header */}
      {!bookingConfirmed && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${step === 1 ? theme.accentClass : 'bg-gray-500/20 text-gray-400'}`}>1</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Serviço</span>
            <span className="text-gray-400">/</span>
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${step === 2 ? theme.accentClass : 'bg-gray-500/20 text-gray-400'}`}>2</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Data &amp; Dados</span>
          </div>
          <span className="text-xs opacity-75">Ambiente Seguro</span>
        </div>
      )}

      {/* STEP 1: SELECT SPECIALTY & DATE */}
      {step === 1 && !bookingConfirmed && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-xs uppercase font-semibold tracking-wider opacity-75 mb-2">Selecione a Área de Interesse</label>
            <div className="grid grid-cols-1 gap-2">
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  type="button"
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-sm flex items-center justify-between ${
                    selectedSpecialty === spec.id 
                    ? theme.id === 'ivory' ? 'border-[#1E293B] bg-[#F1F5F9]' : `border-[#C5A880] bg-[#C5A880]/15`
                    : 'border-gray-500/10 hover:bg-gray-500/5'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{spec.title}</p>
                    <p className={`text-xs mt-0.5 max-w-[260px] md:max-w-md truncate ${theme.id === 'ivory' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {spec.shortDescription}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${selectedSpecialty === spec.id ? 'bg-[#10B981]' : 'bg-gray-400/20'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold tracking-wider opacity-75 mb-2">Escolha uma Data de Atendimento</label>
            <div className="border border-gray-500/10 rounded-xl p-3">
              {/* Month navigation */}
              <div className="flex justify-between items-center mb-3 px-1">
                <button 
                  onClick={handlePrevMonth} 
                  type="button" 
                  className="p-1 rounded-full hover:bg-gray-500/15"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-semibold">{MONTHS_PT[currentMonth]} {currentYear}</span>
                <button 
                  onClick={handleNextMonth} 
                  type="button" 
                  className="p-1 rounded-full hover:bg-gray-500/15"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold opacity-60 uppercase mb-2">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>

              {/* Grid of days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} />;
                  }

                  const isSelectable = isDateSelectable(day);
                  const dateStr = formatDateString(day);
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => isSelectable && setSelectedDate(dateStr)}
                      disabled={!isSelectable}
                      type="button"
                      className={`h-8 sm:h-9 text-xs rounded-lg font-medium flex items-center justify-center transition-all ${
                        isSelected 
                          ? theme.id === 'ivory' ? 'bg-[#1E293B] text-white shadow-md' : `${theme.accentClass} font-bold`
                          : isSelectable 
                            ? theme.id === 'ivory' ? 'hover:bg-slate-200 text-slate-900 bg-slate-100' : 'hover:bg-gray-500/15 text-white bg-white/5'
                            : 'text-gray-500/30 cursor-not-allowed text-[10px]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">Agendamento indisponível aos finais de semana e feriados nacionais.</p>
          </div>

          <button
            onClick={() => selectedDate && setStep(2)}
            disabled={!selectedDate}
            type="button"
            className={`w-full py-3.5 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center space-x-2 ${
              selectedDate 
                ? theme.accentClass 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-800'
            }`}
          >
            <span>Prosseguir com Agendamento</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: CHOOSE TIME & INPUT DETAILS */}
      {step === 2 && !bookingConfirmed && (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs uppercase font-semibold tracking-wider opacity-75">Escolha o Horário de Atendimento</label>
              <button 
                onClick={() => setStep(1)} 
                type="button" 
                className={`text-xs underline ${theme.id === 'ivory' ? 'text-slate-700' : 'text-amber-400/90'}`}
              >
                Alterar Data ({selectedDate.split('-').reverse().join('/')})
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-1.5">
              {AVAILABLE_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    type="button"
                    className={`py-2 text-xs rounded-lg font-semibold text-center transition-all ${
                      isSelected
                        ? theme.id === 'ivory' ? 'bg-[#1E293B] text-white shadow-md' : theme.accentClass
                        : theme.id === 'ivory' ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-500/10 pt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-85">Seus Dados de Contato</h4>
            
            <div className="space-y-2.5">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Seu Nome Completo *"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={`w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 ${
                    theme.id === 'ivory' 
                      ? 'border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:ring-slate-500' 
                      : 'border-white/10 bg-white/5 text-white placeholder-gray-400 focus:border-[#C5A880] focus:ring-[#C5A880]'
                  }`}
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Smartphone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  placeholder="Número de WhatsApp com DDD *"
                  required
                  value={clientWhatsapp}
                  onChange={(e) => setClientWhatsapp(e.target.value)}
                  className={`w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 ${
                    theme.id === 'ivory' 
                      ? 'border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:ring-slate-500' 
                      : 'border-white/10 bg-white/5 text-white placeholder-gray-400 focus:border-[#C5A880] focus:ring-[#C5A880]'
                  }`}
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <textarea
                  placeholder="Resuma seu caso brevemente (Opcional)"
                  value={caseBrief}
                  rows={2}
                  onChange={(e) => setCaseBrief(e.target.value)}
                  className={`w-full text-sm pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-1 ${
                    theme.id === 'ivory' 
                      ? 'border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:ring-slate-500' 
                      : 'border-white/10 bg-white/5 text-white placeholder-gray-400 focus:border-[#C5A880] focus:ring-[#C5A880]'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-xl border border-gray-500/20 text-xs font-semibold hover:bg-gray-500/5 transition-all"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={!selectedTime || !clientName || !clientWhatsapp}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
                selectedTime && clientName && clientWhatsapp
                  ? theme.accentClass 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 dark:bg-gray-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Finalizar Agendamento</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: BOOKING CONFIRMED */}
      {bookingConfirmed && (
        <div className="text-center py-6 px-2 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-[#10B981] mb-2 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h3 className="text-xl font-bold tracking-tight">Atendimento Agendado!</h3>
          
          <div className={`p-4 rounded-xl text-left border text-xs leading-relaxed space-y-1.5 ${
            theme.id === 'ivory' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
          }`}>
            <p><strong className="opacity-80">Área selecionada:</strong> {selectedSpecialtyObj?.title}</p>
            <p><strong className="opacity-80">Data de consulta:</strong> {selectedDate.split('-').reverse().join('/')}</p>
            <p><strong className="opacity-80">Horário reservado:</strong> {selectedTime}</p>
            <p><strong className="opacity-80">Código de controle:</strong> <span className="font-mono font-bold text-emerald-500">{lastRef}</span></p>
            <p><strong className="opacity-80">Profissional responsável:</strong> {lawyerName}</p>
          </div>

          <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
            Garantimos o sigilo total de suas informações e entraremos em contato para confirmar o link de videochamada antes do horário marcado.
          </p>

          <div className="space-y-2 pt-4">
            <button
              onClick={handleSendToWhatsapp}
              type="button"
              className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold transition-all text-sm shadow-md shadow-emerald-500/20"
            >
              <Smartphone className="w-5 h-5 fill-current" />
              <span>Avisar Advogado via WhatsApp</span>
            </button>

            <button
              onClick={resetForm}
              type="button"
              className={`w-full py-2.5 text-xs font-semibold hover:underline border border-transparent ${
                theme.id === 'ivory' ? 'text-slate-600' : 'text-gray-300'
              }`}
            >
              Realizar outro agendamento
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
