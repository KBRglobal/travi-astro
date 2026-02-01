import { useState, type FormEvent } from 'react';
import type { Language } from '../../lib/i18n';

interface ContactFormProps {
  lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const labels = {
    en: { name: 'Name', email: 'Email', message: 'Message', submit: 'Send Message' },
    ar: { name: 'الاسم', email: 'البريد الإلكتروني', message: 'الرسالة', submit: 'إرسال' },
    he: { name: 'שם', email: 'אימייל', message: 'הודעה', submit: 'שלח הודעה' },
    hi: { name: 'नाम', email: 'ईमेल', message: 'संदेश', submit: 'भेजें' },
    zh: { name: '姓名', email: '电子邮件', message: '信息', submit: '发送' },
    fr: { name: 'Nom', email: 'Email', message: 'Message', submit: 'Envoyer' },
    de: { name: 'Name', email: 'E-Mail', message: 'Nachricht', submit: 'Senden' },
    es: { name: 'Nombre', email: 'Correo', message: 'Mensaje', submit: 'Enviar' },
    ja: { name: '名前', email: 'メール', message: 'メッセージ', submit: '送信' },
  };

  const t = labels[lang] || labels.en;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t.name}
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : t.submit}
      </button>

      {status === 'success' && (
        <p className="text-sm text-green-600">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Failed to send message. Please try again.</p>
      )}
    </form>
  );
}
