import { NextResponse } from "next/server";
import { Resend } from "resend";

type NotifyPayload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PORTFOLIO_NOTIFY_TO;
  const from = process.env.PORTFOLIO_NOTIFY_FROM;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, error: "Server email configuration is missing." },
      { status: 500 }
    );
  }

  let payload: NotifyPayload;
  try {
    payload = (await request.json()) as NotifyPayload;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const role = typeof payload.role === "string" ? payload.role.trim().toLowerCase() : "";

  if (!name) {
    return badRequest("Name is required.");
  }

  if (!email || !EMAIL_RE.test(email)) {
    return badRequest("A valid email is required.");
  }

  if (role !== "recruiter" && role !== "client") {
    return badRequest("Role must be recruiter or client.");
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New Portfolio Visit — ${role}`,
      html: `
        <h2>New Portfolio Visit</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send notification email.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
