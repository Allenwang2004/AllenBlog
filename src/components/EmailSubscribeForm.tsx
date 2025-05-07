import { useState } from 'react';

const EmailSubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 my-6">
      <input
        type="email"
        required
        placeholder="輸入你的 Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 w-full rounded border border-gray-300 dark:border-gray-700 dark:bg-black dark:text-white"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {status === 'sending' ? '傳送中...' : '訂閱'}
      </button>
      {status === 'success' && <p className="text-green-600">已寄出感謝信！</p>}
      {status === 'error' && <p className="text-red-600">寄送失敗，請再試一次</p>}
    </form>
  );
};

export default EmailSubscribeForm;