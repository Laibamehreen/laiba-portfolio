import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "laibamehreenk@gmail.com";

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

    // 2. Timestamps
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

    const emailSubject = `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #080B16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0E1326; border: 1px solid rgba(167, 139, 250, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); padding: 28px 32px; border-bottom: 1px solid rgba(167, 139, 250, 0.2);">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #EDE9FE; letter-spacing: -0.01em;">
        New Contact Inquiry
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #C4B5FD;">
        Submitted via Laiba Mehreen's Portfolio Website
      </p>
    </div>

    <!-- Metadata Table -->
    <div style="padding: 28px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background-color: #0B0F1F;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600; width: 120px;">Sender Name:</td>
          <td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8; font-weight: 600;">Sender Email:</td>
          <td style="padding: 8px 0; color: #A78BFA;">
            <a href="mailto:${escapedEmail}" style="color: #A78BFA; text-decoration: underline;">${escapedEmail}</a>
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
      <div style="padding: 20px 22px; background-color: #070A14; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 4px solid #A78BFA; border-radius: 10px; font-size: 14px; line-height: 1.65; color: #f1f5f9;">
        ${escapedMessage}
      </div>

      <!-- Quick Reply Action -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${escapedEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" 
           style="display: inline-block; padding: 12px 24px; background-color: #A78BFA; color: #080B16; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 14px 0 rgba(167, 139, 250, 0.3);">
          Reply Directly to ${escapedName}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 32px; background-color: #070A14; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748b; text-align: center;">
      This message was sent automatically from your personal portfolio.<br/>
      Reply-To header is set to <strong>${escapedEmail}</strong>.
    </div>

  </div>
</body>
</html>
    `.trim();

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

Reply directly to: ${cleanEmail}
Sent via Laiba Mehreen's Portfolio Website
    `.trim();

    // 4. Method A: SMTP Email Delivery (via Nodemailer)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
    const smtpSecure = process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1"
      : smtpPort === 465;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const fromAddress = process.env.SMTP_FROM || `"${cleanName} (via Portfolio)" <${smtpUser}>`;

        const info = await transporter.sendMail({
          from: fromAddress,
          to: RECIPIENT_EMAIL,
          replyTo: `"${cleanName}" <${cleanEmail}>`,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        console.log("Email sent successfully via SMTP:", info.messageId);

        return NextResponse.json({
          success: true,
          message: "Thanks for reaching out! Your message has been sent successfully via SMTP.",
          messageId: info.messageId,
        });
      } catch (smtpError: unknown) {
        console.error("SMTP transport error:", smtpError);
        const errMessage = smtpError instanceof Error ? smtpError.message : "SMTP delivery failed";
        return NextResponse.json(
          {
            success: false,
            error: `SMTP delivery error: ${errMessage}. Please verify your SMTP credentials.`,
          },
          { status: 500 }
        );
      }
    }

    // 5. Method B: Fallback to Resend API (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey !== "re_your_api_key_here") {
      try {
        const resend = new Resend(resendApiKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: [RECIPIENT_EMAIL],
          replyTo: cleanEmail,
          subject: emailSubject,
          html: htmlContent,
          text: textContent,
        });

        if (error) {
          console.error("Resend API error:", error);
          return NextResponse.json(
            {
              success: false,
              error: error.message || "Failed to deliver email through Resend provider.",
            },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: "Thanks for reaching out! Your message has been sent successfully.",
          id: data?.id,
        });
      } catch (resendError: unknown) {
        console.error("Resend delivery error:", resendError);
      }
    }

    // 6. Development Simulation Fallback
    if (process.env.NODE_ENV !== "production") {
      console.log("==========================================");
      console.log("📧 [CONTACT FORM SIMULATION - DEV MODE]");
      console.log("Note: Neither SMTP nor Resend credentials configured yet.");
      console.log(`To: ${RECIPIENT_EMAIL}`);
      console.log(`From (Visitor): ${cleanName} <${cleanEmail}>`);
      console.log(`Subject: ${cleanSubject}`);
      console.log(`Date: ${formattedDatePkt}`);
      console.log(`Message:\n${cleanMessage}`);
      console.log("==========================================");

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Thanks for reaching out! Your message has been sent successfully (Dev Simulation).",
      });
    }

    // 7. Production Error when neither service is set
    return NextResponse.json(
      {
        success: false,
        error:
          "Email delivery service is not configured. Please set SMTP credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) in your environment variables.",
      },
      { status: 500 }
    );
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
