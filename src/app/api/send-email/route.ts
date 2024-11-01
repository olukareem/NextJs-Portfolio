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
    const { senderEmail, subject, message } = await req.json();

    const params = {
      Source: process.env.VERIFIED_SENDER_EMAIL!,
      Destination: {
        ToAddresses: ["olukareem@pm.me"], 
      },
      Message: {
        Subject: {
          Data: subject || "New message from your portfolio",
        },
        Body: {
          Text: {
            Data: `From: ${senderEmail}\n\nMessage: ${message}`,
          },
          Html: {
            Data: `<strong>From:</strong> ${senderEmail}<br><br><strong>Message:</strong><br>${message.replace(
              /\n/g,
              "<br>"
            )}`,
          },
        },
      },
      ReplyToAddresses: [senderEmail],
    };

    const command = new SendEmailCommand(params);
    await ses.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
