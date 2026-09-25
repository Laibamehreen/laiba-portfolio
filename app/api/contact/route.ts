import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "laibamehreenk@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Sender's name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Subject is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message is required (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // 2. Submission timestamp
    const now = new Date();
    const formattedDatePkt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Karachi",
    }).format(now);
    const formattedDateUtc = now.toUTCString();

    // 3. Email Content Generation
    const escapedName = escapeHtml(cleanName);
    const escapedEmail = escapeHtml(cleanEmail);
    const escapedSubject = escapeHtml(cleanSubject);
    const escapedMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 28px 32px; border-bottom: 1px solid #3730a3;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #e0e7ff; letter-spacing: -0.01em;">
        New Contact Inquiry
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #c7d2fe;">
        Submitted via Laiba Mehreen's Portfolio Website
      </p>
    </div>

    <!-- Metadata Table -->
    <div style="padding: 28px 32px; border-bottom: 1px solid #1f2937; background-color: #0f172a;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600; width: 120px;">Sender Name:</td>
          <td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Sender Email:</td>
          <td style="padding: 8px 0; color: #a5b4fc;">
            <a href="mailto:${escapedEmail}" style="color: #a5b4fc; text-decoration: underline;">${escapedEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Subject:</td>
          <td style="padding: 8px 0; color: #f8fafc;">${escapedSubject}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Date & Time:</td>
          <td style="padding: 8px 0; color: #cbd5e1; font-size: 13px;">
            ${formattedDatePkt}<br/>
            <span style="color: #64748b; font-size: 12px;">(UTC: ${formattedDateUtc})</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Message Body -->
    <div style="padding: 32px;">
      <h2 style="margin: 0 0 14px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">
        Message Content
      </h2>
      <div style="padding: 20px 22px; background-color: #030712; border: 1px solid #1f2937; border-left: 4px solid #818cf8; border-radius: 10px; font-size: 14px; line-height: 1.65; color: #f1f5f9;">
        ${escapedMessage}
      </div>

      <!-- Quick Reply Action -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${escapedEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" 
           style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.39);">
          Reply Directly to ${escapedName}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 32px; background-color: #030712; border-top: 1px solid #1f2937; font-size: 11px; color: #64748b; text-align: center;">
      This message was sent automatically from your personal portfolio at <a href="https://laibamehreen.dev" style="color: #64748b;">laiba-portfolio</a>.<br/>
      Reply-To header is set to <strong>${escapedEmail}</strong>.
    </div>

  </div>
</body>
</html>
    `;

    const textContent = `
NEW PORTFOLIO CONTACT INQUIRY
=============================

Sender:    ${cleanName}
Email:     ${cleanEmail}
Subject:   ${cleanSubject}
Date/Time: ${formattedDatePkt} (UTC: ${formattedDateUtc})

MESSAGE:
-----------------------------
${cleanMessage}
-----------------------------

Reply directly to this email or send your reply to: ${cleanEmail}
Sent via Laiba Mehreen's Portfolio Website
    `.trim();

    // 4. Send with Resend
    const apiKey = process.env.RESEND_API_KEY;

    // Fallback in development mode when API key is not configured yet
    if (!apiKey || apiKey === "re_your_api_key_here") {
      if (process.env.NODE_ENV !== "production") {
        console.log("==========================================");
        console.log("📧 [CONTACT FORM SIMULATION - DEV MODE]");
        console.log(`To: ${RECIPIENT_EMAIL}`);
        console.log(`From (Visitor): ${cleanName} <${cleanEmail}>`);
        console.log(`Subject: ${cleanSubject}`);
        console.log(`Date: ${formattedDatePkt}`);
        console.log(`Message:\n${cleanMessage}`);
        console.log("==========================================");

        return NextResponse.json({
          success: true,
          simulated: true,
          message: "Thanks for reaching out! Your message has been sent successfully.",
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: "Email delivery service is not configured. Please set RESEND_API_KEY in environment variables.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: cleanEmail,
      subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to deliver email through transactional email provider.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! Your message has been sent successfully.",
      id: data?.id,
    });
  } catch (err: unknown) {
    console.error("Unhandled contact API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
