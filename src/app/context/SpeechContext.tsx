"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";
import useSpeechSynthesis from "@/app/hooks/useSpeechSynthesis";

interface SpeechContextType {
  startSpeaking: (content: string, speechId: string) => void;
  onPauseResume: () => void;
  speaking: boolean;
  isPaused: boolean;
  activeSpeechId: string | null;
}

const SpeechContext = createContext<SpeechContextType>({
  startSpeaking: () => {},
  onPauseResume: () => {},
  speaking: false,
  isPaused: false,
  activeSpeechId: null,
});

export const useSpeechContext = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }: { children: ReactNode }) => {
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const { onToggleSpeaking, onPauseResume, speaking, isPaused } =
    useSpeechSynthesis((newActiveSpeechId) => {
      setActiveSpeechId(newActiveSpeechId);
    });

  const startSpeaking = (content: string, speechId: string) => {
    if (activeSpeechId && activeSpeechId !== speechId) {
      onToggleSpeaking("", activeSpeechId);
    }
    onToggleSpeaking(content, speechId);
  };

  return (
    <SpeechContext.Provider
      value={{
        startSpeaking,
        onPauseResume,
        speaking,
        isPaused,
        activeSpeechId,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export default SpeechProvider;
