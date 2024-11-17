"use client";

import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookies.get("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <header className="w-full bg-slate-200 shadow-md">
        <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600"><Link href={"/"}>accesive</Link></h1>
          <Link href="/" className="text-blue-500 underline">
            <img alt="Return Home" src="/home.svg" />
          </Link>
        </nav>
      </header>
      <div className="flex min-h-screen justify-center px-4 text-center ">
        <h1 className="mt-10">Você está logado</h1>
      </div>
    </div>
  );
}
