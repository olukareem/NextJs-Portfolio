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
import { useEffect, useState, useRef, useMemo } from "react";
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

  // Stabilize data sources to fix the console error and handle ghost data
  const sources = useMemo(() => {
    let activeVideo = video && video.trim() !== "" ? video : null;
    let activeImage = image && image.trim() !== "" ? image : null;

    // Hardcoded safety fallback for deployment sync issues
    if (!activeVideo && !activeImage) {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes("somna")) activeImage = "/images/somna.png";
      else if (lowerTitle.includes("dsp desk")) activeImage = "/images/dsp.png";
      else if (lowerTitle.includes("otion"))
        activeVideo = "/video/Otion_Demo.mp4";
      else if (lowerTitle.includes("mobile"))
        activeVideo = "/video/splice_mobile_featured.mp4";
      else if (lowerTitle.includes("bridge"))
        activeVideo = "/video/splice_bridge_clipped.mp4";
      else if (lowerTitle.includes("desktop"))
        activeVideo = "/video/splice_desktop_clipped.mp4";
    }
    return { activeVideo, activeImage };
  }, [title, image, video]);

  useEffect(() => {
    if (isMounted && sources.activeVideo && !videoError && videoRef.current) {
      const videoElement = videoRef.current;
      let hls: Hls | null = null;

      if (sources.activeVideo.endsWith(".m3u8")) {
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(sources.activeVideo);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = sources.activeVideo;
        }
      } else {
        videoElement.src = sources.activeVideo;
      }

      videoElement.play().catch(() => setVideoError(true));

      return () => {
        if (hls) hls.destroy();
        videoElement.src = "";
        videoElement.load();
      };
    }
  }, [isMounted, sources.activeVideo, videoError, title]);

  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 h-full">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        <div className="relative h-40 w-full overflow-hidden bg-secondary">
          {sources.activeVideo && !videoError && isMounted ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="pointer-events-none mx-auto h-full w-full object-cover object-top"
            />
          ) : sources.activeImage ? (
            <img
              src={sources.activeImage}
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
      </CardContent>
    </Card>
  );
}
