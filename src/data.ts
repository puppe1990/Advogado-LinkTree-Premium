import { ThemeConfig, LawyerProfile, Specialty } from './types';

export const LUXURY_THEMES: Record<string, ThemeConfig> = {
  royal: {
    id: 'royal',
    name: 'Classic Royal (Azul Imperial & Ouro)',
    bgClass: 'bg-[#0B1528] text-[#F3F4F6] selection:bg-[#C5A880]/30',
    cardBgClass: 'bg-[#122037]/80 backdrop-blur-md border-[#C5A880]/20 hover:border-[#C5A880]/50',
    textPrimaryClass: 'text-[#F3F4F6]',
    textSecondaryClass: 'text-[#9CA3AF]',
    accentClass: 'bg-[#C5A880] text-[#111827] hover:bg-[#D4B993]',
    accentHoverClass: 'hover:bg-[#D4B993]/10',
    borderClass: 'border-[#C5A880]/15',
    tagBgClass: 'bg-[#C5A880]/10 text-[#C1A883]',
    tagTextClass: 'text-[#C5A880]',
    highlightClass: 'text-[#C5A880]',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Luxury Obsidian (Elegant Dark & Gold)',
    bgClass: 'bg-[#0A0A0A] text-[#E5E5E5] selection:bg-[#C5A059]/30',
    cardBgClass: 'bg-[#141414]/95 border-[#2A2A2A] hover:border-[#C5A059] text-[#E5E5E5] shadow-xl',
    textPrimaryClass: 'text-[#E5E5E5]',
    textSecondaryClass: 'text-[#888888]',
    accentClass: 'bg-[#C5A059] text-black hover:bg-[#DBC187] font-semibold',
    accentHoverClass: 'hover:bg-[#C5A059]/10',
    borderClass: 'border-[#1A1A1A]',
    tagBgClass: 'bg-[#C5A059]/10 text-[#C5A059]',
    tagTextClass: 'text-[#C5A059]',
    highlightClass: 'text-[#C5A059]',
  },
  ivory: {
    id: 'ivory',
    name: 'Minimalist Ivory (Off-White & Slate)',
    bgClass: 'bg-[#FAF9F6] text-[#1E293B] selection:bg-[#475569]/20',
    cardBgClass: 'bg-white border-[#E2E8F0] hover:border-[#94A3B8] shadow-sm',
    textPrimaryClass: 'text-[#1E293B]',
    textSecondaryClass: 'text-[#64748B]',
    accentClass: 'bg-[#1E293B] text-white hover:bg-[#334155]',
    accentHoverClass: 'hover:bg-[#1E293B]/10',
    borderClass: 'border-[#E2E8F0]',
    tagBgClass: 'bg-[#F1F5F9] text-[#475569]',
    tagTextClass: 'text-[#334155]',
    highlightClass: 'text-[#1E293B]',
  },
  emerald: {
    id: 'emerald',
    name: 'Executive Emerald (Verde Nobre & Bronze)',
    bgClass: 'bg-[#062421] text-[#EBEFEF] selection:bg-[#C2AF82]/30',
    cardBgClass: 'bg-[#0C322E]/80 backdrop-blur-md border-[#C2AF82]/20 hover:border-[#C2AF82]/50',
    textPrimaryClass: 'text-[#EBEFEF]',
    textSecondaryClass: 'text-[#9BB1AF]',
    accentClass: 'bg-[#C2AF82] text-[#051816] hover:bg-[#D4C39B]',
    accentHoverClass: 'hover:bg-[#C2AF82]/10',
    borderClass: 'border-[#C2AF82]/15',
    tagBgClass: 'bg-[#C2AF82]/10 text-[#C2AF82]',
    tagTextClass: 'text-[#C2AF82]',
    highlightClass: 'text-[#C2AF82]',
  },
};

