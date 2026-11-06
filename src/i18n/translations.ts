import { UILanguageCode } from '../types';

export interface UILanguageOption {
  code: UILanguageCode;
  label: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const UI_LANGUAGES: UILanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', label: 'Mandarin', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
];

export type TranslationKeys = {
  // Navigation & Header
  appName: string;
  appTagline: string;
  navHome: string;
  navMatchmaking: string;
  navChats: string;
  navDMs: string;
  navEvents: string;
  navChecklist: string;
  navProfile: string;
  verifiedBull: string;
  safetyShield: string;
  uiLanguageLabel: string;
  chatsNotTranslatedNote: string;

  // Minimalist Inviting Home Page (Replaces "Start Here")
  homeBadge: string;
  homeTitleLine1: string;
  homeTitleHighlight: string;
  homeSubtitle: string;
  homePrimaryCta: string;
  homeSecondaryCta: string;
  homeProfileCta: string;
  homeStatCountries: string;
  homeStatLanguages: string;
  homeStatVerified: string;
  homePillar1Title: string;
  homePillar1Desc: string;
  homePillar2Title: string;
  homePillar2Desc: string;
  homePillar3Title: string;
  homePillar3Desc: string;
  homeNewStudentBanner: string;
  homeNewStudentBtn: string;

  // Matchmaking / Find People
  matchTitle: string;
  matchSubtitle: string;
  matchTargetLanguages: string;
  matchTargetNationalities: string;
  matchInterests: string;
  matchAdvancedToggle: string;
  matchHideAdvanced: string;
  matchMajors: string;
  matchYears: string;
  matchAges: string;
  matchClearFilters: string;
  matchMultiSelectHint: string;
  matchResultsCount: string;
  matchCompatibility: string;
  matchSharedTraits: string;
  matchSendDM: string;
  matchViewRoom: string;
  matchAddCustomLang: string;
  matchAddCustomInterest: string;
  matchSearchPlaceholder: string;
  matchNoResults: string;

  // Language Chats (Lounges)
  chatsTitle: string;
  chatsSubtitle: string;
  chatsRoomsHeader: string;
  chatsCreateRoomBtn: string;
  chatsRulesTitle: string;
  chatsRulesBodyPrefix: string;
  chatsRulesBodySuffix: string;
  chatsRulesRespect: string;
  chatsNationalityBadgeHint: string;
  chatsInputPlaceholder: string;
  chatsSendBtn: string;
  chatsMessageInRoomNote: string;
  chatsStartDMWith: string;
  chatsActiveNow: string;

  // Direct Messages (DMs)
  dmsTitle: string;
  dmsSubtitle: string;
  dmsConversations: string;
  dmsEncryptedBadge: string;
  dmsIcebreakersTitle: string;
  dmsIcebreaker1: string;
  dmsIcebreaker2: string;
  dmsIcebreaker3: string;
  dmsInputPlaceholder: string;
  dmsBlockReport: string;
  dmsSafetyReminder: string;
  dmsSharedWithYou: string;

  // BullsConnect Events & Cultural Clubs
  eventsTitle: string;
  eventsSubtitle: string;
  eventsApiBadge: string;
  eventsFilterRegionLabel: string;
  regionAll: string;
  regionLatinAmerica: string;
  regionEurope: string;
  regionEastAsia: string;
  regionSouthAsia: string;
  regionMena: string;
  regionSubSaharanAfrica: string;
  regionGlobal: string;
  eventsSearchPlaceholder: string;
  eventsRsvpBtn: string;
  eventsRsvpedBtn: string;
  eventsOpenBullsConnect: string;
  eventsAttendees: string;
  eventsRefreshApi: string;

  // Arrival Checklist (Dedicated Page)
  checklistTitle: string;
  checklistSubtitle: string;
  checklistProgressLabel: string;
  checklistCatAll: string;
  checklistCatBefore: string;
  checklistCatFirstWeek: string;
  checklistCatCampusLife: string;
  checklistAddCustomTitle: string;
  checklistAddCustomPlaceholder: string;
  checklistAddBtn: string;
  // Checklist items
  chk1Title: string;
  chk1Desc: string;
  chk2Title: string;
  chk2Desc: string;
  chk3Title: string;
  chk3Desc: string;
  chk4Title: string;
  chk4Desc: string;
  chk5Title: string;
  chk5Desc: string;
  chk6Title: string;
  chk6Desc: string;
  chk7Title: string;
  chk7Desc: string;

  // Profile & Account Creation
  profileTitle: string;
  profileSubtitle: string;
  profileSaveBtn: string;
  profileSavedToast: string;
  profileNameLabel: string;
  profileEmailLabel: string;
  profileNationalityLabel: string;
  profileAncestryLabel: string;
  profileMajorLabel: string;
  profileMax3Hint: string;
  profileYearLabel: string;
  profileAgeLabel: string;
  profileCampusLabel: string;
  profileNativeLangLabel: string;
  profileSpokenLangLabel: string;
  profileInterestsLabel: string;
  profileBioLabel: string;
  profileLookingForLabel: string;
  profileAddCustomLangBtn: string;
  profileAddCustomInterestBtn: string;
  profileCustomLangPlaceholder: string;
  profileCustomInterestPlaceholder: string;
  profileAddConfirmBtn: string;
  profilePrivacyTitle: string;
  profilePrivacyShowAge: string;
  profilePrivacyVerifiedOnly: string;
  profilePrivacyAppearMatch: string;

  // Security & Trust Modal
  securityModalTitle: string;
  securityModalSubtitle: string;
  securityFeature1Title: string;
  securityFeature1Desc: string;
  securityFeature2Title: string;
  securityFeature2Desc: string;
  securityFeature3Title: string;
  securityFeature3Desc: string;
  securityEmergencyContacts: string;
  closeBtn: string;
  selectPlaceholder: string;
  maxReachedNote: string;
};

