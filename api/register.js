import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// 1. Подключение к базе (оставляем как было)
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI);
};

// 2. Схема заявки (оставляем как было)
const LeadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    createdAt: { type: Date, default: Date.now }
});
const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        await connectDB();
        const { name, phone } = req.body;

        // Сохраняем в базу
        await Lead.create({ name, phone });

        // 3. НАСТРОЙКА MAIL.RU
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true, // Используем SSL
            auth: {
                user: process.env.EMAIL_USER, // ВАШ email
                pass: process.env.EMAIL_PASS, // ВАШ пароль приложения
            },
        });

        // Отправляем письмо
        await transporter.sendMail({
            from: `"Сайт Йоги" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Отправляем сами себе
            subject: 'Новая заявка с сайта!',
            text: `Имя: ${name}\nТелефон: ${phone}`,
            html: `<b>Новая заявка:</b><br>Имя: ${name}<br>Телефон: ${phone}`,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ error: error.message });
    }
}