export const MOCK_SPECIALTIES: Specialty[] = [
  {
    id: 'direitodigital',
    title: 'Direito Digital & LGPD',
    shortDescription: 'Assessoria em conformidade com a LGPD, contratos de tecnologia e proteção de ativos digitais.',
    longDescription: 'Atendimento especializado para startups, e-commerces e empresas tradicionais em adequação à LGPD, redação de Termos de Uso e Políticas de Privacidade, combate a fraudes eletrônicas, negociação de transferência de tecnologia e proteção de marca no ambiente online.',
    iconName: 'Shield',
    commonDemands: [
      'Adequação completa LGPD',
      'Termos de Uso e Políticas de Privacidade',
      'Contratos SaaS e Licenciamento de Software',
      'Defesa em Incidentes de Vazamento de Dados',
      'Retirada de conteúdo indevido da internet'
    ]
  },
  {
    id: 'patrimonial',
    title: 'Planejamento Patrimonial & Sucessório',
    shortDescription: 'Constituição de Holdings Familiares, redução legal de impostos e proteção de herança.',
    longDescription: 'Desenvolvimento de estruturas robustas voltadas à perpetuidade do patrimônio familiar e empresarial. Foco em blindagem patrimonial lícita, holding familiar e de participação física, testamentos e cláusulas restritivas, visando mitigar futuros conflitos de inventário e otimizar a carga tributária.',
    iconName: 'Briefcase',
    commonDemands: [
      'Criação de Holding Familiar de Bens',
      'Otimização e Planejamento Tributário Legal',
      'Acordo de Sócios e Protocolos de Transição',
      'Sucessão inteligente de empresas familiares',
      'Doações com reserva de usufruto'
    ]
  },
  {
    id: 'empresarial',
    title: 'Direito Corporativo & Contratos',
    shortDescription: 'Consultoria empresarial preventiva, elaboração de contratos comerciais de alta segurança.',
    longDescription: 'Suporte jurídico estratégico continuado focado na segurança de operações empresariais. Atuamos na modelagem civil e comercial de contratos, auditoria preventiva de riscos corporativos (compliance), reestruturação societária e representação em contencioso de negócios.',
    iconName: 'Scale',
    commonDemands: [
      'Elaboração de contratos de alta complexidade',
      'Constituição, fusão e cisão de empresas',
      'Contratos de Vesting e Múltiplos Fundadores',
      'Assessoria em investimentos (M&A e Venture Capital)',
      'Defesa em disputas societárias judiciais'
    ]
  },
  {
    id: 'familia',
    title: 'Família, Sucessões & Divórcios',
    shortDescription: 'Atendimento humanizado para divórcios consensuais e litigiosos, partilha e guarda.',
    longDescription: 'Oferecemos condução jurídica extremamente humanizada nas complexidades do Direito de Família. Nossos esforços visam sempre a pacificação social por meio da negociação, atuando prontamente em divórcios, partilhas patrimoniais de alta renda, guarda de menores e inventários judicial e extrajudicial.',
    iconName: 'Users',
    commonDemands: [
      'Divórcio consensual em Cartório (Rápido)',
      'Divórcios litigiosos e partilhas complexas',
      'Contratos e Dissoluções de União Estável',
      'Ações de Alimentos (Fixação e Revisional)',
      'Inventários extrajudiciais com agilidade'
    ]
  }
];

export const FEMALE_LAWYER_PROFILE: LawyerProfile = {
  name: 'Dra. Helena Martins Novais',
  title: 'Advocacia de Alta Performance & Estratégia Patrimonial',
  oab: 'OAB/SP 412.875',
  bio: 'Mestre em Direito Civil pela USP e pós-graduada em Planejamento Tributário. Especializada em blindagem de patrimônio e estruturação de holdings, oferecendo segurança de ponta para empresários e famílias.',
  phone: '(11) 99876-5432',
  email: 'contato@helenamartins.adv.br',
  officeAddress: 'Av. Paulista, 1000, Cj. 1402 - Bela Vista, São Paulo - SP',
  officeHours: 'Segunda a Sexta, das 09h às 19h',
  specialties: MOCK_SPECIALTIES,
  avatarUrl: '', // Will be filled dynamically with generated image URL
};

export const MALE_LAWYER_PROFILE: LawyerProfile = {
  name: 'Dr. Arthur Vasconcelos',
  title: 'Direito Corporativo & Proteção de Ativos Digitais',
  oab: 'OAB/SP 388.940',
  bio: 'Especialista em Direito Digital pela FGV e coordenador de compliance corporativo. Dedicado à assessoria preventiva de startups tecnológicas e planejamento de conformidade jurídica para grandes empresas.',
  phone: '(11) 98765-4321',
  email: 'arthur@vasconcelosadvocacia.com.br',
  officeAddress: 'Alameda Lorena, 450, Piso 5 - Jardins, São Paulo - SP',
  officeHours: 'Segunda a Sexta, das 09h às 18h',
  specialties: MOCK_SPECIALTIES,
  avatarUrl: '', // Will be filled dynamically with generated image URL
};

// Available time slots for booking simulated scheduler
export const AVAILABLE_SLOTS = [
  '09:00',
  '10:30',
  '14:00',
  '15:30',
  '17:00'
];
