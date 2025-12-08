export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Add your email service logic here (e.g., SendGrid, Nodemailer with Gmail)
    // Example with SendGrid:
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'your-email@example.com',
      from: 'noreply@yourdomain.com',
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    };

    await sgMail.send(msg);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
