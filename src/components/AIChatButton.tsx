"use client";

import { BsRobot } from "react-icons/bs";
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Button } from "./ui/button";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={() => setChatBoxOpen(!chatBoxOpen)}
      >
        <BsRobot size={20} />
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
