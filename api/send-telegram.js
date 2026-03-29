export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, phone, time } = req.body;
    const token = process.env.TG_TOKEN; // Vercel подставит это сам
    const chatId = process.env.TG_CHAT_ID;

    const cleanPhone = phone.replace(/\D/g, '');
    const message = `🔥 *НОВАЯ ЗАЯВКА (в ${time})*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;

    const keyboard = {
        inline_keyboard: [[
            { text: "✉️ Написать в TG", url: `https://t.me/+${cleanPhone.startsWith('7') ? cleanPhone : '7' + cleanPhone}` },
            { text: "💬 В WhatsApp", url: `https://wa.me/${cleanPhone}` }
        ]]
    };

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
                reply_markup: keyboard
            })
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}