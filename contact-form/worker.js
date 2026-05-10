export default {
    async fetch(request) {
        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        const { name, email, message } = await request.json();

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'noreply@furry-tails.de',
                to: 'hello@furry-tails.de',
                subject: `New contact form submission from ${name}`,
                html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
            })
        });

        if (response.ok) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
        }
    }
};