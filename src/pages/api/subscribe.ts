import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend('re_AH1gDuAD_3HtjZMNJWtRgTjsKnvoEwjEH');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: '請輸入有效 email' });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '感謝訂閱！',
      html: `
        <p>Hi!感謝你訂閱我的網站</p>
        <p>未來有新文章、專案更新，我會第一時間通知你。</p>
        <p>你可以隨時回信給我或取消訂閱。</p>
        <br />
        <p>祝好，</p>
        <p>— Allen</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    return res.status(500).json({ error: '寄信失敗，請稍後再試' });
  }
}