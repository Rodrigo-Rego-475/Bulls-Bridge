# BullsGlobal — USF International Student Community App

A warm, humanized, and secure platform designed to connect international and globally minded students at the **University of South Florida (USF)**.

---

## Key Features

1. **Minimalist & Inviting Home Page (`HomeView.tsx`)**:
   - Welcomes international Bulls with a clean, uncluttered, humanized hero design (`#FAF7F2` warm cream & `#006747` USF Botanical Green) and quick entry points to Matchmaking, Language Lounges, Cultural Clubs, and the separate Arrival Checklist.

2. **Full Multilingual UI Translation (`translations.ts`)**:
   - Entire application interface defaults to **English** and translates into **8 languages** (`English`, `Português`, `Español`, `Français`, `العربية`, `中文`, `हिन्दी`, `日本語`).
   - **Chat messages remain in their original language** so students can practice and converse naturally.

3. **Account & Profile with Max-3 Dropdowns & Custom Options (`ProfileView.tsx` & `MultiSelectDropdown.tsx`)**:
   - Searchable multi-select dropdown lists limiting selections to **up to 3 options** (`1/3`, `2/3`, `3/3`) for **Country/Nationality**, **Ancestry/Heritage**, and **Major/Course**.
   - Dedicated buttons to insert **custom languages** and **custom personal interests** when an option is not already listed.

4. **Multi-Select Matchmaking (`MatchmakingView.tsx`)**:
   - Users can select **multiple options for every filter** (Target Languages, Nationalities/Ancestry, Personal Interests, plus Advanced Filters: Majors, College Years, and Age Ranges).
   - Calculates a Compatibility Score (%) and highlights shared traits with 1-click DM connection.

5. **Language Lounges with Nationality Badges & Room Rules (`LanguageChatsView.tsx`)**:
   - Separate chat rooms by native/target language.
   - Displays every user's **nationality flags and country names right next to their name**.
   - Prominent **Room Rules Banner** reminding participants that only the room's target language (and English when strictly necessary) may be spoken.

6. **Personal 1-on-1 Direct Messages (`DirectMessagesView.tsx`)**:
   - Intimate, safe 1-on-1 messaging with shared interest highlights, conversation icebreakers, and `@usf.edu` verification badges.

7. **BullsConnect Cultural Clubs & Events by Region (`EventsView.tsx` & `server/index.js`)**:
   - Powered by `/api/bullsconnect/events` with **Region / Continent filtering** (Latin America & Caribbean, Europe, East & Southeast Asia, South Asia, Middle East & North Africa, Sub-Saharan Africa, Global), featuring BRASA at USF, LASA, Irish Culture & Language Club, Japanese Culture Club, ASA, ACA, ISA, VSA, and more.

8. **Dedicated New Bull Arrival Checklist (`ChecklistView.tsx`)**:
   - Separate onboarding checklist for newly arrived international students at USF (OIS iStart check-in, BullCard ID at MSC, Immunization forms, US Bank & SIM card, Bull Runner transit, SSN & on-campus work).