const en: TranslationKeys = {
  appName: 'BullsGlobal',
  appTagline: 'USF International Student Community',
  navHome: 'Welcome',
  navMatchmaking: 'Find Bulls',
  navChats: 'Language Lounges',
  navDMs: 'Direct Messages',
  navEvents: 'Cultural Events',
  navChecklist: 'Arrival Checklist',
  navProfile: 'My Profile',
  verifiedBull: 'Verified @usf.edu',
  safetyShield: 'Safe & Protected',
  uiLanguageLabel: 'Site Language',
  chatsNotTranslatedNote: 'UI translated • Chat messages stay in original language',

  homeBadge: 'University of South Florida • Global Community',
  homeTitleLine1: 'Your world meets here,',
  homeTitleHighlight: 'right at USF.',
  homeSubtitle: 'A warm, safe space to meet students who share your language, heritage, major, and passions—before and after you land in Tampa Bay.',
  homePrimaryCta: 'Find Your Match',
  homeSecondaryCta: 'Join Language Lounges',
  homeProfileCta: 'Customize My Profile',
  homeStatCountries: '130+ Nationalities',
  homeStatLanguages: '45+ Languages Spoken',
  homeStatVerified: '100% @usf.edu Protected',
  homePillar1Title: 'Language Lounges',
  homePillar1Desc: 'Chat in your native or target language with nationality badges next to every student.',
  homePillar2Title: 'Personal Matchmaking & DMs',
  homePillar2Desc: 'Filter by multiple languages, majors, years, and interests to spark genuine 1-on-1 friendships.',
  homePillar3Title: 'BullsConnect Cultural Clubs',
  homePillar3Desc: 'Discover BRASA, LASA, JCC, ASA, and cultural events sorted by world region.',
  homeNewStudentBanner: 'Just arrived at USF and not sure where to start?',
  homeNewStudentBtn: 'Open New Bull Arrival Checklist →',

  matchTitle: 'Find Your People at USF',
  matchSubtitle: 'Select as many languages, nationalities, majors, years, and interests as you like to discover compatible Bulls.',
  matchTargetLanguages: 'Target Languages (Multi-Select)',
  matchTargetNationalities: 'Nationalities / Heritage (Multi-Select)',
  matchInterests: 'Interests & Conversation Topics (Multi-Select)',
  matchAdvancedToggle: 'Advanced Filters (Major, College Year, Age)',
  matchHideAdvanced: 'Hide Advanced Filters',
  matchMajors: 'Majors / Courses (Multi-Select)',
  matchYears: 'College Year (Multi-Select)',
  matchAges: 'Age Range (Multi-Select)',
  matchClearFilters: 'Reset All Filters',
  matchMultiSelectHint: 'You can pick multiple options in every filter below',
  matchResultsCount: 'matching USF students ready to connect',
  matchCompatibility: 'Match',
  matchSharedTraits: 'Why you connect:',
  matchSendDM: 'Send Personal DM',
  matchViewRoom: 'Language Lounge',
  matchAddCustomLang: '+ Custom Language',
  matchAddCustomInterest: '+ Custom Interest',
  matchSearchPlaceholder: 'Search by name, country, major, or keyword...',
  matchNoResults: 'No students matched all active filters. Try removing a filter or adding broader interests!',

  chatsTitle: 'Language Lounges',
  chatsSubtitle: 'Practice a language or feel at home in your native tongue. Every member’s nationality appears next to their name.',
  chatsRoomsHeader: 'Language Rooms',
  chatsCreateRoomBtn: '+ Add Language Lounge',
  chatsRulesTitle: 'Lounge Language & Community Rules',
  chatsRulesBodyPrefix: 'In this lounge, please converse ONLY in ',
  chatsRulesBodySuffix: ' (and English only if strictly necessary for help or clarification).',
  chatsRulesRespect: 'Be kind, patient with learners, and respect all cultures. Verified USF students only.',
  chatsNationalityBadgeHint: 'Nationalities & heritage shown next to every sender',
  chatsInputPlaceholder: 'Write a friendly message in the room language (or English if needed)...',
  chatsSendBtn: 'Send',
  chatsMessageInRoomNote: 'Chat messages are kept in their original language so you can practice naturally.',
  chatsStartDMWith: 'Message 1-on-1 (DM)',
  chatsActiveNow: 'students active',

  dmsTitle: 'Personal Direct Messages',
  dmsSubtitle: 'Connect more closely 1-on-1 with fellow international and global-minded Bulls in a safe, private space.',
  dmsConversations: 'Your Conversations',
  dmsEncryptedBadge: 'Protected @usf.edu 1-on-1 Channel',
  dmsIcebreakersTitle: 'Friendly Icebreakers (Click to send):',
  dmsIcebreaker1: 'Hey! Would you like to grab coffee at the Marshall Student Center (MSC) this week?',
  dmsIcebreaker2: 'Hi! I saw we share languages and interests—how has your semester at USF been so far?',
  dmsIcebreaker3: 'Hey there! Want to practice speaking together or study at the USF Library?',
  dmsInputPlaceholder: 'Write a personal message...',
  dmsBlockReport: 'Safety / Report',
  dmsSafetyReminder: 'Always meet in public USF campus spaces first (like MSC, Library, or Bulls Green).',
  dmsSharedWithYou: 'Shared with you:',

  eventsTitle: 'Cultural Clubs & Events (BullsConnect)',
  eventsSubtitle: 'Live cultural gatherings and student organizations extracted from the USF BullsConnect API, organized by world region.',
  eventsApiBadge: 'BullsConnect API Feed Connected',
  eventsFilterRegionLabel: 'Filter by Region / Continent:',
  regionAll: 'All Regions',
  regionLatinAmerica: 'Latin America & Caribbean',
  regionEurope: 'Europe',
  regionEastAsia: 'East & Southeast Asia',
  regionSouthAsia: 'South Asia',
  regionMena: 'Middle East & North Africa',
  regionSubSaharanAfrica: 'Sub-Saharan Africa',
  regionGlobal: 'Global / All Nationalities',
  eventsSearchPlaceholder: 'Search club (e.g., BRASA, LASA, Irish, Japanese)...',
  eventsRsvpBtn: 'Save / I’m Going',
  eventsRsvpedBtn: 'Going ✓ (Saved)',
  eventsOpenBullsConnect: 'View on BullsConnect',
  eventsAttendees: 'Bulls attending',
  eventsRefreshApi: 'Sync BullsConnect API',

  checklistTitle: 'New International Bull Checklist',
  checklistSubtitle: 'Arriving in Tampa Bay for the first time? Follow these essential steps at your own pace so nothing feels overwhelming.',
  checklistProgressLabel: 'Your USF Arrival Progress',
  checklistCatAll: 'All Steps',
  checklistCatBefore: '1. Immigration & Arrival',
  checklistCatFirstWeek: '2. First Week on Campus',
  checklistCatCampusLife: '3. Settling Into Tampa',
  checklistAddCustomTitle: 'Add a Personal Checklist Goal',
  checklistAddCustomPlaceholder: 'e.g., Buy bedding at Target on Fletcher Ave...',
  checklistAddBtn: 'Add Task',
  chk1Title: 'Complete OIS Immigration Check-In (iStart)',
  chk1Desc: 'Upload your I-20 / DS-2019, passport visa stamp, and I-94 record on the USF Office of International Services (OIS) iStart portal.',
  chk2Title: 'Submit Immunization & Medical History Forms',
  chk2Desc: 'Clear registration holds by submitting your vaccination records to USF Student Health Services (SHS).',
  chk3Title: 'Get Your USF BullCard ID at the MSC',
  chk3Desc: 'Visit the BullCard Office on the 1st floor of the Marshall Student Center (MSC 1505) for campus access, dining, and library borrowing.',
  chk4Title: 'Set Up a US SIM Card & Student Bank Account',
  chk4Desc: 'Bring your passport and I-20 to open a fee-free student checking account (e.g., USF Federal Credit Union at MSC) and activate a local phone plan.',
  chk5Title: 'Download Passio GO! for the USF Bull Runner Bus',
  chk5Desc: 'Ride the USF Bull Runner shuttles and Tampa HART buses for free with your USF BullCard to get to classes and grocery stores.',
  chk6Title: 'Join Cultural Clubs on BullsConnect',
  chk6Desc: 'Explore BRASA, LASA, ISA, ASA, JCC, and 600+ organizations on BullsConnect and attend International Student Orientation.',
  chk7Title: 'Understand On-Campus Employment & SSN Rules',
  chk7Desc: 'F-1 students can work up to 20 hrs/week on campus during semesters. Get an employment letter from your department and OIS before applying for a Social Security Number (SSN).',

  profileTitle: 'Your USF Global Profile & Account',
  profileSubtitle: 'Share your roots, languages, and academic journey. You can pick up to 3 options for Country, Ancestry, and Major, and add custom languages or interests!',
  profileSaveBtn: 'Save My Profile',
  profileSavedToast: 'Profile saved & updated across Matchmaking and Language Lounges!',
  profileNameLabel: 'Full Name or Preferred Name',
  profileEmailLabel: 'USF Institutional Email (@usf.edu)',
  profileNationalityLabel: 'Nationality / Country (Select up to 3)',
  profileAncestryLabel: 'Ancestry / Heritage (Select up to 3)',
  profileMajorLabel: 'Major / Academic Program (Select up to 3)',
  profileMax3Hint: 'Drop-down list • Up to 3 selections allowed',
  profileYearLabel: 'College Year / Academic Level',
  profileAgeLabel: 'Age',
  profileCampusLabel: 'USF Campus',
  profileNativeLangLabel: 'Native Language(s)',
  profileSpokenLangLabel: 'All Spoken / Practice Languages',
  profileInterestsLabel: 'Personal Interests & Hobbies',
  profileBioLabel: 'Short Bio & Story',
  profileLookingForLabel: 'What kind of connections are you looking for?',
  profileAddCustomLangBtn: '+ Add Custom Language',
  profileAddCustomInterestBtn: '+ Add Custom Interest',
  profileCustomLangPlaceholder: 'Type a language (e.g., Catalan, Guarani, Tamil)...',
  profileCustomInterestPlaceholder: 'Type an interest (e.g., Capoeira, Matcha, Chess)...',
  profileAddConfirmBtn: 'Add',
  profilePrivacyTitle: 'Security & Privacy Preferences',
  profilePrivacyShowAge: 'Show my age on my profile card',
  profilePrivacyVerifiedOnly: 'Only allow verified @usf.edu students to send me Direct Messages',
  profilePrivacyAppearMatch: 'Include my profile in Matchmaking search results',

  securityModalTitle: 'USF Student Safety & Protection Center',
  securityModalSubtitle: 'BullsGlobal is built from the ground up to keep international students safe, respected, and protected.',
  securityFeature1Title: 'Verified @usf.edu Exclusivity',
  securityFeature1Desc: 'Every member is verified through their official University of South Florida email to prevent bots, scammers, or non-students from entering.',
  securityFeature2Title: 'Granular Privacy & Instant Block',
  securityFeature2Desc: 'You control whether your age is visible, who can DM you, and you can mute or report any account with one click.',
  securityFeature3Title: 'Safe Campus Meetups',
  securityFeature3Desc: 'We encourage meeting new friends in busy campus hubs like the Marshall Student Center (MSC), USF Library, or OIS Global Lounge.',
  securityEmergencyContacts: 'USF Police Non-Emergency: (813) 974-2628 • USF Office of International Services: (813) 974-5102',
  closeBtn: 'Close',
  selectPlaceholder: 'Click to open list & select...',
  maxReachedNote: 'Maximum of 3 selected'
};

