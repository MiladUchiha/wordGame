"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const router = useRouter();
  const [name, setName] = useState('');
const handleLogin = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
        name,
    });

    if (result.error) {
        toast.error(result.error);
    } else {
        router.push('/');
    }
}
const handleSubmit = async (e) => {
    e.preventDefault();
    
    
        // If sign in fails, register the user
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();
            console.log(data);
            
            // Perform any action after successful registration
            toast.success(data);
        } catch (error) {
            toast.error(error.message);
        
    }
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h1>User Registration or login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} 
          onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <form onSubmit={handleLogin}>
        <label>
          Name:
          <input type="text" value={name} 
          onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>

    </div>
    </main>
  );
};

export default RegisterPage;

