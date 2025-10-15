"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ChatPage = dynamic(() => import("./Chat"), { ssr: false });

const Page = () => {
  return <ChatPage />;
};

export default Page;
