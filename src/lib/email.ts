import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY ?? "")

export async function sendSignInEmail({
  email,
  url,
}: {
  email: string
  url: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured; skipping email send.")
    return
  }

  await resend.emails.send({
    from: "The Lab <auth@thelab.dev>",
    to: email,
    subject: "Your sign-in link",
    html: `<p>Welcome back! Click the link below to sign in:</p><p><a href="${url}">Sign in to The Lab</a></p>`
  })
}
