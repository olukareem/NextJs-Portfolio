import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useContactDialog } from "@/contexts/contact-dialog-context";
import BlurFade from "./ui/blur-fade";

const ContactDialog: React.FC = () => {
  const { isContactDialogOpen, setIsContactDialogOpen } = useContactDialog();
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const BLUR_FADE_DELAY = 0.1;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderEmail, subject, message }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setSenderEmail("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <BlurFade delay={BLUR_FADE_DELAY}>

         <img
              src="/images/DSC00815.png"
              alt="Contact banner"
              className="h-40 object-cover mb-6 rounded-lg"
            />
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold">
              Send me a message
            </DialogTitle>
            <DialogDescription>
              It will be sent to olukareem@pm.me via Amazon SES.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Your email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
                aria-label="Your email address"
              />
              <Input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                aria-label="Message subject"
              />
              <Textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="min-h-[150px]"
                aria-label="Your message content"
              />
            </div>
            
            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsContactDialogOpen(false)}
              >
                Close
              </Button>
            </div>

            {submitStatus === "success" && (
              <p className="text-green-500 text-center" role="status">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center" role="alert">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </BlurFade>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;

         {/* <img
              src="/images/DSC00815.png"
              alt="Contact banner"
              className="h-40 object-cover mb-6 rounded-lg"
            /> */}