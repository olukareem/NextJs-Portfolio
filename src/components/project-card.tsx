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
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. DETERMINE THE SOURCE (Props first, then Hardcoded Safety Net)
  let activeVideo = video && video.trim() !== "" ? video : null;
  let activeImage = image && image.trim() !== "" ? image : null;

  if (!activeVideo && !activeImage) {
    if (title.includes("Somna")) activeImage = "/images/somna.png";
    if (title.includes("DSP Desk")) activeImage = "/images/dsp.png";
    if (title.includes("Otion")) activeVideo = "/video/Otion_Demo.mp4";
    if (title.includes("Splice Mobile"))
      activeVideo = "/video/splice_mobile_featured.mp4";
    if (title.includes("Splice Bridge"))
      activeVideo = "/video/splice_bridge_clipped.mp4";
    if (title.includes("Splice Desktop"))
      activeVideo = "/video/splice_desktop_clipped.mp4";
  }

  useEffect(() => {
    if (isMounted && activeVideo && !videoError && videoRef.current) {
      const videoElement = videoRef.current;
      let hls: Hls | null = null;

      if (activeVideo.endsWith(".m3u8")) {
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(activeVideo);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = activeVideo;
        }
      } else {
        videoElement.src = activeVideo;
      }

      videoElement.play().catch(() => {
        // Fall back to image if the video file itself is missing
        setVideoError(true);
      });

      return () => {
        if (hls) hls.destroy();
        videoElement.src = "";
        videoElement.load();
      };
    }
  }, [isMounted, activeVideo, videoError]);

  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        <div className="relative h-40 w-full overflow-hidden bg-secondary">
          {/* Priority 1: Video */}
          {activeVideo && !videoError && isMounted ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="pointer-events-none mx-auto h-full w-full object-cover object-top"
            />
          ) : activeImage ? (
            /* Priority 2: Image Backup */
            <img
              src={activeImage}
              alt={title}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            /* Priority 3: Fallback */
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
