"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { PiLightningBold, PiLightningSlashFill } from "react-icons/pi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <PiLightningBold className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <PiLightningSlashFill className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
