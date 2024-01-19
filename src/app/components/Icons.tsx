import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export const GoodIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
  </svg>
);

export const BadIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
  </svg>
);

export const CopyIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const CheckIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
      fill="currentColor"
    />
  </svg>
);

export const GPTIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32"
    viewBox="0 0 20 20"
    width="32"
    className="mx-2 flex h-8 w-8 sm:mx-4"
    {...props}
  >
    <g fill="white" transform="scale(0.9) translate(1 1)">
      <path d="m14.6907 11.5031c.9993 0 1.8093.81 1.8093 1.8093v.6895h-.0053c-.034.7794-.2477 1.7569-1.1229 2.5555-.956.8723-2.6063 1.4426-5.3718 1.4426-2.76554 0-4.41577-.5703-5.3718-1.4426-.87523-.7986-1.08889-1.7761-1.12287-2.5555h-.00533v-.6895c0-.9993.81005-1.8093 1.8093-1.8093z" />
      <path d="m6.5 3c-.82843 0-1.5.67157-1.5 1.5v4c0 .82843.67157 1.5 1.5 1.5h7c.8284 0 1.5-.67157 1.5-1.5v-4c0-.82843-.6716-1.5-1.5-1.5h-3s0-.19141 0-.5-.2239-.5-.5-.5c-.27614 0-.5.23047-.5.5v.5zm.5 3.5c0-.55229.44772-1 1-1s1 .44771 1 1c0 .55228-.44772 1-1 1s-1-.44772-1-1zm4 0c0-.55229.4477-1 1-1s1 .44771 1 1c0 .55228-.4477 1-1 1s-1-.44772-1-1z" />
    </g>
  </svg>
);

export const UserIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="12"
    viewBox="0 0 12 12"
    width="12"
    className="mx-2 flex h-8 w-8 sm:mx-4"
    {...props}
  >
    <path
      d="m8.5 6c.82843 0 1.5.67157 1.5 1.5 0 1.11608-.45897 2.01027-1.21215 2.6148-.74127.595-1.73477.8852-2.78785.8852s-2.04658-.2902-2.78785-.8852c-.75318-.60453-1.21215-1.49872-1.21215-2.6148 0-.77966118.59487668-1.42044457 1.3555213-1.49313306l.1444587-.00686694zm-2.5-5c1.10457 0 2 .89543 2 2s-.89543 2-2 2-2-.89543-2-2 .89543-2 2-2z"
      fill="white"
      transform="scale(0.9) translate(1 1)"
    />
  </svg>
);

export const SendIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    aria-hidden="true"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 14l11 -11" />
    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
  </svg>
);

export const AddIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </svg>
);
