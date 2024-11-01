import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { SendHorizonal, Trash } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, useEffect, useRef } from "react";
import { BsRobot } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Markdown from "react-markdown";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

interface SampleQuestion {
  text: string;
  description: string;
}

function ChatWelcome({
  onQuestionClick,
}: {
  onQuestionClick: (question: string) => void;
}) {
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
  ];

  return (
    <div className="flex flex-col h-full items-center justify-center gap-4 text-center mx-8">
      <div className="relative">
        <BsRobot size={32} className="text-primary" />
        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Hi! I'm Olu's AI Assistant</h3>
        <p className="text-muted-foreground text-sm">
          I can help you learn more about Olu's experience and projects
        </p>
      </div>

      <div className="w-full max-w-sm space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Try asking about:
        </p>
        <div className="flex flex-col gap-2">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(question.text)}
              className="w-full px-4 py-2 text-sm text-left transition-colors rounded-md hover:bg-muted group"
            >
              <div className="font-medium">{question.text}</div>
              <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/70">
                {question.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
        <span className="flex items-center gap-1">
          <BsRobot size={12} />
          Powered by
        </span>
        <span className="font-medium">OpenAI</span>
        <span>•</span>
        <span className="font-medium">Langchain</span>
        <span>•</span>
        <span className="font-medium">Vercel</span>
        <span>•</span>
        <span className="font-medium">Upstash</span>
        <span>•</span>
        <span className="font-medium">Datastax</span>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  inline?: boolean;
  node?: any;
  children?: React.ReactNode;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-start", // Changed to items-start to align content properly
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end"
      )}
    >
      {isAiMessage && <BsRobot className="mr-2 flex-none mt-1" />}
      <div
        className={cn(
          "rounded-md border px-4 py-3 max-w-[85%]", // Added max-width and improved padding
          isAiMessage ? "bg-background" : "bg-foreground text-background"
        )}
      >
        <Markdown
          components={{
            // Links
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                {props.children}
                {/* Optional: Add external link icon */}
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
            
            // Paragraphs
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0 leading-relaxed" />
            ),
            
            // Headings
            h1: ({ node, ...props }) => (
              <h1 {...props} className="text-2xl font-bold mt-6 mb-4 first:mt-0" />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-xl font-bold mt-5 mb-3 first:mt-0" />
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className="text-lg font-bold mt-4 mb-2 first:mt-0" />
            ),
            
            // Lists
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 mb-3 list-inside list-disc first:mt-0 space-y-1"
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                {...props}
                className="mt-3 mb-3 list-inside list-decimal first:mt-0 space-y-1"
              />
            ),
            li: ({ node, children, ...props }) => (
              <li 
                {...props} 
                className="leading-relaxed ml-4"
              >
                {children}
              </li>
            ),
            
            // Code blocks
            code: ({ inline, className, children, ...props }: CodeProps) => {
              const isInline = inline ?? false;
              return isInline ? (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-muted font-mono text-sm"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <pre className="mt-3 mb-3 p-3 rounded-lg bg-muted overflow-x-auto">
                  <code className="block font-mono text-sm" {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
            
            // Blockquotes
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                className="mt-3 mb-3 border-l-4 border-primary pl-4 italic"
              />
            ),
            
            // Horizontal rules
            hr: ({ node, ...props }) => (
              <hr {...props} className="my-4 border-muted" />
            ),
            
            // Strong and emphasis
            strong: ({ node, ...props }) => (
              <strong {...props} className="font-bold" />
            ),
            em: ({ node, ...props }) => (
              <em {...props} className="italic" />
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleQuestionClick = (question: string) => {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    // Set the input value
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.value = question;
      handleInputChange({
        target: { value: question },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    // Submit the form
    handleSubmit(fakeEvent);
  };

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[500px] p-1",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <IoIosCloseCircleOutline
          size={30}
          className="rounded-full bg-background"
        />
      </button>
      <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "Thinking...",
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
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex items-center justify-center w-10 flex-none"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <Trash size={24} />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="grow border rounded bg-background px-3 py-2"
            ref={inputRef}
          />
          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
            disabled={input.length === 0}
            title="Submit message"
          >
            <SendHorizonal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
