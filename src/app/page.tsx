"use client";

import dynamic from "next/dynamic";
import { Suspense, lazy, useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import BlurFadeText from "@/components/ui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/ui/text-reveal";
import { useContactDialog } from "@/contexts/contact-dialog-context";

// Lazy load heavy components
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <div className="animate-pulse h-20 bg-muted rounded" />,
  ssr: false
});

const DynamicStackCarousel = dynamic(() => import("@/components/stack-carousel"), {
  loading: () => <div className="animate-pulse h-40 bg-muted rounded" />,
  ssr: false
});

const ContactDialog = dynamic(() => import("@/components/contact-dialog"), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
  ssr: false
});

// Constants
const BLUR_FADE_DELAY = 0.04;
const LOADING_PLACEHOLDER = <div className="animate-pulse h-40 bg-muted rounded" />;

export default function Page() {
  const { setIsContactDialogOpen } = useContactDialog();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={DATA.name}
              />
              <BlurFadeText
                className="max-w-[600px] font-bold md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={<TextReveal text={DATA.tagline} />}
                renderAsChild
              />
              <p>
                <BlurFadeText
                  className="max-w-[600px] text-sm md:text-xs text-muted-foreground"
                  delay={BLUR_FADE_DELAY}
                  text={`Based in ${DATA.location}`}
                />
              </p>
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="w-28 h-28 border">
                <Image
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  width={224}
                  height={224}
                  className="object-cover"
                  quality={75}
                  priority
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <Suspense fallback={LOADING_PLACEHOLDER}>
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">My Journey</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>
      </Suspense>

      <Suspense fallback={LOADING_PLACEHOLDER}>
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">Work Experience</h2>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      </Suspense>

      <Suspense fallback={LOADING_PLACEHOLDER}>
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                  description={education.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      </Suspense>

      <Suspense fallback={LOADING_PLACEHOLDER}>
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Relevant Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade
                  key={skill.name}
                  delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                >
                  <Badge>{skill.name}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
          <div className="py-8 flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">What I&apos;ve used</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 40}>
              <DynamicStackCarousel />
            </BlurFade>
          </div>
        </section>
      </Suspense>

      <Suspense fallback={LOADING_PLACEHOLDER}>
        <section id="projects">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex web applications. Here are a few of my
                    favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      </Suspense>

      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <Button
                variant="secondary"
                className="px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out bg-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white hover:bg-secondary-foreground hover:text-secondary"
                onClick={() => setIsContactDialogOpen(true)}
              >
                Contact Me
              </Button>
              <ContactDialog />
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let&apos;s talk. Click the button above to send me an email directly
                from this page or reach out to me at olukareem@pm.me
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}