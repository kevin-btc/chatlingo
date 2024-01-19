import { useChatContext } from "@polyfire-ai/chat-ui";
import usePolyfire from "polyfire-js/hooks/usePolyfire";
import React, { useState, useEffect, useCallback } from "react";

const useAudioRecorder = () => {
  const { models } = usePolyfire();
  const {
    answer: { data },
    utils: { sendMessage },
  } = useChatContext();

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const startRecording = useCallback(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        let chunks: any = [];

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];

          const arrayBuffer = await blob.arrayBuffer();
          const audioArray = new Uint8Array(arrayBuffer);
          const transcription = await models.transcribe(audioArray);
          sendMessage(transcription);
          setIsLoading(false);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing the microphone:", err);
      }
    } else {
      console.error("MediaDevices API is not supported in this browser.");
    }
  }, [models, sendMessage]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      setIsRecording(false);
      setIsLoading(true);
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && !isRecording && !data) {
        startRecording();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && isRecording) {
        stopRecording();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRecording, startRecording, stopRecording, data]);

  return { isRecording, isLoading, startRecording, stopRecording };
};

export default useAudioRecorder;
