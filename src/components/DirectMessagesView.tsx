import React, { useState } from 'react';
import {
  MessageSquareHeart,
  ShieldCheck,
  Send,
  Sparkles,
  Flag,
  HeartHandshake,
} from 'lucide-react';
import { DirectMessageThread, StudentProfile } from '../types';
import { TranslationKeys } from '../i18n/translations';
import { getCountryFlag } from '../data/mockData';

interface DirectMessagesViewProps {
  t: TranslationKeys;
  currentUser: StudentProfile;
  students: StudentProfile[];
  threads: DirectMessageThread[];
  activePeerId: string;
  onSelectPeer: (peerId: string) => void;
  onSendDM: (peerId: string, text: string) => void;
}

export const DirectMessagesView: React.FC<DirectMessagesViewProps> = ({
  t,
  currentUser,
  students,
  threads,
  activePeerId,
  onSelectPeer,
  onSendDM,
}) => {
  const [inputText, setInputText] = useState('');
  const [safetyAlertShown, setSafetyAlertShown] = useState(false);

  const activePeer =
    students.find(s => s.id === activePeerId) || students[0];
  const activeThread = threads.find(th => th.peerId === activePeer.id) || {
    peerId: activePeer.id,
    lastUpdated: 'Just now',
    unreadCount: 0,
    messages: [],
  };

  const sharedInterests = activePeer.interests.filter(i =>
    currentUser.interests.includes(i)
  );
  const sharedLanguages = activePeer.spokenLanguages.filter(l =>
    currentUser.spokenLanguages.includes(l)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendDM(activePeer.id, trimmed);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEEE9] text-[#D96B43] text-xs font-semibold mb-2">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>{t.dmsEncryptedBadge}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E2A24]">
          {t.dmsTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#5A6B62] mt-1 max-w-2xl">
          {t.dmsSubtitle}
        </p>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of People / Threads */}
        <aside className="lg:col-span-4 rounded-3xl bg-white border border-[#E2DDD2] p-4 shadow-warm space-y-3 h-fit">
          <h2 className="px-2 text-xs font-bold uppercase tracking-wider text-[#5A6B62]">
            {t.dmsConversations}
          </h2>
          <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
            {students.map(student => {
              const thread = threads.find(th => th.peerId === student.id);
              const lastMsg =
                thread && thread.messages.length > 0
                  ? thread.messages[thread.messages.length - 1]
                  : null;
              const isSelected = student.id === activePeer.id;

              return (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => onSelectPeer(student.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#006747] text-white shadow-md'
                      : 'hover:bg-[#FAF7F2] text-[#1E2A24]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <div
                      className={`w-11 h-11 rounded-2xl ${student.avatarColor} text-white font-serif font-bold text-sm flex items-center justify-center`}
                    >
                      {student.avatarInitials}
                    </div>
                    <span
                      className={`w-3 h-3 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5 ${
                        student.onlineStatus === 'online'
                          ? 'bg-emerald-500'
                          : 'bg-amber-400'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-semibold text-sm truncate flex items-center gap-1">
                        <span>{student.name}</span>
                        <span>
                          {student.nationalities.map(n => getCountryFlag(n)).join('')}
                        </span>
                      </p>
                      {thread?.unreadCount ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D96B43] text-white">
                          {thread.unreadCount}
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isSelected ? 'text-[#E6F2EE]/85' : 'text-[#5A6B62]'
                      }`}
                    >
                      {lastMsg ? lastMsg.text : student.lookingFor}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right 1-on-1 Intimate Conversation Box */}
        <section className="lg:col-span-8 rounded-3xl bg-white border border-[#E2DDD2] shadow-warm flex flex-col overflow-hidden min-h-[600px]">
          {/* Peer Profile Header */}
          <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#E2DDD2] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl ${activePeer.avatarColor} text-white font-serif font-bold text-base flex items-center justify-center`}
              >
                {activePeer.avatarInitials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <h2 className="font-serif text-xl font-semibold text-[#1E2A24]">
                    {activePeer.name}
                  </h2>
                  {activePeer.nationalities.map(c => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E6F2EE] text-[#006747]"
                    >
                      <span>{getCountryFlag(c)}</span>
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#5A6B62] flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-[#006747] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {activePeer.usfEmail}
                  </span>
                  <span>•</span>
                  <span>{activePeer.majors[0]}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSafetyAlertShown(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2DDD2] hover:border-[#D96B43] text-xs font-semibold text-[#5A6B62] hover:text-[#D96B43] transition"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{t.dmsBlockReport}</span>
            </button>
          </div>

          {safetyAlertShown && (
            <div className="mx-6 mt-3 p-3.5 rounded-2xl bg-[#FCEEE9] border border-[#D96B43]/30 text-xs text-[#9E3E1C] flex items-center justify-between">
              <span>
                🛡️ {t.dmsSafetyReminder}
              </span>
              <button
                type="button"
                onClick={() => setSafetyAlertShown(false)}
                className="font-bold underline ml-3"
              >
                OK
              </button>
            </div>
          )}

          {/* Shared Connection Banner (Humanized Intimate Context) */}
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-[#F7F2E4] border border-[#CFC493]/60 flex flex-wrap items-center gap-2 text-xs text-[#1E2A24]">
            <HeartHandshake className="w-4 h-4 text-[#006747] shrink-0" />
            <span className="font-semibold">{t.dmsSharedWithYou}</span>
            {sharedLanguages.map(l => (
              <span
                key={l}
                className="px-2 py-0.5 rounded-lg bg-white border border-[#CFC493] font-semibold text-[#006747]"
              >
                🗣️ {l}
              </span>
            ))}
            {sharedInterests.map(i => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-white border border-[#CFC493] font-medium"
              >
                {i}
              </span>
            ))}
          </div>

          {/* Messages Area (Preserves original message language!) */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[340px]" dir="ltr">
            {activeThread.messages.map(msg => {
              const isMe = msg.senderId === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#5A6B62]">
                    <span className="font-bold text-[#1E2A24]">
                      {isMe ? currentUser.name : activePeer.name}
                    </span>
                    <span>
                      {(isMe ? currentUser.nationalities : activePeer.nationalities)
                        .map(n => getCountryFlag(n))
                        .join(' ')}
                    </span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
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

          {/* Friendly 1-Click Icebreakers */}
          <div className="px-6 py-3 bg-[#FAF7F2]/70 border-t border-[#F2ECE1] space-y-2">
            <p className="text-[11px] font-semibold text-[#5A6B62] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4A359]" />
              <span>{t.dmsIcebreakersTitle}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[t.dmsIcebreaker1, t.dmsIcebreaker2, t.dmsIcebreaker3].map(
                (promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSendDM(activePeer.id, promptText)}
                    className="text-left text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-[#E6F2EE] text-[#1E2A24] hover:text-[#006747] border border-[#E2DDD2] transition line-clamp-1"
                  >
                    “{promptText}”
                  </button>
                )
              )}
            </div>
          </div>

          {/* DM Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-[#FAF7F2] border-t border-[#E2DDD2] flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`${t.dmsInputPlaceholder} (${activePeer.name})`}
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
