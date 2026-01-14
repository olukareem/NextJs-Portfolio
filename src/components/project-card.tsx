"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly { icon: React.ReactNode; type: string; href: string }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && video && video.trim() !== "" && videoRef.current) {
      const videoElement = videoRef.current;
      let hls: Hls | null = null;

      if (video.endsWith(".m3u8")) {
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(video);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = video;
        }
      } else {
        videoElement.src = video;
      }

      videoElement.play().catch((err) => console.log("Autoplay blocked", err));

      return () => {
        if (hls) hls.destroy();
        videoElement.src = "";
        videoElement.load();
      };
    }
  }, [isMounted, video]);
// EXTENDED FALLBACK: Forces the correct path for every project if data sync is failing
let displayImage = image;

if (!image || image.trim() === "") {
  if (title.includes("DSP Desk")) displayImage = "/images/dsp.png";
  else if (title.includes("Somna")) displayImage = "/images/somna.png";
  else if (title.includes("Otion")) displayImage = "/images/otion_sc.png";
  else if (title.includes("Splice Mobile")) displayImage = "/images/splice_logo_white.png";
  else if (title.includes("Splice Bridge")) displayImage = "/images/splice_logo_white_2.png";
  else if (title.includes("Splice Desktop")) displayImage = "/images/splice_blue.png";
}

  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        <div className="relative h-40 w-full overflow-hidden bg-secondary">
          {video && video.trim() !== "" && isMounted ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-full w-full object-cover object-top"
            />
          ) : displayImage ? (
            <img
              src={displayImage}
              alt={title}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No Preview Available
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map((link, idx) => (
              <Link href={link.href} key={idx} target="_blank">
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
