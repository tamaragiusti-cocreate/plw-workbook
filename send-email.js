exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const RESEND_KEY = 're_jekaTD8j_NYzA4J7EguV6vpE8bci4zz3k';

  try {
    const { email, link } = JSON.parse(event.body);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'PLW Workbook <workbook@cocreateclassroom.net>',
        to: email,
        subject: 'Your Professional Learning Workbook — Magic Link',
        html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem">
          <div style="background:#1A1A2E;color:white;padding:1.5rem;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="font-size:18px;margin:0">Interactive Digital Professional Learning Workbook</h1>
            <p style="font-size:12px;opacity:0.7;margin-top:6px">American College of Education | CI 6143 | Tamara Giusti</p>
          </div>
          <div style="background:white;border:2px solid #1A1A2E;border-top:none;border-radius:0 0 12px 12px;padding:2rem;text-align:center">
            <h2 style="color:#1A1A2E;margin-bottom:12px">Your personal workbook link 🌱</h2>
            <p style="color:#6B7280;font-size:14px;line-height:1.6;margin-bottom:1.5rem">Click the button below to return to your workbook anytime. This link is personal to you — bookmark it so you can always pick up where you left off.</p>
            <a href="${link}" style="display:inline-block;background:#3DAA5C;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:800;font-size:15px">Return to My Workbook →</a>
            <p style="color:#6B7280;font-size:12px;margin-top:1.5rem">Or copy this link:<br><span style="word-break:break-all;color:#2E8A48">${link}</span></p>
          </div>
        </div>`
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 500, body: JSON.stringify({ error: err }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
