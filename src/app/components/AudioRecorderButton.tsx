import React from "react";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import useAudioRecorder from "@/app/hooks/useMediaRecorder"; // Ensure correct import path
import Tooltip from "./Tooltip"; // Ensure correct import path

const LoadingSpinner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white ${className}`}
        {...props}
      ></div>
    </div>
  );
};

const AudioRecorderComponent = () => {
  const { isRecording, isLoading, startRecording, stopRecording } =
    useAudioRecorder();

  const handleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center p-1 bg-custom-800 rounded-md">
      <Tooltip text="Press 'Up' to Record or Stop" className="w-full wrap-none">
        <button
          onClick={handleRecording}
          className={`inline-flex items-center py-2 px-4 rounded-md text-white font-medium
                      ${
                        isRecording
                          ? "bg-red hover:bg-red-dark"
                          : "bg-blue hover:bg-blue-dark"
                      } text-xs`}
        >
          {isRecording ? (
            <div className="h-2 w-2 bg-red-500 rounded-sm p-2"></div>
          ) : isLoading ? (
            <LoadingSpinner className="h-5 w-5" />
          ) : (
            <MicrophoneIcon className="h-5 w-5" />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default AudioRecorderComponent;
