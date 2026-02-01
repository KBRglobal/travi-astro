import { useState, type FormEvent } from 'react';
import type { Language } from '../../lib/i18n';

interface ContactFormProps {
  lang: Language;
}

// Comprehensive translations for all 30 languages
const translations = {
  en: {
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    message: 'Message',
    messagePlaceholder: 'How can we help you?',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully! We\'ll get back to you soon.',
    errorGeneric: 'Failed to send message. Please try again.',
    errorEmail: 'Please enter a valid email address',
    errorRequired: 'Please fill in all required fields',
    errorRateLimit: 'Too many requests. Please try again later.',
  },
  ar: {
    name: 'الاسم',
    namePlaceholder: 'اسمك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'your@email.com',
    message: 'الرسالة',
    messagePlaceholder: 'كيف يمكننا مساعدتك؟',
    submit: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال الرسالة بنجاح! سنعود إليك قريباً.',
    errorGeneric: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    errorEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
    errorRequired: 'يرجى ملء جميع الحقول المطلوبة',
    errorRateLimit: 'طلبات كثيرة جداً. يرجى المحاولة لاحقاً.',
  },
  he: {
    name: 'שם',
    namePlaceholder: 'השם שלך',
    email: 'אימייל',
    emailPlaceholder: 'your@email.com',
    message: 'הודעה',
    messagePlaceholder: 'איך נוכל לעזור לך?',
    submit: 'שלח הודעה',
    sending: 'שולח...',
    success: 'ההודעה נשלחה בהצלחה! נחזור אליך בקרוב.',
    errorGeneric: 'שליחת ההודעה נכשלה. נסה שוב.',
    errorEmail: 'נא להזין כתובת אימייל תקינה',
    errorRequired: 'נא למלא את כל השדות הנדרשים',
    errorRateLimit: 'יותר מדי בקשות. נסה שוב מאוחר יותר.',
  },
  es: {
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    email: 'Correo',
    emailPlaceholder: 'tu@email.com',
    message: 'Mensaje',
    messagePlaceholder: '¿Cómo podemos ayudarte?',
    submit: 'Enviar Mensaje',
    sending: 'Enviando...',
    success: '¡Mensaje enviado con éxito! Te responderemos pronto.',
    errorGeneric: 'Error al enviar. Inténtalo de nuevo.',
    errorEmail: 'Por favor ingresa un correo válido',
    errorRequired: 'Por favor completa todos los campos',
    errorRateLimit: 'Demasiadas solicitudes. Inténtalo más tarde.',
  },
  fr: {
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'votre@email.com',
    message: 'Message',
    messagePlaceholder: 'Comment pouvons-nous vous aider?',
    submit: 'Envoyer',
    sending: 'Envoi...',
    success: 'Message envoyé avec succès! Nous vous répondrons bientôt.',
    errorGeneric: 'Échec de l\'envoi. Veuillez réessayer.',
    errorEmail: 'Veuillez entrer une adresse email valide',
    errorRequired: 'Veuillez remplir tous les champs',
    errorRateLimit: 'Trop de demandes. Réessayez plus tard.',
  },
  de: {
    name: 'Name',
    namePlaceholder: 'Ihr Name',
    email: 'E-Mail',
    emailPlaceholder: 'ihre@email.com',
    message: 'Nachricht',
    messagePlaceholder: 'Wie können wir Ihnen helfen?',
    submit: 'Senden',
    sending: 'Senden...',
    success: 'Nachricht erfolgreich gesendet! Wir melden uns bald.',
    errorGeneric: 'Senden fehlgeschlagen. Bitte erneut versuchen.',
    errorEmail: 'Bitte geben Sie eine gültige E-Mail ein',
    errorRequired: 'Bitte füllen Sie alle Felder aus',
    errorRateLimit: 'Zu viele Anfragen. Bitte später versuchen.',
  },
  // Add abbreviated translations for other languages
  zh: { name: '姓名', namePlaceholder: '您的姓名', email: '电子邮件', emailPlaceholder: 'your@email.com', message: '信息', messagePlaceholder: '我们如何帮助您?', submit: '发送', sending: '发送中...', success: '消息发送成功！我们会尽快回复您。', errorGeneric: '发送失败。请重试。', errorEmail: '请输入有效的电子邮件', errorRequired: '请填写所有必填字段', errorRateLimit: '请求过多。请稍后再试。' },
  ja: { name: '名前', namePlaceholder: 'お名前', email: 'メール', emailPlaceholder: 'your@email.com', message: 'メッセージ', messagePlaceholder: 'どのようにお手伝いできますか？', submit: '送信', sending: '送信中...', success: 'メッセージが送信されました！すぐに返信いたします。', errorGeneric: '送信に失敗しました。もう一度お試しください。', errorEmail: '有効なメールアドレスを入力してください', errorRequired: 'すべてのフィールドに入力してください', errorRateLimit: 'リクエストが多すぎます。後でもう一度お試しください。' },
  ko: { name: '이름', namePlaceholder: '귀하의 이름', email: '이메일', emailPlaceholder: 'your@email.com', message: '메시지', messagePlaceholder: '어떻게 도와드릴까요?', submit: '보내기', sending: '전송 중...', success: '메시지가 성공적으로 전송되었습니다! 곧 답변드리겠습니다.', errorGeneric: '전송 실패. 다시 시도하세요.', errorEmail: '유효한 이메일을 입력하세요', errorRequired: '모든 필드를 입력하세요', errorRateLimit: '요청이 너무 많습니다. 나중에 다시 시도하세요.' },
  it: { name: 'Nome', namePlaceholder: 'Il tuo nome', email: 'Email', emailPlaceholder: 'tua@email.com', message: 'Messaggio', messagePlaceholder: 'Come possiamo aiutarti?', submit: 'Invia', sending: 'Invio...', success: 'Messaggio inviato con successo! Ti risponderemo presto.', errorGeneric: 'Invio fallito. Riprova.', errorEmail: 'Inserisci un\'email valida', errorRequired: 'Compila tutti i campi', errorRateLimit: 'Troppe richieste. Riprova più tardi.' },
  pt: { name: 'Nome', namePlaceholder: 'Seu nome', email: 'Email', emailPlaceholder: 'seu@email.com', message: 'Mensagem', messagePlaceholder: 'Como podemos ajudar?', submit: 'Enviar', sending: 'Enviando...', success: 'Mensagem enviada com sucesso! Responderemos em breve.', errorGeneric: 'Falha no envio. Tente novamente.', errorEmail: 'Digite um email válido', errorRequired: 'Preencha todos os campos', errorRateLimit: 'Muitas solicitações. Tente mais tarde.' },
  ru: { name: 'Имя', namePlaceholder: 'Ваше имя', email: 'Email', emailPlaceholder: 'ваш@email.com', message: 'Сообщение', messagePlaceholder: 'Как мы можем помочь?', submit: 'Отправить', sending: 'Отправка...', success: 'Сообщение отправлено! Мы скоро ответим.', errorGeneric: 'Ошибка отправки. Попробуйте снова.', errorEmail: 'Введите корректный email', errorRequired: 'Заполните все поля', errorRateLimit: 'Слишком много запросов. Попробуйте позже.' },
  hi: { name: 'नाम', namePlaceholder: 'आपका नाम', email: 'ईमेल', emailPlaceholder: 'your@email.com', message: 'संदेश', messagePlaceholder: 'हम आपकी कैसे मदद कर सकते हैं?', submit: 'भेजें', sending: 'भेजा जा रहा है...', success: 'संदेश सफलतापूर्वक भेजा गया! हम जल्द ही जवाब देंगे।', errorGeneric: 'भेजने में विफल। पुनः प्रयास करें।', errorEmail: 'कृपया वैध ईमेल दर्ज करें', errorRequired: 'कृपया सभी फ़ील्ड भरें', errorRateLimit: 'बहुत सारे अनुरोध। बाद में प्रयास करें।' },
};

// Add remaining languages with English fallback
const englishTranslation = translations.en;
const fallbackLanguages = ['bn', 'cs', 'da', 'el', 'fa', 'fil', 'id', 'ms', 'nl', 'no', 'pl', 'sv', 'th', 'tr', 'uk', 'ur', 'vi'];

fallbackLanguages.forEach((lang) => {
  translations[lang as keyof typeof translations] = englishTranslation;
});

export default function ContactForm({ lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Anti-spam field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const t = translations[lang] || translations.en;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrorMessage(t.errorRateLimit);
        } else if (response.status === 400) {
          setErrorMessage(t.errorEmail);
        } else {
          setErrorMessage(t.errorGeneric);
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });

      // Reset to idle after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setErrorMessage(t.errorGeneric);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Don't fill this out</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t.name} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          placeholder={t.namePlaceholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t.email} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder={t.emailPlaceholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t.sending}
          </>
        ) : (
          t.submit
        )}
      </button>

      {status === 'success' && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <svg
              className="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-3 text-sm font-medium text-green-800">{t.success}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-3 text-sm font-medium text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}
    </form>
  );
}
