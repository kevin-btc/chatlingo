"use client";
import React from "react";

import { ChatListItem, HistoryLoadingComponent } from "./components/Message";
import { ChatOptions } from "polyfire-js/chats";
import { usePolyfire } from "polyfire-js/hooks";

import AudioRecorderButton from "./components/AudioRecorderButton";
import HistoryEmptyComponent from "./components/HistoryEmptyComponent";
import Chat from "@polyfire-ai/chat-ui";
import Image from "next/image";
import logo from "../assets/images/chatlingo-logo.png";

import "@polyfire-ai/chat-ui/styles.css";
import { useSpeechContext } from "./context/SpeechContext";

const options: ChatOptions = {
  systemPromptId: "chatlingo",
  model: "gpt-4-32k",
};

const ChatUI = () => {
  const { auth } = usePolyfire();
  const { startSpeaking } = useSpeechContext();
  return (
    <Chat.Root
      options={options}
      baseChatColor="#5BC0DE"
      fullscreen
      onSuccess={(message) => startSpeaking(message.content, "")}
    >
      <Chat.Sidebar>
        <Chat.SidebarHeader
          name="ChatLingo"
          Logo={() => (
            <Image src={logo} alt="chatlingo logo" height={40} width={40} />
          )}
        />
        <Chat.NewChatButton label="Start English Chat" />
        <Chat.ChatList />
        <Chat.SidebarButtonGroup>
          <Chat.LogoutButton onClick={() => auth.logout()} />
        </Chat.SidebarButtonGroup>
      </Chat.Sidebar>
      <Chat.View>
        <Chat.History
          HistoryItemComponent={ChatListItem}
          HistoryLoadingComponent={HistoryLoadingComponent}
          HistoryEmptyComponent={HistoryEmptyComponent}
        />
        <Chat.ScrollToBottomButton />
        <Chat.Prompt>
          <AudioRecorderButton />
          <Chat.Input autoFocus />
          <Chat.SendButton />
        </Chat.Prompt>
      </Chat.View>
    </Chat.Root>
  );
};

export default ChatUI;
