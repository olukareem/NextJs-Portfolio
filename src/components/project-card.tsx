"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Stabilize data and ensure every project has an image backup
  const sources = useMemo(() => {
    let activeVideo = video && video.trim() !== "" ? video : null;
    let activeImage = image && image.trim() !== "" ? image : null;

    // Use your EXACT file names from the 'find public' output
    const t = title.toLowerCase();
    if (t.includes("somna")) activeImage = "/images/somna.png";
    if (t.includes("dsp desk")) activeImage = "/images/dsp.png";
    if (t.includes("otion")) activeImage = "/images/otion_sc.png";
    if (t.includes("splice mobile"))
      activeImage = "/images/splice_logo_white.png";
    if (t.includes("bridge")) activeImage = "/images/splice_logo_white2.png";
    if (t.includes("desktop")) activeImage = "/images/splice_blue.png";

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

      // REMOVED setVideoError(true) from here.
      // If autoplay is blocked, we just let it sit paused.
      videoElement
        .play()
        .catch(() => console.log("Autoplay paused by browser"));

      return () => {
        if (hls) hls.destroy();
        videoElement.src = "";
        videoElement.load();
      };
    }
    // Fixed dependency array size
  }, [isMounted, sources.activeVideo, videoError, title]);

  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 h-full">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        <div className="relative h-40 w-full overflow-hidden bg-secondary">
          {/* Priority: Video file must exist and not have a 404 error */}
          {sources.activeVideo && !videoError && isMounted ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)} // Only triggers on actual 404/file error
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
              No Preview Found
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