const pt: TranslationKeys = {
  appName: 'BullsGlobal',
  appTagline: 'Comunidade Internacional de Alunos da USF',
  navHome: 'Início',
  navMatchmaking: 'Buscar Pessoas',
  navChats: 'Chats por Língua',
  navDMs: 'Mensagens (DMs)',
  navEvents: 'Eventos & Clubes',
  navChecklist: 'Checklist Inicial',
  navProfile: 'Meu Perfil',
  verifiedBull: 'Verificado @usf.edu',
  safetyShield: 'Seguro & Protegido',
  uiLanguageLabel: 'Idioma do Site',
  chatsNotTranslatedNote: 'Site traduzido • Os chats permanecem na língua original',

  homeBadge: 'University of South Florida • Comunidade Global',
  homeTitleLine1: 'O seu mundo se encontra aqui,',
  homeTitleHighlight: 'dentro da USF.',
  homeSubtitle: 'Um espaço acolhedor, humano e seguro para conhecer estudantes que compartilham sua língua, ancestralidade, curso e interesses em Tampa Bay.',
  homePrimaryCta: 'Encontrar Pessoas (Match)',
  homeSecondaryCta: 'Entrar nos Chats de Línguas',
  homeProfileCta: 'Editar Meu Perfil',
  homeStatCountries: '130+ Nacionalidades',
  homeStatLanguages: '45+ Línguas Faladas',
  homeStatVerified: '100% Protegido @usf.edu',
  homePillar1Title: 'Chats por Língua',
  homePillar1Desc: 'Converse na sua língua nativa ou de interesse com a nacionalidade exibida ao lado de cada nome.',
  homePillar2Title: 'Matchmaking & DMs Íntimas',
  homePillar2Desc: 'Selecione múltiplas línguas, cursos, anos e interesses para criar conexões reais 1-a-1.',
  homePillar3Title: 'Clubes Culturais BullsConnect',
  homePillar3Desc: 'Explore eventos da BRASA, LASA, JCC, ASA e clubes filtrados por região/continente.',
  homeNewStudentBanner: 'Acabou de chegar na USF e não sabe por onde começar?',
  homeNewStudentBtn: 'Abrir Checklist Inicial de Chegada →',

  matchTitle: 'Encontre Sua Galera na USF',
  matchSubtitle: 'Selecione quantas opções quiser em tudo (línguas, nacionalidades, cursos, anos da faculdade e interesses) para achar seu match ideal.',
  matchTargetLanguages: 'Línguas Alvo (Múltipla Escolha)',
  matchTargetNationalities: 'Nacionalidades / Ancestralidade (Múltipla Escolha)',
  matchInterests: 'Interesses para Conversar (Múltipla Escolha)',
  matchAdvancedToggle: 'Filtros Avançados (Curso/Major, Ano, Idade)',
  matchHideAdvanced: 'Ocultar Filtros Avançados',
  matchMajors: 'Cursos / Majors (Múltipla Escolha)',
  matchYears: 'Ano da Faculdade (Múltipla Escolha)',
  matchAges: 'Faixa Etária (Múltipla Escolha)',
  matchClearFilters: 'Limpar Todos os Filtros',
  matchMultiSelectHint: 'Você pode selecionar mais de uma opção em todos os filtros abaixo',
  matchResultsCount: 'estudantes da USF compatíveis encontrados',
  matchCompatibility: 'Compatível',
  matchSharedTraits: 'Pontos em comum:',
  matchSendDM: 'Enviar DM Pessoal',
  matchViewRoom: 'Sala de Idioma',
  matchAddCustomLang: '+ Língua Customizada',
  matchAddCustomInterest: '+ Interesse Customizado',
  matchSearchPlaceholder: 'Buscar por nome, país, curso ou interesse...',
  matchNoResults: 'Nenhum estudante correspondeu a todos os filtros. Tente remover algum filtro!',

  chatsTitle: 'Chats por Língua Nativa & Interesse',
  chatsSubtitle: 'Pratique um idioma ou mate a saudade de casa. A nacionalidade de cada usuário aparece ao lado do nome.',
  chatsRoomsHeader: 'Salas por Idioma',
  chatsCreateRoomBtn: '+ Criar Sala de Língua',
  chatsRulesTitle: 'Regras do Chat & Idioma Permitido',
  chatsRulesBodyPrefix: 'Nesta sala, só é permitido conversar na língua-alvo: ',
  chatsRulesBodySuffix: ' (e em Inglês apenas caso seja estritamente necessário para ajuda ou tradução).',
  chatsRulesRespect: 'Seja acolhedor com quem está aprendendo e respeite todas as culturas. Exclusivo para alunos USF.',
  chatsNationalityBadgeHint: 'Nacionalidades exibidas ao lado do nome de quem conversa',
  chatsInputPlaceholder: 'Escreva uma mensagem na língua da sala (ou inglês se necessário)...',
  chatsSendBtn: 'Enviar',
  chatsMessageInRoomNote: 'As mensagens do chat não são traduzidas automaticamente para preservar a prática real do idioma.',
  chatsStartDMWith: 'Conversar no Privado (DM)',
  chatsActiveNow: 'alunos online',

  dmsTitle: 'Mensagens Diretas (DMs Pessoais)',
  dmsSubtitle: 'Conecte-se de forma mais próxima e íntima com outros estudantes internacionais em um ambiente seguro.',
  dmsConversations: 'Suas Conversas',
  dmsEncryptedBadge: 'Canal Pessoal Protegido @usf.edu',
  dmsIcebreakersTitle: 'Sugestões para puxar assunto (Clique para enviar):',
  dmsIcebreaker1: 'Oi! Topa tomar um café no Marshall Student Center (MSC) essa semana?',
  dmsIcebreaker2: 'Olá! Vi que falamos o mesmo idioma e temos interesses parecidos—como está sendo seu semestre na USF?',
  dmsIcebreaker3: 'E aí! Quer praticar conversação ou estudar juntos na biblioteca da USF?',
  dmsInputPlaceholder: 'Escreva uma mensagem pessoal...',
  dmsBlockReport: 'Segurança / Denunciar',
  dmsSafetyReminder: 'Sempre marque os primeiros encontros em locais públicos do campus (como MSC ou Biblioteca).',
  dmsSharedWithYou: 'Em comum com você:',

  eventsTitle: 'Eventos de Clubes Culturais (BullsConnect)',
  eventsSubtitle: 'Eventos e clubes culturais extraídos da API do BullsConnect da USF, filtrados por região e continente.',
  eventsApiBadge: 'API BullsConnect Sincronizada',
  eventsFilterRegionLabel: 'Filtrar por Região / Continente:',
  regionAll: 'Todas as Regiões',
  regionLatinAmerica: 'América Latina & Caribe',
  regionEurope: 'Europa',
  regionEastAsia: 'Leste & Sudeste Asiático',
  regionSouthAsia: 'Sul da Ásia',
  regionMena: 'Oriente Médio & Norte da África',
  regionSubSaharanAfrica: 'África Sub-saariana',
  regionGlobal: 'Global / Todas Nacionalidades',
  eventsSearchPlaceholder: 'Buscar clube (ex. BRASA, LASA, Irish, Japanese)...',
  eventsRsvpBtn: 'Confirmar Presença',
  eventsRsvpedBtn: 'Confirmado ✓',
  eventsOpenBullsConnect: 'Abrir no BullsConnect',
  eventsAttendees: 'alunos confirmados',
  eventsRefreshApi: 'Sincronizar API BullsConnect',

  checklistTitle: 'Checklist Inicial para Novos Alunos na USF',
  checklistSubtitle: 'Chegando agora na USF e não sabe por onde começar? Siga este passo a passo essencial no seu ritmo.',
  checklistProgressLabel: 'Seu Progresso de Chegada na USF',
  checklistCatAll: 'Todos os Passos',
  checklistCatBefore: '1. Imigração & Chegada',
  checklistCatFirstWeek: '2. Primeira Semana no Campus',
  checklistCatCampusLife: '3. Vida em Tampa',
  checklistAddCustomTitle: 'Adicionar Tarefa Pessoal ao Checklist',
  checklistAddCustomPlaceholder: 'ex: Comprar roupa de cama no Target da Fletcher Ave...',
  checklistAddBtn: 'Adicionar',
  chk1Title: 'Fazer Check-in de Imigração no OIS (Portal iStart)',
  chk1Desc: 'Envie seu I-20 / DS-2019, visto do passaporte e registro I-94 no portal iStart do Office of International Services (OIS).',
  chk2Title: 'Enviar Comprovantes de Vacinação (Immunization Hold)',
  chk2Desc: 'Libere sua matrícula enviando seus comprovantes médicos para o USF Student Health Services.',
  chk3Title: 'Emitir seu Cartão USF BullCard no MSC',
  chk3Desc: 'Vá ao escritório do BullCard no 1º andar do Marshall Student Center (MSC 1505) para ter acesso aos prédios, restaurante e ônibus.',
  chk4Title: 'Chip de Celular (SIM Card) e Conta Bancária nos EUA',
  chk4Desc: 'Leve seu passaporte e I-20 para abrir uma conta universitária sem taxas (ex: USF Federal Credit Union no MSC) e ativar seu número.',
  chk5Title: 'Baixar o App Passio GO! (Ônibus USF Bull Runner)',
  chk5Desc: 'Use os ônibus do campus (Bull Runner) e da cidade (HART) gratuitamente apresentando seu BullCard.',
  chk6Title: 'Entrar em Clubes Culturais no BullsConnect',
  chk6Desc: 'Participe da BRASA, LASA, ISA, ASA, JCC e eventos de boas-vindas para estudantes internacionais.',
  chk7Title: 'Regras de Trabalho no Campus e SSN',
  chk7Desc: 'Alunos com visto F-1 podem trabalhar até 20h/semana no campus. Obtenha a carta de oferta e aprovação do OIS para solicitar o Social Security Number.',

  profileTitle: 'Sua Conta & Perfil Global USF',
  profileSubtitle: 'Compartilhe sua nacionalidade, ancestralidade, línguas, curso e interesses. Escolha até 3 opções nas listas de País, Ancestralidade e Major, ou adicione línguas e interesses customizados!',
  profileSaveBtn: 'Salvar Meu Perfil',
  profileSavedToast: 'Perfil salvo e atualizado no Matchmaking e nos Chats!',
  profileNameLabel: 'Nome Completo ou Apelido',
  profileEmailLabel: 'E-mail Institucional da USF (@usf.edu)',
  profileNationalityLabel: 'Nacionalidade / País (Selecione até 3)',
  profileAncestryLabel: 'Ancestralidade / Origem (Selecione até 3)',
  profileMajorLabel: 'Major / Curso (Selecione até 3)',
  profileMax3Hint: 'Drop list • Selecione até 3 opções',
  profileYearLabel: 'Ano da Faculdade',
  profileAgeLabel: 'Idade',
  profileCampusLabel: 'Campus da USF',
  profileNativeLangLabel: 'Língua(s) Nativa(s)',
  profileSpokenLangLabel: 'Todas as Línguas Faladas / De Interesse',
  profileInterestsLabel: 'Interesses Pessoais & Hobbies',
  profileBioLabel: 'Sobre Mim (Bio)',
  profileLookingForLabel: 'O que você procura conversar ou compartilhar?',
  profileAddCustomLangBtn: '+ Inserir Língua Customizável',
  profileAddCustomInterestBtn: '+ Inserir Interesse Customizável',
  profileCustomLangPlaceholder: 'Digite a língua (ex: Guarani, Catalão, Libras)...',
  profileCustomInterestPlaceholder: 'Digite o interesse (ex: Futevôlei, Açaí, Xadrez)...',
  profileAddConfirmBtn: 'Inserir',
  profilePrivacyTitle: 'Segurança e Privacidade da Conta',
  profilePrivacyShowAge: 'Mostrar minha idade no meu cartão de perfil',
  profilePrivacyVerifiedOnly: 'Permitir DMs apenas de estudantes verificados (@usf.edu)',
  profilePrivacyAppearMatch: 'Aparecer nos resultados do sistema de Matchmaking',

  securityModalTitle: 'Central de Segurança & Proteção USF',
  securityModalSubtitle: 'O BullsGlobal foi desenhado para ser um ambiente acolhedor, seguro e protegido para alunos internacionais.',
  securityFeature1Title: 'Verificação Exclusiva @usf.edu',
  securityFeature1Desc: 'Todos os perfis são validados com e-mail oficial da University of South Florida para garantir uma comunidade autêntica.',
  securityFeature2Title: 'Controle de Privacidade & Bloqueio Rápido',
  securityFeature2Desc: 'Escolha quem pode enviar DMs, oculte sua idade se preferir e denuncie qualquer comportamento inadequado em 1 clique.',
  securityFeature3Title: 'Dicas de Encontros Seguros no Campus',
  securityFeature3Desc: 'Recomendamos sempre marcar os primeiros cafés no Marshall Student Center (MSC), Biblioteca da USF ou Global Lounge.',
  securityEmergencyContacts: 'Polícia USF (Não-Emergência): (813) 974-2628 • USF OIS Internacional: (813) 974-5102',
  closeBtn: 'Fechar',
  selectPlaceholder: 'Clique para abrir a lista e selecionar...',
  maxReachedNote: 'Limite máximo de 3 opções atingido'
};

