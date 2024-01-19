import Markdown from "react-markdown";
import { Message } from "polyfire-js/hooks/useChat";
import React, { memo, useContext, useEffect, useState } from "react";

import sha256 from "crypto-js/sha256";

import { CopyButton } from "./CopyButton";
import { UserIcon, GPTIcon } from "./Icons";
import { useChatContext } from "@polyfire-ai/chat-ui";
import Tooltip from "./Tooltip";
import { usePolyfire } from "polyfire-js/hooks";

import {
  PlayIcon,
  StopIcon,
  PauseIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";

import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import SpeechContext, { useSpeechContext } from "../context/SpeechContext";

type LevelColorMap = {
  [key: string]: string;
};

const levelColorMap: LevelColorMap = {
  A1: "bg-red-500", // Example color for level A1
  A2: "bg-orange-500", // Example color for level A2
  B1: "bg-yellow-500", // Example color for level B1
  B2: "bg-green-500", // Example color for level B2
  C1: "bg-blue-500", // Example color for level C1
  C2: "bg-purple-500", // Example color for level C2
};

const getLevelColor = (level: string): string => {
  return levelColorMap[level] || "bg-gray-500"; // Default color if level not found
};

const UserMessageSkeleton = () => (
  <div className="flex px-4 py-7 sm:px-6 animate-pulse m-3">
    <div className="h--full bg-custom-700 mr-4 self-center" />
    <div className="flex w-full flex-col lg:flex-row lg:justify-between">
      <div className="max-w-3xl w-full self-center">
        <div className="h-3 rounded bg-custom-700 w-full" />
      </div>
    </div>
  </div>
);

const BotMessageSkeleton = () => (
  <div className="flex px-4 py-7 sm:px-6 animate-pulse bg-custom-900 rounded-xl m-3">
    <div className="mr-2 flex h-8 w-8 rounded-full bg-custom-800 sm:mr-4" />
    <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
      <div className="inline max-w-3xl w-full space-y-4">
        <div className="h-3 rounded bg-custom-800 w-full" />
        <div className="h-3 rounded bg-custom-800 w-11/12" />
      </div>
      <div className="mt-4 flex w-full flex-row justify-start gap-x-2 text-custom-400 lg:mt-0">
        <div className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const renderLoading = () => (
  <div className="flex items-center">
    <div className="animate-pulse-slow h-2 w-2 bg-white rounded-full" />
  </div>
);

export const HistoryLoadingComponent: React.FC = () => (
  <>
    <UserMessageSkeleton />
    <BotMessageSkeleton />
    <UserMessageSkeleton />
  </>
);

type Correction = {
  mistake: string;
  better: string;
  explanation: string;
};

type Answer = {
  level: string;
  answer: string;
  corrections: Correction[];
};

const UserReplyComponent: React.FC<{
  answer?: Answer;
  request: string;
  isLoading?: boolean;
}> = ({ answer, request, isLoading }) => {
  return (
    <div className="flex flex-col sm:flex-row px-4 py-8 sm:px-6 m-3 bg-custom-700 rounded-xl">
      <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
        <UserIcon className="h-8 w-8 rounded-full mr-2" />
        <div className="flex flex-col w-full lg:justify-between">
          <p className="max-w-3xl text-custom-50">{request}</p>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col w-full bg-custom-800 rounded-lg mt-4 p-4">
          {renderLoading()}
        </div>
      )}

      <div className="flex flex-col w-full bg-custom-800 rounded-lg mt-4">
        {answer?.corrections.map((correction, index, array) => (
          <React.Fragment key={index}>
            <div className="mb-2 p-4">
              <p>
                <strong className="text-custom-300">Mistake: </strong>
                <span className="bg-custom-800 px-2 rounded">
                  {correction.mistake}
                </span>
              </p>
              <p>
                <strong className="text-custom-300">Correction: </strong>{" "}
                {correction.better}
              </p>
              <p>
                <strong className="text-custom-300">Explanation: </strong>{" "}
                {correction.explanation}
              </p>
            </div>
            {index < array.length - 1 && (
              <div className="my-2 border-b border-opacity-90 border-custom-700 w-full self-center" />
            )}
          </React.Fragment>
        ))}
      </div>

      {answer?.level && (
        <div
          className={`mb-2 p-4 mt-4 px-3 py-1 text-sm font-semibold w-fit ${getLevelColor(
            answer?.level as string
          )} rounded-full`}
        >
          <Tooltip text="This is the English level of your previous message">
            {answer?.level}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

const MemoizedBUserReplyComponent = memo(UserReplyComponent);

interface BotReplyComponentProps {
  content: string;
  isLoading?: boolean;
  id: string;
}

const BotReplyComponent: React.FC<BotReplyComponentProps> = ({
  content,
  isLoading,
  id,
}) => {
  const { startSpeaking, onPauseResume, speaking, isPaused, activeSpeechId } =
    useSpeechContext();
  const isCurrentMessageSpeaking = activeSpeechId === id;

  const handlePlayClick = () => {
    startSpeaking(content, id);
  };

  const renderContent = () => (
    <div>
      <Markdown className="inline max-w-3xl text-custom-50 rounded-xl">
        {content}
      </Markdown>

      <div className="mt-4 flex flex-row space-x-1">
        <CopyButton textToCopy={content} aria-disabled={isLoading} />
        <button
          onClick={handlePlayClick}
          className="text-custom-50 cursor-pointer"
        >
          {isCurrentMessageSpeaking && speaking ? (
            <StopIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>
        {isCurrentMessageSpeaking && speaking && (
          <button
            onClick={onPauseResume}
            className="text-custom-50 cursor-pointer"
          >
            {isPaused ? (
              <PlayCircleIcon className="h-5 w-5" />
            ) : (
              <PauseIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-row items-start px-4 py-8 sm:px-6 bg-custom-900 rounded-xl m-3">
      <div className="flex flex-col items-start mr-4">
        <GPTIcon className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex flex-grow flex-col lg:flex-row lg:justify-between">
        {isLoading ? renderLoading() : renderContent()}
      </div>
    </div>
  );
};

const MemoizedBotReplyComponent = memo(BotReplyComponent);

export const ChatListItemRaw: React.FC<Message> = ({
  content,
  is_user_message: isUser,
  chat_id: chatId,
  id,
}: Message) => {
  const { answer, history, utils } = useChatContext();
  const {
    models: { generate },
    data: { kv },
  } = usePolyfire();

  const [shouldScroll, setShouldScroll] = useState(false);

  const [correction, setCorrection] = useState<Answer>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (content && id && isUser) {
      setLoading(true);
      const correctionId = sha256(chatId + content).toString();

      try {
        const res = await kv.get(correctionId);

        if (res) {
          setCorrection(res as unknown as Answer);
        } else {
          const generatedResponse = await generate(content, {
            model: "gpt-4-32k",
            systemPromptId: "chatlingo-correction",
          });

          const jsonAnswer = JSON.parse(generatedResponse) as Answer;

          await kv.set(correctionId, generatedResponse);
          setCorrection(jsonAnswer);
        }
      } catch (e: any) {
        console.error({ generateError: e });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (shouldScroll) {
      console.log("Scrolling to bottom");
      utils.scrollToBottom("instant");
      setShouldScroll(false); // Reset the flag after scrolling
    }
  }, [shouldScroll, utils]);

  useEffect(() => {
    if (!loading && isUser) {
      setShouldScroll(true); // Set the flag to scroll when loading is complete and it's a user message
    }
  }, [loading, isUser]);

  return (
    <>
      {isUser ? (
        <MemoizedBUserReplyComponent
          request={content}
          answer={correction}
          isLoading={loading}
        />
      ) : (
        <MemoizedBotReplyComponent content={content} id={id as string} />
      )}

      {history.data?.[history.data.length - 1]?.id === id && isUser && (
        <MemoizedBotReplyComponent
          content={answer.data?.content || ""}
          isLoading={answer.loading}
          id={id as string}
        />
      )}
    </>
  );
};

export const ChatListItem = memo(ChatListItemRaw);
