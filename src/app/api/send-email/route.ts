import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

// Initialize SES client
const ses = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { senderName, senderEmail, subject, message } = await req.json();

    // Send the original message to your own email
    const paramsForOwner = {
      Source: `${senderName} <${process.env.VERIFIED_SENDER_EMAIL!}>`,
      Destination: {
        ToAddresses: ["olukareem@pm.me"],
      },
      Message: {
        Subject: {
          Data: subject || "New message from your portfolio",
        },
        Body: {
          Text: {
            Data: `From: ${senderName} <${senderEmail}>\n\nMessage: ${message}`,
          },
          Html: {
            Data: `<strong>From:</strong> ${senderName} &lt;${senderEmail}&gt;<br><br><strong>Message:</strong><br>${message.replace(
              /\n/g,
              "<br>"
            )}`,
          },
        },
      },
      ReplyToAddresses: [senderEmail],
    };

    const commandForOwner = new SendEmailCommand(paramsForOwner);
    await ses.send(commandForOwner);

    // Send thank you email to the sender
    const paramsForSender = {
      Source: `"Olu Kareem" <${process.env.VERIFIED_SENDER_EMAIL!}>`,

      Destination: {
        ToAddresses: [senderEmail],
      },
      Message: {
        Subject: {
          Data: "Thank you for reaching out!",
        },
        Body: {
          Text: {
            Data: `Hi,\n\nThank you for getting in touch. I appreciate you reaching out, and I'll get back to you as soon as possible.\n\nBest,\nOlu Kareem`,
          },
          Html: {
            Data: `<p>Hi,</p><p>Thank you for getting in touch. I appreciate you reaching out, and I'll get back to you as soon as possible.</p><p>Best,<br>Olu Kareem</p>`,
          },
        },
      },
    };

    const commandForSender = new SendEmailCommand(paramsForSender);
    await ses.send(commandForSender);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