const es: TranslationKeys = {
  ...en,
  appTagline: 'Comunidad de Estudiantes Internacionales de USF',
  navHome: 'Inicio',
  navMatchmaking: 'Buscar Personas',
  navChats: 'Chats de Idiomas',
  navDMs: 'Mensajes (DMs)',
  navEvents: 'Eventos y Clubes',
  navChecklist: 'Lista de Llegada',
  navProfile: 'Mi Perfil',
  verifiedBull: 'Verificado @usf.edu',
  safetyShield: 'Seguro y Protegido',
  uiLanguageLabel: 'Idioma del Sitio',
  chatsNotTranslatedNote: 'Interfaz traducida • Los chats se mantienen en su idioma original',
  homeBadge: 'University of South Florida • Comunidad Global',
  homeTitleLine1: 'Tu mundo se conecta aquí,',
  homeTitleHighlight: 'en el corazón de USF.',
  homeSubtitle: 'Un espacio cálido, humano y seguro para conocer estudiantes que comparten tu idioma, raíces, carrera e intereses en Tampa Bay.',
  homePrimaryCta: 'Encontrar Personas (Match)',
  homeSecondaryCta: 'Entrar a Chats de Idiomas',
  homeProfileCta: 'Personalizar Mi Perfil',
  homeNewStudentBanner: '¿Acabas de llegar a USF y no sabes por dónde empezar?',
  homeNewStudentBtn: 'Abrir Lista Inicial de Llegada →',
  matchTitle: 'Encuentra a tu Gente en USF',
  matchSubtitle: 'Selecciona múltiples opciones en idiomas, nacionalidades, carreras, años e intereses para conectar.',
  matchTargetLanguages: 'Idiomas de Interés (Selección Múltiple)',
  matchTargetNationalities: 'Nacionalidades / Ascendencia (Selección Múltiple)',
  matchInterests: 'Intereses para Conversar (Selección Múltiple)',
  matchAdvancedToggle: 'Filtros Avanzados (Carrera, Año, Edad)',
  matchHideAdvanced: 'Ocultar Filtros Avanzados',
  matchMajors: 'Carreras / Majors (Selección Múltiple)',
  matchYears: 'Año Universitario (Selección Múltiple)',
  matchAges: 'Rango de Edad (Selección Múltiple)',
  matchClearFilters: 'Limpiar Filtros',
  matchSendDM: 'Enviar DM Personal',
  chatsTitle: 'Salas de Chat por Idioma',
  chatsRulesTitle: 'Reglas del Chat e Idioma Permitido',
  chatsRulesBodyPrefix: 'En esta sala, por favor habla ÚNICAMENTE en ',
  chatsRulesBodySuffix: ' (y en inglés solo si es estrictamente necesario para ayuda o aclaración).',
  dmsTitle: 'Mensajes Directos Personales (DMs)',
  eventsTitle: 'Eventos de Clubes Culturales (BullsConnect)',
  eventsFilterRegionLabel: 'Filtrar por Región / Continente:',
  regionAll: 'Todas las Regiones',
  regionLatinAmerica: 'América Latina y el Caribe',
  regionEurope: 'Europa',
  regionEastAsia: 'Asia Oriental y Sudoriental',
  regionSouthAsia: 'Sur de Asia',
  regionMena: 'Medio Oriente y Norte de África',
  regionSubSaharanAfrica: 'África Subsahariana',
  regionGlobal: 'Global / Todas las Nacionalidades',
  checklistTitle: 'Checklist Inicial para Nuevos Estudiantes en USF',
  profileTitle: 'Tu Cuenta y Perfil Global en USF',
  profileNationalityLabel: 'Nacionalidad / País (Hasta 3 opciones)',
  profileAncestryLabel: 'Ascendencia / Origen (Hasta 3 opciones)',
  profileMajorLabel: 'Carrera / Major (Hasta 3 opciones)',
  profileAddCustomLangBtn: '+ Añadir Idioma Personalizado',
  profileAddCustomInterestBtn: '+ Añadir Interés Personalizado',
  profileSaveBtn: 'Guardar Mi Perfil',
};

