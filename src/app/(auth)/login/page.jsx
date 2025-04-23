'use client';

import { useState } from 'react';
import { handleAuth } from '@/app/actions/auth';
import { useActionState } from 'react';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [state, formAction] = useActionState(handleAuth, { message: '' });
  console.log('state' , state)

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Signup'}</h1>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="mode" value={mode} />
        <input
          name="email"
          type="email"
          placeholder="Email"
          // required
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          // required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {mode === 'login' ? 'Login' : 'Signup'}
        </button>
      </form>

      <p className="mt-2 text-sm text-gray-700">
        {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="text-blue-600 underline"
        >
          {mode === 'login' ? 'Signup' : 'Login'}
        </button>
      </p>

      {state?.message && <p className="mt-4 text-green-700">{state.message}</p>}
    </div>
  );
}
