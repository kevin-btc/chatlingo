import {
  CameraIcon,
  GlobeAltIcon,
  ClockIcon,
  BeakerIcon,
} from "@heroicons/react/24/solid";
import { useChatContext } from "@polyfire-ai/chat-ui";
import Image from "next/image";

import logo from "@/assets/images/chatlingo-logo.png";

const PromptCard = ({
  title,
  prompt,
  icon: Icon,
}: {
  title: string;
  prompt: string;
  icon: React.ElementType;
}) => {
  const {
    utils: { sendMessage },
  } = useChatContext();

  const onClick = () => {
    sendMessage(prompt);
  };

  return (
    <li
      className="group col-span-1 rounded-lg bg-custom-900 shadow transition-colors duration-300 hover:bg-custom-600 "
      onClick={onClick}
    >
      <div className="flex cursor-pointer items-center justify-between space-x-6 truncate p-6">
        <div className="flex flex-col items-center gap-y-1 rounded-lg text-xs w-5 h-5">
          <Icon />
        </div>
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-custom-900 transition-colors duration-300 group-hover:text-custom-50">
              {title}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-custom-500 transition-colors duration-300 group-hover:text-custom-300">
            {prompt}
          </p>
        </div>
      </div>
    </li>
  );
};

const cards = [
  {
    title: "Share Your Hobbies",
    prompt:
      "I'd like to talk about my favorite hobbies. I'm interested in describing why I enjoy them and how I got started. I want to practice using descriptive language and expressing my personal interests in English.",
    icon: CameraIcon,
  },
  {
    title: "Travel Tales",
    prompt:
      "I'm imagining myself as a traveler in a country where English is the native language. I want to share stories about my travels, the people I meet, and my experiences. I'm focusing on using past tense and descriptive vocabulary.",
    icon: GlobeAltIcon,
  },
  {
    title: "My Daily Routine",
    prompt:
      "I plan to explain my daily routine from morning to night in English. This will be a good opportunity for me to practice verbs in the present tense and time expressions, giving insights into my everyday life.",
    icon: ClockIcon,
  },
  {
    title: "Culinary Adventures",
    prompt:
      "I'm excited to talk about my favorite foods and cooking experiences. I'd like to describe how to prepare a simple dish, including the ingredients and steps involved. This will help me learn food-related vocabulary and imperative sentences for instructions.",
    icon: BeakerIcon,
  },
];

export const HistoryEmptyComponent: React.FC = () => (
  <div className="flex flex-col justify-between items-center w-full h-full bg-custom-800 text-custom-100">
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <Image src={logo} alt="chatlingo logo" className="w-40 h-40" />

      <h2 className="text-2xl font-semibold text-custom-50 mt-4">
        Welcome to ChatLingo!
      </h2>
      <p className="mt-2 text-custom-300">
        Ask me anything, or choose a topic below!
      </p>
    </div>

    <div className="w-full px-4 mb-8">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 text-custom-100 sm:grid-cols-2 lg:grid-cols-3 md:w-[50vw] mx-auto"
      >
        {cards.map((card) => (
          <PromptCard {...card} key={card.title} />
        ))}
      </ul>
    </div>
  </div>
);

export default HistoryEmptyComponent;
