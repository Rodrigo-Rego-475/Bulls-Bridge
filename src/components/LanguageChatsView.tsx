import React, { useState } from 'react';
import {
  MessageCircle,
  ShieldAlert,
  Send,
  Plus,
  Users,
  MessageSquareHeart,
  Info,
} from 'lucide-react';
import { LanguageRoom, ChatMessage, StudentProfile } from '../types';
import { TranslationKeys } from '../i18n/translations';
import { getCountryFlag } from '../data/mockData';

interface LanguageChatsViewProps {
  t: TranslationKeys;
  currentUser: StudentProfile;
  rooms: LanguageRoom[];
  messagesByRoom: Record<string, ChatMessage[]>;
  onSendMessage: (roomId: string, text: string) => void;
  onCreateCustomRoom: (languageName: string) => void;
  onStartDM: (studentId: string) => void;
}

export const LanguageChatsView: React.FC<LanguageChatsViewProps> = ({
  t,
  currentUser,
  rooms,
  messagesByRoom,
  onSendMessage,
  onCreateCustomRoom,
  onStartDM,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || 'room-pt');
  const [messageText, setMessageText] = useState('');
  const [showNewRoomForm, setShowNewRoomForm] = useState(false);
  const [newRoomLang, setNewRoomLang] = useState('');

  const activeRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];
  const currentMessages = messagesByRoom[activeRoom.id] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed) return;
    onSendMessage(activeRoom.id, trimmed);
    setMessageText('');
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newRoomLang.trim();
    if (!trimmed) return;
    onCreateCustomRoom(trimmed);
    setNewRoomLang('');
    setShowNewRoomForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2EE] text-[#006747] text-xs font-semibold mb-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t.chatsNationalityBadgeHint}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E2A24]">
            {t.chatsTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6B62] mt-1 max-w-2xl">
            {t.chatsSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewRoomForm(prev => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#006747] hover:bg-[#004E36] text-white text-xs sm:text-sm font-semibold shadow-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.chatsCreateRoomBtn}</span>
        </button>
      </div>

      {showNewRoomForm && (
        <form
          onSubmit={handleCreateRoom}
          className="rounded-2xl bg-white border border-[#006747]/30 p-4 flex flex-col sm:flex-row items-center gap-3 shadow-warm"
        >
          <input
            type="text"
            value={newRoomLang}
            onChange={e => setNewRoomLang(e.target.value)}
            placeholder={t.profileCustomLangPlaceholder}
            className="flex-1 w-full px-4 py-2.5 rounded-xl border border-[#E2DDD2] text-sm focus:outline-none focus:border-[#006747]"
            autoFocus
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#006747] text-white text-sm font-semibold hover:bg-[#004E36] transition"
          >
            {t.profileAddConfirmBtn}
          </button>
        </form>
      )}

      {/* Main Split Layout: Rooms List + Active Language Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Language Rooms */}
        <aside className="lg:col-span-4 rounded-3xl bg-white border border-[#E2DDD2] p-4 shadow-warm space-y-3 h-fit">
          <h2 className="px-2 text-xs font-bold uppercase tracking-wider text-[#5A6B62]">
            {t.chatsRoomsHeader}
          </h2>
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {rooms.map(room => {
              const isSelected = room.id === activeRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#006747] text-white shadow-md'
                      : 'hover:bg-[#FAF7F2] text-[#1E2A24]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{room.flagIcons.slice(0, 3).join('')}</span>
                      <span className="font-serif font-semibold text-base">
                        {room.languageName}
                      </span>
                    </div>
                    <p
                      className={`text-xs line-clamp-1 ${
                        isSelected ? 'text-[#E6F2EE]/90' : 'text-[#5A6B62]'
                      }`}
                    >
                      {room.nativeTitle}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isSelected
                        ? 'bg-white/15 text-[#CFC493]'
                        : 'bg-[#E6F2EE] text-[#006747]'
                    }`}
                  >
                    <Users className="w-3 h-3" />
                    {room.activeMembersCount}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Panel: Active Chat Room + Rules Banner */}
        <section className="lg:col-span-8 rounded-3xl bg-white border border-[#E2DDD2] shadow-warm flex flex-col overflow-hidden min-h-[600px]">
          {/* Room Header */}
          <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#E2DDD2] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeRoom.flagIcons.join(' ')}</span>
                <h2 className="font-serif text-xl font-semibold text-[#1E2A24]">
                  {activeRoom.nativeTitle}
                </h2>
              </div>
              <p className="text-xs text-[#5A6B62] mt-0.5">{activeRoom.description}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F2EE] text-[#006747] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {activeRoom.activeMembersCount} {t.chatsActiveNow}
              </span>
            </div>
          </div>

          {/* Mandatory Language Chat Rules Banner (Translated into active UI Language) */}
          <div className="mx-6 mt-4 p-4 rounded-2xl bg-[#FCEEE9] border border-[#D96B43]/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D96B43] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-[#9E3E1C]">{t.chatsRulesTitle}</p>
              <p className="text-[#1E2A24]/90">
                {t.chatsRulesBodyPrefix}
                <strong className="underline decoration-[#D96B43] font-bold">
                  {activeRoom.languageName}
                </strong>
                {t.chatsRulesBodySuffix}
              </p>
              <p className="text-xs text-[#5A6B62]">{t.chatsRulesRespect}</p>
            </div>
          </div>

          {/* Note that chat messages stay in original language */}
          <div className="mx-6 mt-2 px-3 py-1.5 rounded-xl bg-[#F2ECE1]/70 text-[#5A6B62] text-xs flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#006747] shrink-0" />
            <span>{t.chatsMessageInRoomNote}</span>
          </div>

          {/* Messages Feed (Never translated by UI language switcher!) */}
          <div
            className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[380px]"
            dir="ltr"
          >
            {currentMessages.map(msg => {
              const isMe = msg.senderId === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Header with Name + Nationalities & Flags right next to name */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-1 px-1">
                    <span className="text-xs font-bold text-[#1E2A24]">
                      {msg.senderName}
                    </span>

                    {/* Nationality badges right next to sender name */}
                    {msg.senderNationalities.map(country => (
                      <span
                        key={country}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F2EE] text-[#006747] border border-[#006747]/15"
                      >
                        <span>{getCountryFlag(country)}</span>
                        <span>{country}</span>
                      </span>
                    ))}

                    <span className="text-[11px] text-[#5A6B62]">
                      • {msg.senderMajor} ({msg.senderYear})
                    </span>

                    <span className="text-[10px] text-[#5A6B62]/70">{msg.timestamp}</span>

                    {!isMe && (
                      <button
                        type="button"
                        onClick={() => onStartDM(msg.senderId)}
                        className="ml-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D96B43] hover:underline"
                        title={t.chatsStartDMWith}
                      >
                        <MessageSquareHeart className="w-3 h-3" />
                        <span>DM</span>
                      </button>
                    )}
                  </div>

                  {/* Message Bubble (Original language preserved) */}
                  <div
                    className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-[#006747] text-white rounded-br-none'
                        : 'bg-[#FAF7F2] text-[#1E2A24] border border-[#E2DDD2] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-4 bg-[#FAF7F2] border-t border-[#E2DDD2] flex items-center gap-3"
          >
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2DDD2] text-xs font-semibold text-[#1E2A24] shrink-0">
              <span>{currentUser.nationalities.map(n => getCountryFlag(n)).join(' ')}</span>
              <span>{currentUser.name.split(' ')[0]}</span>
            </div>

            <input
              type="text"
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder={`${t.chatsInputPlaceholder} (${activeRoom.languageName} / English)`}
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-[#E2DDD2] text-sm text-[#1E2A24] placeholder-[#5A6B62]/70 focus:outline-none focus:border-[#006747]"
            />

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#006747] hover:bg-[#004E36] text-white text-sm font-semibold shadow-sm transition shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.chatsSendBtn}</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
