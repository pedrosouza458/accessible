"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  // position

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = { name, email, city, phone, password, description, logo };

    try {
      const res = await fetch("http://localhost:3001/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-52 py-10">
      <div>
      <header className="w-full bg-slate-200 shadow-md">
        <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">accesive</h1>
          <Link href="/" className="text-blue-500 underline">
            <img alt="Return Home" src="/home.svg" />
          </Link>
        </nav>
      </header>
      </div>
      <h1>Submit Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="city">Cidade</Label>
          <Input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite sua cidade"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">senha</Label>
          <Input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">telefone</Label>
          <Input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digite seu telefone"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">descrição</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite uma descrição"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="logo">logo</Label>
          <Input
            type="text"
            id="logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="Digite uma descrição"
          />
        </div>

        {/* <div className="mb-4">
          <Label htmlFor="description">descrição</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite uma descrição"
            required
          />
        </div> */}
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}
