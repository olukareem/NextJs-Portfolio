import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { SendHorizonal, Trash } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, useEffect, useRef, memo, useCallback } from "react";
import { BsRobot } from "react-icons/bs";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useContactDialog } from "@/contexts/contact-dialog-context";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <div className="animate-pulse h-20 bg-muted rounded" />,
  ssr: false,
});

const ContactDialog = dynamic(() => import("@/components/contact-dialog"), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
  ssr: false,
});

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

interface SampleQuestion {
  text: string;
  description: string;
}

interface CodeProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Loading indicator component
const LoadingIndicator = memo(() => (
  <div className="inline-flex items-center">
    <span className="text-sm">Thinking</span>
    <div className="flex items-center ml-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current opacity-60 mx-0.5"
          style={{
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  </div>
));

const ChatMessage = memo(({ message }: { message: Message }) => {
  const isAiMessage = message.role === "assistant";
  const isLoading = message.id === "loading";

  return (
    <div
      className={cn(
        "mb-3 flex items-start",
        isAiMessage ? "me-2 sm:me-5 justify-start" : "ms-2 sm:ms-5 justify-end"
      )}
    >
      {isAiMessage && <BsRobot className="mr-2 flex-none mt-1" />}
      <div
        className={cn(
          "rounded-md border px-3 sm:px-4 py-2 sm:py-3 max-w-[90%] sm:max-w-[85%] text-sm sm:text-base",
          isAiMessage ? "bg-background" : "bg-foreground text-background"
        )}
      >
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Markdown
            components={{
              a: ({ node, ref, ...props }) => (
                <Link
                  {...props}
                  href={props.href ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1 break-words"
                >
                  {props.children}
                  <svg
                    className="h-3 w-3 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              ),
              p: ({ node, ...props }) => (
                <p
                  {...props}
                  className="mt-2 sm:mt-3 first:mt-0 leading-relaxed break-words"
                />
              ),
              h1: ({ node, ...props }) => (
                <h1
                  {...props}
                  className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 first:mt-0"
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className="text-lg sm:text-xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3 first:mt-0"
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  {...props}
                  className="text-base sm:text-lg font-bold mt-3 sm:mt-4 mb-2 first:mt-0"
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  {...props}
                  className="mt-2 sm:mt-3 mb-2 sm:mb-3 list-inside list-disc first:mt-0 space-y-1"
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  {...props}
                  className="mt-2 sm:mt-3 mb-2 sm:mb-3 list-inside list-decimal first:mt-0 space-y-1"
                />
              ),
              li: ({ node, children, ...props }) => (
                <li
                  {...props}
                  className="leading-relaxed ml-2 sm:ml-4 break-words"
                >
                  {children}
                </li>
              ),
              code: ({ inline, className, children, ...props }: CodeProps) => {
                const isInline = inline ?? false;
                return isInline ? (
                  <code
                    className="px-1 sm:px-1.5 py-0.5 rounded-md bg-muted font-mono text-xs sm:text-sm break-words"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre className="mt-2 sm:mt-3 mb-2 sm:mb-3 p-2 sm:p-3 rounded-lg bg-muted overflow-x-auto">
                    <code
                      className="block font-mono text-xs sm:text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  </pre>
                );
              },
              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  className="mt-2 sm:mt-3 mb-2 sm:mb-3 border-l-4 border-primary pl-3 sm:pl-4 italic"
                />
              ),
              hr: ({ node, ...props }) => (
                <hr {...props} className="my-3 sm:my-4 border-muted" />
              ),
              strong: ({ node, ...props }) => (
                <strong {...props} className="font-bold" />
              ),
              em: ({ node, ...props }) => <em {...props} className="italic" />,
            }}
          >
            {message.content}
          </Markdown>
        )}
      </div>
    </div>
  );
});

const ChatWelcome = memo(
  ({ onQuestionClick }: { onQuestionClick: (question: string) => void }) => {
    const sampleQuestions: SampleQuestion[] = [
      {
        text: "What technologies do you use?",
        description: "Learn about my tech stack and tools",
      },
      {
        text: "Tell me about your work at Splice",
        description: "Hear about my professional experience",
      },
      {
        text: "What are your recent projects?",
        description: "See what I've been building",
      },
      {
        text: "What are your strengths?",
        description: "Learn about my core strengths and qualities",
      },
      {
        text: "What are your weaknesses?",
        description: "Understand where I strive to improve",
      },
      {
        text: "Where do you see yourself in 5 years?",
        description: "Learn about my future career aspirations",
      },
      {
        text: "Why should we hire you?",
        description: "Find out what makes me a great fit",
      },
      {
        text: "What are your biggest accomplishments?",
        description: "Hear about achievements I'm proud of",
      },
      {
        text: "Describe a challenging project and how you managed it.",
        description: "Find out how I handle complex challenges",
      },
      {
        text: "How do you handle conflict?",
        description: "Learn about my approach to resolving conflicts",
      },
      {
        text: "Tell me about a time you worked in a team.",
        description: "Hear about my experience collaborating in teams",
      },
      {
        text: "How do you handle failure?",
        description: "Understand how I learn from setbacks",
      },
    ];

    return (
      <div className="flex flex-col min-h-[400px] sm:min-h-full items-center justify-center gap-4 text-center mx-2 sm:mx-8 pt-8 sm:pt-0">
        <div className="relative">
          <BsRobot size={32} className="text-primary" />
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold">
            Hi! I&apos;m Olu&apos;s AI Assistant
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm">
            I can help you learn more about Olu&apos;s experience and projects
          </p>
        </div>

        <div className="w-full max-w-sm space-y-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            Try asking about:
          </p>
          <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onQuestionClick(question.text)}
                className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-left transition-colors rounded-md hover:bg-muted group"
              >
                <div className="font-medium">{question.text}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-muted-foreground/70">
                  {question.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const { setIsContactDialogOpen } = useContactDialog();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const observer = new ResizeObserver(() => {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: messages.length > 1 ? "smooth" : "auto",
      });
    });

    observer.observe(scrollElement);
    return () => observer.disconnect();
  }, [messages.length]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleQuestionClick = useCallback(
    (question: string) => {
      const fakeEvent = {
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>;

      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.value = question;
        handleInputChange({
          target: { value: question },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      handleSubmit(fakeEvent);
    },
    [handleInputChange, handleSubmit]
  );

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "fixed bottom-16 sm:bottom-20 left-0 sm:left-1/2 sm:-translate-x-1/2 z-50 w-full sm:w-[500px]",
        open ? "fixed" : "hidden"
      )}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div className="flex h-[80vh] sm:h-[600px] flex-col rounded-lg border bg-background shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <Button
            variant="secondary"
            onClick={() => setIsContactDialogOpen(true)}
            className="h-8 px-4 text-sm font-medium bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
          >
            Contact
          </Button>
          <button
            onClick={onClose}
            className="rounded-md hover:bg-muted p-1 transition-colors"
            title="Close chat"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Content */}
        <div
          className="mt-0 h-full overflow-y-auto px-2 sm:px-3 scroll-smooth"
          ref={scrollRef}
        >
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content: "Something went wrong. Please try again.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <ChatWelcome onQuestionClick={handleQuestionClick} />
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-2 sm:p-3 flex gap-2 border-t"
        >
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 flex-none hover:bg-muted rounded-md"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="grow border rounded-md bg-background px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            ref={inputRef}
          />
          <button
            type="submit"
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 flex-none hover:bg-muted rounded-md disabled:opacity-50 disabled:hover:bg-transparent"
            disabled={input.length === 0}
            title="Submit message"
          >
            <SendHorizonal className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>
      <ContactDialog />
    </div>
  );
};

export default memo(AIChatBox);