const fr: TranslationKeys = {
  ...en,
  appTagline: 'Communauté Internationale des Étudiants de USF',
  navHome: 'Accueil',
  navMatchmaking: 'Trouver des Amis',
  navChats: 'Salons de Langues',
  navDMs: 'Messages Privés',
  navEvents: 'Événements & Clubs',
  navChecklist: 'Checklist d’Arrivée',
  navProfile: 'Mon Profil',
  verifiedBull: 'Vérifié @usf.edu',
  safetyShield: 'Sûr et Protégé',
  uiLanguageLabel: 'Langue du Site',
  chatsNotTranslatedNote: 'Site traduit • Les messages du chat restent dans leur langue d’origine',
  homeTitleLine1: 'Votre monde se rencontre ici,',
  homeTitleHighlight: 'au cœur de USF.',
  homeSubtitle: 'Un espace chaleureux, humain et sécurisé pour rencontrer des étudiants qui partagent votre langue, vos origines, vos études et vos passions.',
  homePrimaryCta: 'Trouver des Étudiants',
  homeSecondaryCta: 'Salons de Langues',
  homeProfileCta: 'Mon Profil',
  homeNewStudentBanner: 'Nouveau à USF et vous ne savez pas par où commencer ?',
  homeNewStudentBtn: 'Voir la Checklist d’Arrivée →',
  matchTitle: 'Trouvez Vos Amis à USF',
  matchSubtitle: 'Sélectionnez plusieurs langues, nationalités, filières, années et centres d’intérêt.',
  chatsTitle: 'Salons de Discussion par Langue',
  chatsRulesTitle: 'Règles du Salon Linguistique',
  chatsRulesBodyPrefix: 'Dans ce salon, veuillez parler UNIQUEMENT en ',
  chatsRulesBodySuffix: ' (et en anglais uniquement si nécessaire pour vous aider).',
  dmsTitle: 'Messages Directs (DMs Personnels)',
  eventsTitle: 'Événements des Clubs Culturels (BullsConnect)',
  eventsFilterRegionLabel: 'Filtrer par Région / Continent :',
  regionAll: 'Toutes les Régions',
  regionLatinAmerica: 'Amérique Latine et Caraïbes',
  regionEurope: 'Europe',
  regionEastAsia: 'Asie de l’Est et du Sud-Est',
  regionSouthAsia: 'Asie du Sud',
  regionMena: 'Moyen-Orient et Afrique du Nord',
  regionSubSaharanAfrica: 'Afrique Subsaharienne',
  regionGlobal: 'Global / Toutes Nationalités',
  checklistTitle: 'Checklist d’Arrivée pour Nouveaux Étudiants USF',
  profileTitle: 'Votre Compte et Profil USF',
  profileNationalityLabel: 'Nationalité / Pays (Jusqu’à 3 choix)',
  profileAncestryLabel: 'Ascendance / Origine (Jusqu’à 3 choix)',
  profileMajorLabel: 'Majeure / Filière (Jusqu’à 3 choix)',
  profileAddCustomLangBtn: '+ Ajouter une Langue',
  profileAddCustomInterestBtn: '+ Ajouter un Intérêt',
  profileSaveBtn: 'Enregistrer Mon Profil',
};

