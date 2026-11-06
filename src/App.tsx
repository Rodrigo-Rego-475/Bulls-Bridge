import React, { useState, useEffect } from 'react';
import {
  NavTab,
  UILanguageCode,
  StudentProfile,
  LanguageRoom,
  ChatMessage,
  DirectMessageThread,
  ChecklistItem,
} from './types';
import { TRANSLATIONS, UI_LANGUAGES } from './i18n/translations';
import {
  DEFAULT_USER_PROFILE,
  MOCK_STUDENTS,
  INITIAL_LANGUAGES,
  INITIAL_INTERESTS,
  INITIAL_LANGUAGE_ROOMS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_DM_THREADS,
  INITIAL_CHECKLIST,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { MatchmakingView } from './components/MatchmakingView';
import { LanguageChatsView } from './components/LanguageChatsView';
import { DirectMessagesView } from './components/DirectMessagesView';
import { EventsView } from './components/EventsView';
import { ChecklistView } from './components/ChecklistView';
import { ProfileView } from './components/ProfileView';
import { SecurityModal } from './components/SecurityModal';

export function App() {
  // Default UI language is English ('en'), with instant full-page translation into 8 languages (except chat messages)
  const [uiLang, setUiLang] = useState<UILanguageCode>(() => {
    const saved = localStorage.getItem('bullsglobal_ui_lang');
    return (saved as UILanguageCode) || 'en';
  });

  // Minimalist Inviting Home Page is the default tab (replaces "Start Here")
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // User Profile state
  const [userProfile, setUserProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('bullsglobal_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_USER_PROFILE;
  });

  // Available Languages & Interests (extensible with custom options)
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(() => {
    const saved = localStorage.getItem('bullsglobal_languages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_LANGUAGES;
  });

  const [availableInterests, setAvailableInterests] = useState<string[]>(() => {
    const saved = localStorage.getItem('bullsglobal_interests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_INTERESTS;
  });

  // Language Rooms & Chat Messages
  const [rooms, setRooms] = useState<LanguageRoom[]>(INITIAL_LANGUAGE_ROOMS);
  const [messagesByRoom, setMessagesByRoom] = useState<
    Record<string, ChatMessage[]>
  >(INITIAL_CHAT_MESSAGES);

  // Direct Messages (1-on-1 DMs)
  const [dmThreads, setDmThreads] =
    useState<DirectMessageThread[]>(INITIAL_DM_THREADS);
  const [activeDmPeerId, setActiveDmPeerId] = useState<string>('stu-1');

  // Arrival Checklist (Dedicated tab)
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('bullsglobal_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_CHECKLIST;
  });

  // Security & Protection Modal
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  // Save state changes
  useEffect(() => {
    localStorage.setItem('bullsglobal_ui_lang', uiLang);
  }, [uiLang]);

  useEffect(() => {
    localStorage.setItem('bullsglobal_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(
      'bullsglobal_languages',
      JSON.stringify(availableLanguages)
    );
  }, [availableLanguages]);

  useEffect(() => {
    localStorage.setItem(
      'bullsglobal_interests',
      JSON.stringify(availableInterests)
    );
  }, [availableInterests]);

  useEffect(() => {
    localStorage.setItem('bullsglobal_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const t = TRANSLATIONS[uiLang] || TRANSLATIONS.en;
  const currentLangMeta = UI_LANGUAGES.find(l => l.code === uiLang);
  const isRtl = currentLangMeta?.dir === 'rtl';

  // Handlers for custom languages and interests
  const handleAddCustomLanguage = (newLang: string) => {
    const cleaned = newLang.trim();
    if (!cleaned) return;
    if (!availableLanguages.some(l => l.toLowerCase() === cleaned.toLowerCase())) {
      setAvailableLanguages(prev => [cleaned, ...prev]);
    }
    // Also ensure a language chat room exists or can be joined for this custom language
    if (!rooms.some(r => r.languageName.toLowerCase() === cleaned.toLowerCase())) {
      const customRoomId = `room-custom-${Date.now()}`;
      const newRoom: LanguageRoom = {
        id: customRoomId,
        languageName: cleaned,
        nativeTitle: `${cleaned} • USF Lounge`,
        flagIcons: ['🗣️', '🐂'],
        description: `USF community lounge for speakers and learners of ${cleaned}.`,
        activeMembersCount: 1,
        isCustom: true,
      };
      setRooms(prev => [...prev, newRoom]);
      setMessagesByRoom(prev => ({
        ...prev,
        [customRoomId]: [
          {
            id: `msg-${Date.now()}`,
            roomId: customRoomId,
            senderId: 'me',
            senderName: userProfile.name,
            senderNationalities: userProfile.nationalities,
            senderMajor: userProfile.majors[0] || 'USF Student',
            senderYear: userProfile.academicYear.split(' ')[0],
            text: `Welcome to the new ${cleaned} lounge at USF! Feel free to practice ${cleaned} (and use English if needed)!`,
            timestamp: 'Just now',
          },
        ],
      }));
    }
  };

  const handleAddCustomInterest = (newInterest: string) => {
    const cleaned = newInterest.trim();
    if (!cleaned) return;
    if (!availableInterests.some(i => i.toLowerCase() === cleaned.toLowerCase())) {
      setAvailableInterests(prev => [cleaned, ...prev]);
    }
  };

  // Send message in a Language Lounge
  const handleSendRoomMessage = (roomId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      senderId: 'me',
      senderName: userProfile.name,
      senderNationalities: userProfile.nationalities,
      senderAncestries: userProfile.ancestries,
      senderMajor: userProfile.majors[0] || 'USF Student',
      senderYear: userProfile.academicYear.split(' ')[0],
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessagesByRoom(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMsg],
    }));
  };

  // Start or open a 1-on-1 Direct Message with a student
  const handleOpenDMWithStudent = (studentId: string) => {
    setActiveDmPeerId(studentId);
    // Clear unread count for this thread
    setDmThreads(prev => {
      const exists = prev.some(th => th.peerId === studentId);
      if (exists) {
        return prev.map(th =>
          th.peerId === studentId ? { ...th, unreadCount: 0 } : th
        );
      }
      return [
        {
          peerId: studentId,
          lastUpdated: 'Just now',
          unreadCount: 0,
          messages: [],
        },
        ...prev,
      ];
    });
    setActiveTab('dms');
  };

  // Send a 1-on-1 Direct Message
  const handleSendDM = (peerId: string, text: string) => {
    const nowTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setDmThreads(prev => {
      const exists = prev.some(th => th.peerId === peerId);
      if (!exists) {
        return [
          {
            peerId,
            lastUpdated: nowTime,
            unreadCount: 0,
            messages: [
              {
                id: `dm-${Date.now()}`,
                senderId: 'me',
                text,
                timestamp: nowTime,
              },
            ],
          },
          ...prev,
        ];
      }
      return prev.map(th =>
        th.peerId === peerId
          ? {
              ...th,
              lastUpdated: nowTime,
              unreadCount: 0,
              messages: [
                ...th.messages,
                {
                  id: `dm-${Date.now()}`,
                  senderId: 'me',
                  text,
                  timestamp: nowTime,
                },
              ],
            }
          : th
      );
    });
  };

  // Checklist handlers
  const handleToggleChecklist = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddChecklistItem = (
    title: string,
    category: ChecklistItem['category']
  ) => {
    const newItem: ChecklistItem = {
      id: `chk-custom-${Date.now()}`,
      category,
      titleKey: title,
      descKey: '',
      customTitle: title,
      locationOrLink: 'USF Tampa Campus / Personal Goal',
      completed: false,
    };
    setChecklist(prev => [...prev, newItem]);
  };

  const unreadDMsCount = dmThreads.reduce(
    (sum, th) => sum + (th.unreadCount || 0),
    0
  );

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E2A24]"
    >
      <Navbar
        t={t}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        uiLang={uiLang}
        onChangeUiLang={setUiLang}
        userProfile={userProfile}
        unreadDMsCount={unreadDMsCount}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeView
            t={t}
            userProfile={userProfile}
            onNavigate={setActiveTab}
            onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
          />
        )}

        {activeTab === 'matchmaking' && (
          <MatchmakingView
            t={t}
            currentUser={userProfile}
            students={MOCK_STUDENTS}
            availableLanguages={availableLanguages}
            availableInterests={availableInterests}
            onAddCustomLanguage={handleAddCustomLanguage}
            onAddCustomInterest={handleAddCustomInterest}
            onStartDM={handleOpenDMWithStudent}
          />
        )}

        {activeTab === 'chats' && (
          <LanguageChatsView
            t={t}
            currentUser={userProfile}
            rooms={rooms}
            messagesByRoom={messagesByRoom}
            onSendMessage={handleSendRoomMessage}
            onCreateCustomRoom={handleAddCustomLanguage}
            onStartDM={handleOpenDMWithStudent}
          />
        )}

        {activeTab === 'dms' && (
          <DirectMessagesView
            t={t}
            currentUser={userProfile}
            students={MOCK_STUDENTS}
            threads={dmThreads}
            activePeerId={activeDmPeerId}
            onSelectPeer={peerId => {
              setActiveDmPeerId(peerId);
              setDmThreads(prev =>
                prev.map(th =>
                  th.peerId === peerId ? { ...th, unreadCount: 0 } : th
                )
              );
            }}
            onSendDM={handleSendDM}
          />
        )}

        {activeTab === 'events' && <EventsView t={t} />}

        {activeTab === 'checklist' && (
          <ChecklistView
            t={t}
            items={checklist}
            onToggleItem={handleToggleChecklist}
            onAddCustomItem={handleAddChecklistItem}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            t={t}
            userProfile={userProfile}
            availableLanguages={availableLanguages}
            availableInterests={availableInterests}
            onSaveProfile={setUserProfile}
            onAddCustomLanguage={handleAddCustomLanguage}
            onAddCustomInterest={handleAddCustomInterest}
          />
        )}
      </main>

      <SecurityModal
        t={t}
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />
    </div>
  );
}

export default App;
