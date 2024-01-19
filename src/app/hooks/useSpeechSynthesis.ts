import { useState, useEffect, useCallback } from "react";

const useSpeechSynthesis = (
  onActiveSpeechChange?: (speechId: string | null) => void
) => {
  const [speaking, setSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const speakSentence = useCallback(
    (sentence: string, voiceIndex: number) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      if (voices.length > 0 && voices[voiceIndex]) {
        utterance.voice = voices[voiceIndex];
      }
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  const start = useCallback(
    (text: string, voiceIndex = 159) => {
      const speak = () => {
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
        if (sentences) {
          sentences.forEach((sentence) => speakSentence(sentence, voiceIndex));
        } else {
          speakSentence(text, voiceIndex);
        }
      };

      if (voices.length > 0 && !isCurrentlySpeaking()) {
        speak();
      }
    },
    [speakSentence, voices]
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
  }, []);

  const isCurrentlySpeaking = useCallback(() => {
    return window.speechSynthesis.speaking;
  }, []);

  useEffect(() => {
    const checkSpeaking = () => {
      setSpeaking(window.speechSynthesis.speaking);
    };
    const interval = setInterval(checkSpeaking, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVoices(window.speechSynthesis.getVoices());
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const onToggleSpeaking = useCallback(
    (content: string, speechId: string) => {
      if (speaking && activeSpeechId === speechId) {
        stop();
        setSpeaking(false);
        setActiveSpeechId(null);
        onActiveSpeechChange?.(null);
      } else {
        start(content);
        setSpeaking(true);
        setIsPaused(false);
        setActiveSpeechId(speechId);
        onActiveSpeechChange?.(speechId);
      }
    },
    [speaking, start, stop, onActiveSpeechChange]
  );

  const onPauseResume = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
    setIsPaused(!isPaused);
  }, [isPaused, pause, resume]);

  return {
    onToggleSpeaking,
    onPauseResume,
    speaking,
    isPaused,
    activeSpeechId,
  };
};

export default useSpeechSynthesis;