const ar: TranslationKeys = {
  ...en,
  appTagline: 'مجتمع الطلاب الدوليين في جامعة جنوب فلوريدا USF',
  navHome: 'الرئيسية',
  navMatchmaking: 'ابحث عن أصدقاء',
  navChats: 'غرف اللغات',
  navDMs: 'الرسائل الخاصة',
  navEvents: 'الفعاليات والأندية',
  navChecklist: 'قائمة الوصول',
  navProfile: 'ملفي الشخصي',
  verifiedBull: 'موثق @usf.edu',
  safetyShield: 'آمن ومحمي',
  uiLanguageLabel: 'لغة الموقع',
  chatsNotTranslatedNote: 'تمت ترجمة الموقع • تبقى رسائل الدردشة بلغتها الأصلية',
  homeTitleLine1: 'عالمك يلتقي هنا،',
  homeTitleHighlight: 'في رحاب USF.',
  homeSubtitle: 'مساحة دافئة وآمنة للتعرف على الطلاب الذين يشاركونك لغتك، أصولك، تخصصك واهتماماتك في تامبا.',
  homePrimaryCta: 'ابحث عن أصدقاء (Match)',
  homeSecondaryCta: 'ادخل غرف اللغات',
  homeProfileCta: 'تعديل ملفي الشخصي',
  homeNewStudentBanner: 'هل وصلت للتو إلى USF ولا تعرف من أين تبدأ؟',
  homeNewStudentBtn: 'افتح قائمة خطوات الوصول →',
  matchTitle: 'ابحث عن أصدقاء متوافقين في USF',
  chatsTitle: 'غرف الدردشة حسب اللغة',
  chatsRulesTitle: 'قواعد غرفة اللغة',
  chatsRulesBodyPrefix: 'في هذه الغرفة، يرجى التحدث فقط باللغة المحددة: ',
  chatsRulesBodySuffix: ' (وباللغة الإنجليزية فقط عند الضرورة القصوى للمساعدة).',
  dmsTitle: 'الرسائل الخاصة المباشرة (DMs)',
  eventsTitle: 'فعاليات الأندية الثقافية (BullsConnect)',
  eventsFilterRegionLabel: 'تصفية حسب المنطقة / القارة:',
  regionAll: 'جميع المناطق',
  regionLatinAmerica: 'أمريكا اللاتينية والكاريبي',
  regionEurope: 'أوروبا',
  regionEastAsia: 'شرق وجنوب شرق آسيا',
  regionSouthAsia: 'جنوب آسيا',
  regionMena: 'الشرق الأوسط وشمال أفريقيا',
  regionSubSaharanAfrica: 'أفريقيا جنوب الصحراء',
  regionGlobal: 'عالمي / جميع الجنسيات',
  checklistTitle: 'قائمة الخطوات الأساسية للطلاب الجدد في USF',
  profileTitle: 'حسابك وملفك الشخصي في USF',
  profileNationalityLabel: 'الجنسية / البلد (اختر حتى 3)',
  profileAncestryLabel: 'الأصل / التراث (اختر حتى 3)',
  profileMajorLabel: 'التخصص الجامعي (اختر حتى 3)',
  profileAddCustomLangBtn: '+ إضافة لغة مخصصة',
  profileAddCustomInterestBtn: '+ إضافة اهتمام مخصص',
  profileSaveBtn: 'حفظ الملف الشخصي',
};

