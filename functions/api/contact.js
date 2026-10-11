/**
 * Cloudflare Pages Function: Contact Form Handler
 * Endpoint: /api/contact (POST)
 *
 * This function runs on Cloudflare's global edge network (Cloudflare Workers runtime).
 * It receives form submissions from EWENBUILDS.xyz and forwards them to your email
 * via an external email delivery API (e.g., Resend, Mailchannels, SendGrid, or Postmark).
 *
 * To enable this Cloudflare Pages Function:
 * 1. Set the environment variable `EMAIL_API_KEY` in Cloudflare Dashboard:
 *    Pages > Settings > Environment variables > Production > EMAIL_API_KEY = "[INSERT RESEND OR SENDGRID API KEY]"
 *    And optionally: `RECIPIENT_EMAIL` = "[INSERT YOUR EMAIL ADDRESS]"
 * 2. In src/components/ContactSection.tsx, toggle the form submission mode from Formspree to '/api/contact'.
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const contentType = request.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let message = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name || "";
      email = body.email || "";
      message = body.message || "";
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name") || "";
      email = formData.get("email") || "";
      message = formData.get("message") || "";
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, or message" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
    // --- EXAMPLE 1: Sending via Resend API (Recommended for Cloudflare Pages) ---
    // Make sure to add EMAIL_API_KEY to your Cloudflare Pages environment variables
    const resendApiKey = env.EMAIL_API_KEY || "[INSERT RESEND API KEY]";
    const recipientEmail = env.RECIPIENT_EMAIL || "[INSERT YOUR NOTIFICATION EMAIL]";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "portfolio@ewenbuilds.xyz",
        to: recipientEmail,
        reply_to: email,
        subject: `New Portfolio Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return new Response(
        JSON.stringify({ error: "Failed to dispatch email", details: errorText }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    */

    /*
    // --- EXAMPLE 2: Sending via Cloudflare + MailChannels (Free for Cloudflare Workers) ---
    const mailchannelsResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "[INSERT YOUR NOTIFICATION EMAIL]", name: "Ewen Builds Admin" }] }],
        from: { email: "contact@ewenbuilds.xyz", name: name },
        subject: `[EWENBUILDS.xyz] Message from ${name}`,
        content: [{ type: "text/plain", value: `From: ${name} (${email})\n\n${message}` }],
      }),
    });
    */

    // Default response for placeholder demonstration
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message received successfully by Cloudflare Pages Function. [INSERT CUSTOM SUCCESS RESPONSE]",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error handling message", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
