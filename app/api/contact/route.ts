import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeInput(text: string): string {
  return text.trim();
}

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
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // 1. Field Validations
    if (!name || typeof name !== "string" || sanitizeInput(name).length < 2) {
      return NextResponse.json(
        { success: false, error: "Name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (sanitizeInput(name).length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(sanitizeInput(email))) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }
    if (sanitizeInput(email).length > 120) {
      return NextResponse.json(
        { success: false, error: "Email must not exceed 120 characters." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || sanitizeInput(subject).length < 2) {
      return NextResponse.json(
        { success: false, error: "Subject is required (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (sanitizeInput(subject).length > 200) {
      return NextResponse.json(
        { success: false, error: "Subject must not exceed 200 characters." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || sanitizeInput(message).length < 5) {
      return NextResponse.json(
        { success: false, error: "Message is required (minimum 5 characters)." },
        { status: 400 }
      );
    }
    if (sanitizeInput(message).length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message must not exceed 5000 characters." },
        { status: 400 }
      );
    }

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);

    // 2. Submission Timestamp
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Karachi",
    }).format(now);
    const utcString = now.toUTCString();

    // 3. SMTP & Gmail Configuration (with direct production-ready fallbacks)
    const smtpUser = (
      process.env.GMAIL_USER ||
      process.env.SMTP_USER ||
      "laibamehreenk@gmail.com"
    ).trim();

    const smtpPass = (
      process.env.GMAIL_APP_PASSWORD ||
      process.env.SMTP_PASS ||
      process.env.SMTP_PASSWORD ||
      "lsalmmwdetspvmep"
    ).replace(/\s+/g, "");

    const recipientEmail = (
      process.env.CONTACT_EMAIL ||
      process.env.CONTACT_RECEIVER_EMAIL ||
      smtpUser ||
      "laibamehreenk@gmail.com"
    ).trim();

    const emailSubject = `[Portfolio Contact] ${cleanSubject}`;

    const textContent = `
New contact form submission received from Laiba Mehreen's Portfolio:

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}

Timestamp: ${formattedDate} (${utcString})
Sender Reply-To: ${cleanEmail}
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Portfolio Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #080B16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0E1326; border: 1px solid rgba(167, 139, 250, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); padding: 24px 30px; border-bottom: 1px solid rgba(167, 139, 250, 0.2);">
      <h1 style="margin: 0; font-size: 19px; font-weight: 700; color: #EDE9FE;">
        New Contact Form Submission
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #C4B5FD;">
        Received from your portfolio website
      </p>
    </div>

    <!-- Details Table -->
    <div style="padding: 24px 30px; background-color: #0B0F1F; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-weight: 600; width: 100px;">Name:</td>
          <td style="padding: 8px 0; color: #F8FAFC; font-weight: 600;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0; color: #A78BFA;">
            <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #A78BFA; text-decoration: underline;">${escapeHtml(cleanEmail)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-weight: 600;">Subject:</td>
          <td style="padding: 8px 0; color: #F8FAFC;">${escapeHtml(cleanSubject)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-weight: 600;">Date:</td>
          <td style="padding: 8px 0; color: #CBD5E1; font-size: 13px;">${formattedDate}</td>
        </tr>
      </table>
    </div>

    <!-- Message Content -->
    <div style="padding: 28px 30px;">
      <h2 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em;">
        Message
      </h2>
      <div style="padding: 18px 20px; background-color: #070A14; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 4px solid #A78BFA; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #F1F5F9;">
        ${escapeHtml(cleanMessage).replace(/\n/g, "<br/>")}
      </div>

      <!-- Quick Reply Button -->
      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re: ${encodeURIComponent(cleanSubject)}"
           style="display: inline-block; padding: 12px 24px; background-color: #A78BFA; color: #080B16; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px;">
          Reply to ${escapeHtml(cleanName)}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 14px 30px; background-color: #070A14; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748B; text-align: center;">
      Reply-To is configured to <strong>${escapeHtml(cleanEmail)}</strong>.
    </div>

  </div>
</body>
</html>
    `.trim();

    // 4. Create Standard SMTP Transporter (port 465 SSL or 587 TLS)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false", // default to SSL 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 5. Send Real Email via SMTP
    const info = await transporter.sendMail({
      from: `"Laiba Mehreen Portfolio" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    console.log("✅ [SMTP SUCCESS] Message delivered:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully. I'll get back to you soon.",
    });
  } catch (error: any) {
    console.error("❌ [SMTP ERROR] Failed to deliver contact form email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again or email directly at laibamehreenk@gmail.com",
      },
      { status: 500 }
    );
  }
}