const zh: TranslationKeys = {
  ...en,
  appTagline: 'USF 南佛罗里达大学国际学生社区',
  navHome: '首页',
  navMatchmaking: '寻找伙伴',
  navChats: '语言聊天室',
  navDMs: '私信 (DMs)',
  navEvents: '文化社团活动',
  navChecklist: '新生清单',
  navProfile: '我的资料',
  verifiedBull: '已认证 @usf.edu',
  safetyShield: '安全保护',
  uiLanguageLabel: '界面语言',
  chatsNotTranslatedNote: '界面已翻译 • 聊天消息保持原始语言',
  homeTitleLine1: '世界在此相遇，',
  homeTitleHighlight: '就在 USF。',
  homeSubtitle: '一个温暖、安全、人性化的社区，在这里结识与你拥有相同语言、文化背景、专业和兴趣的 USF 同学。',
  homePrimaryCta: '寻找匹配伙伴',
  homeSecondaryCta: '进入语言聊天室',
  homeProfileCta: '完善个人资料',
  homeNewStudentBanner: '刚来到 USF 不知道从何开始？',
  homeNewStudentBtn: '打开 USF 新生必办清单 →',
  matchTitle: '在 USF 寻找志同道合的朋友',
  matchSubtitle: '所有筛选项（语言、国籍、专业、年级、年龄、兴趣）均支持多选。',
  chatsTitle: '母语与目标语言聊天室',
  chatsRulesTitle: '聊天室语言与社区规则',
  chatsRulesBodyPrefix: '在本聊天室中，请仅使用目标语言交流：',
  chatsRulesBodySuffix: '（仅在必要求助或解释时可使用英语）。',
  dmsTitle: '一对一私密消息 (DMs)',
  eventsTitle: 'BullsConnect 文化社团与活动',
  eventsFilterRegionLabel: '按地区/大洲筛选社团：',
  regionAll: '全部地区',
  regionLatinAmerica: '拉丁美洲与加勒比',
  regionEurope: '欧洲',
  regionEastAsia: '东亚与东南亚',
  regionSouthAsia: '南亚',
  regionMena: '中东与北非',
  regionSubSaharanAfrica: '撒哈拉以南非洲',
  regionGlobal: '全球 / 跨文化社团',
  checklistTitle: 'USF 国际新生入学必办清单',
  profileTitle: '我的 USF 个人账户与资料',
  profileNationalityLabel: '国籍 / 国家（最多选 3 项）',
  profileAncestryLabel: '族裔 / 血统（最多选 3 项）',
  profileMajorLabel: '专业 / Major（最多选 3 项）',
  profileAddCustomLangBtn: '+ 添加自定义语言',
  profileAddCustomInterestBtn: '+ 添加自定义兴趣',
  profileSaveBtn: '保存个人资料',
};

const hi: TranslationKeys = {
  ...en,
  appTagline: 'USF अंतर्राष्ट्रीय छात्र समुदाय',
  navHome: 'होम',
  navMatchmaking: 'दोस्त खोजें',
  navChats: 'भाषा चैट रूम',
  navDMs: 'निजी संदेश (DMs)',
  navEvents: 'सांस्कृतिक कार्यक्रम',
  navChecklist: 'आगमन चेकलिस्ट',
  navProfile: 'मेरी प्रोफ़ाइल',
  verifiedBull: 'सत्यापित @usf.edu',
  safetyShield: 'सुरक्षित समुदाय',
  uiLanguageLabel: 'साइट की भाषा',
  chatsNotTranslatedNote: 'पेज अनुवादित • चैट संदेश मूल भाषा में ही रहते हैं',
  homeTitleLine1: 'आपकी दुनिया यहाँ मिलती है,',
  homeTitleHighlight: 'USF कैंपस में।',
  homeSubtitle: 'एक सुरक्षित और अपनापन भरा मंच जहाँ आप अपनी भाषा, संस्कृति, मेजर और रुचियों वाले छात्रों से जुड़ सकते हैं।',
  homePrimaryCta: 'मैचमेकिंग शुरू करें',
  homeSecondaryCta: 'भाषा चैट रूम में जाएं',
  homeProfileCta: 'प्रोफ़ाइल अपडेट करें',
  homeNewStudentBanner: 'क्या आप USF में नए हैं और शुरुआत कैसे करें सोच रहे हैं?',
  homeNewStudentBtn: 'नई आगमन चेकलिस्ट खोलें →',
  matchTitle: 'USF में अपने जैसे दोस्त खोजें',
  chatsTitle: 'भाषा चैट रूम (Language Lounges)',
  chatsRulesTitle: 'चैट रूम के नियम',
  chatsRulesBodyPrefix: 'कृपया इस चैट रूम में केवल लक्षित भाषा में बात करें: ',
  chatsRulesBodySuffix: ' (और केवल आवश्यकता पड़ने पर ही अंग्रेज़ी का उपयोग करें)।',
  dmsTitle: 'व्यक्तिगत संदेश (Direct Messages)',
  eventsTitle: 'सांस्कृतिक क्लब और कार्यक्रम (BullsConnect)',
  eventsFilterRegionLabel: 'क्षेत्र / महाद्वीप के अनुसार फ़िल्टर करें:',
  regionAll: 'सभी क्षेत्र',
  regionLatinAmerica: 'लैटिन अमेरिका और कैरिबियन',
  regionEurope: 'यूरोप',
  regionEastAsia: 'पूर्वी और दक्षिण-पूर्व एशिया',
  regionSouthAsia: 'दक्षिण एशिया',
  regionMena: 'मध्य पूर्व और उत्तरी अफ्रीका',
  regionSubSaharanAfrica: 'उप-सहारा अफ्रीका',
  regionGlobal: 'वैश्विक / सभी राष्ट्रीयताएं',
  checklistTitle: 'नए USF अंतर्राष्ट्रीय छात्रों के लिए चेकलिस्ट',
  profileTitle: 'आपकी USF प्रोफ़ाइल और खाता',
  profileNationalityLabel: 'राष्ट्रीयता / देश (अधिकतम 3 चुनें)',
  profileAncestryLabel: 'वंश / मूल (अधिकतम 3 चुनें)',
  profileMajorLabel: 'मेजर / कोर्स (अधिकतम 3 चुनें)',
  profileAddCustomLangBtn: '+ अपनी भाषा जोड़ें',
  profileAddCustomInterestBtn: '+ अपनी रुचि जोड़ें',
  profileSaveBtn: 'प्रोफ़ाइल सहेजें',
};

const ja: TranslationKeys = {
  ...en,
  appTagline: 'USF 留学生コミュニティ',
  navHome: 'ホーム',
  navMatchmaking: '仲間を探す',
  navChats: '言語チャット',
  navDMs: 'ダイレクトメッセージ',
  navEvents: '文化イベント',
  navChecklist: '渡航・入学チェックリスト',
  navProfile: 'マイプロフィール',
  verifiedBull: '認証済み @usf.edu',
  safetyShield: '安心・安全設計',
  uiLanguageLabel: '表示言語',
  chatsNotTranslatedNote: 'UI翻訳済み • チャットメッセージは元の言語のまま表示されます',
  homeTitleLine1: '世界とつながる場所、',
  homeTitleHighlight: 'ここUSFで。',
  homeSubtitle: '同じ母国語や学びたい言語、ルーツ、専攻、趣味を持つUSFの仲間と安心して出会える温かいコミュニティです。',
  homePrimaryCta: 'マッチングで仲間を探す',
  homeSecondaryCta: '言語ラウンジへ入る',
  homeProfileCta: 'プロフィール編集',
  homeNewStudentBanner: 'USFに到着したばかりで、何から始めればいいか迷っていますか？',
  homeNewStudentBtn: '新入生チェックリストを見る →',
  matchTitle: 'USFで気の合う仲間を見つけよう',
  chatsTitle: '言語別チャットラウンジ',
  chatsRulesTitle: 'チャットのルールと使用言語',
  chatsRulesBodyPrefix: 'このルームでは対象言語のみで会話してください：',
  chatsRulesBodySuffix: '（助けや補足が必要な場合のみ英語の使用が可能です）。',
  dmsTitle: '個人メッセージ (DM)',
  eventsTitle: '文化クラブ＆イベント (BullsConnect連携)',
  eventsFilterRegionLabel: '地域・大陸で絞り込む：',
  regionAll: 'すべての地域',
  regionLatinAmerica: 'ラテンアメリカ・カリブ海',
  regionEurope: 'ヨーロッパ',
  regionEastAsia: '東アジア・東南アジア',
  regionSouthAsia: '南アジア',
  regionMena: '中東・北アフリカ',
  regionSubSaharanAfrica: 'サブサハラ・アフリカ',
  regionGlobal: 'グローバル・多文化',
  checklistTitle: 'USF新入留学生スタートチェックリスト',
  profileTitle: 'アカウント＆プロフィール設定',
  profileNationalityLabel: '国籍・出身国（最大3つまで選択可）',
  profileAncestryLabel: 'ルーツ・祖先（最大3つまで選択可）',
  profileMajorLabel: '専攻・Major（最大3つまで選択可）',
  profileAddCustomLangBtn: '+ カスタム言語を追加',
  profileAddCustomInterestBtn: '+ カスタム興味を追加',
  profileSaveBtn: 'プロフィールを保存',
};

export const TRANSLATIONS: Record<UILanguageCode, TranslationKeys> = {
  en,
  pt,
  es,
  fr,
  ar,
  zh,
  hi,
  ja,
};
