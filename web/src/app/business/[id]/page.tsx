import { notFound } from "next/navigation";
import { mockBusinesses } from "./data";
import { Business, BusinessPageProps } from "./types";
import Link from "next/link";
import PixQRCodeGenerator from "@/components/pixQRCodeGenerator";

function getBusiness(id: string): Business | undefined {
  return mockBusinesses.find((business) => business.id === id);
}

// async await version of above function
// async function getBusiness(id: string): Promise<Business | undefined> {
//   return mockBusinesses.find((business) => business.id === id);
// }

export default function BusinessPage({ params }: BusinessPageProps) {
  const business = getBusiness(params.id);

  if (!business) {
    notFound();
  }

  return (
    <>
      <header className="w-full bg-slate-200 shadow-md">
        <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">accesive</h1>
          <Link href="/" className="text-blue-500 underline">
            <img alt="Return Home" src="/home.svg" />
          </Link>
        </nav>
      </header>
      <div className="flex flex-col items-center p-6  min-h-screen">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          {business.logo && (
            <img
              src={business.logo}
              alt={`${business.name} logo`}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {business.name}
            </h1>
            <p className="text-gray-600 mb-4">{business.description}</p>
            <div className="text-gray-600">
              <p>
                <strong>Cidade:</strong> {business.city}
              </p>
              <a
                className="flex gap-3"
                aria-label="Chamar pelo whatsApp"
                href="https://wa.me/5551984706698?text=Tenho%20interesse%20em%20prestar%20serviço"
              >
                <strong> Celular:</strong>
                {business.phone}
                <img alt="Chat on WhatsApp" src="/WhatsApp.svg" />
              </a>
              {business.position && (
                <p>
                  <strong>Coordenadas:</strong> {business.position}
                </p>
              )}
              {business.pixText && (
                <p>
                  <strong>Mensagem Pix:</strong> {business.pixText}
                </p>
              )}
              {business.pixKey && (
                <p>
                  <strong>chave Pix:</strong>{" "}
                  00020126360014BR.GOV.BCB.PIX0114+5551984706698520400005303986540510.005802BR5925Enzo
                  da Silva Coronel Gar6009SAO PAULO62140510RMe5U8xJEz6304C9B9
                </p>
              )}
              <div className="hidden lg:block">
                <PixQRCodeGenerator pixKey="00020126360014BR.GOV.BCB.PIX0114+5551984706698520400005303986540510.005802BR5925Enzo da Silva Coronel Gar6009SAO PAULO62140510RMe5U8xJEz6304C9B9" />
              </div>
              <h2>Vagas para Funcionários e Voluntários</h2>

              <table>
                <thead>
                  <tr>
                    <th>Tipo de Vaga</th>
                    <th>Cargo</th>
                    <th>Salário</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Funcionário</td>
                    <td>Faxineiro</td>
                    <td>R$ 1.500,00</td>
                  </tr>
                  <tr>
                    <td>Funcionário</td>
                    <td>Caixa</td>
                    <td>R$ 900,00</td>
                  </tr>
                  <tr>
                    <td>Voluntário</td>
                    <td>Assistente de Marketing</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Voluntário</td>
                    <td>Encanador</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
              <p>
                <strong>Emergencia:</strong> {business.urgency ? "Yes" : "No"}
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Links</h2>
              <ul className="list-disc list-inside">
                {business.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://wa.me/5551984706698?text=Tenho%20interesse%20em%20prestar%20serviço"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:w-1/2 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 animate-pulse"
              style={{ animation: "flashy 2s infinite" }}
            >
              Chamar pelo whatsApp
              <img alt="Chat on WhatsApp" src="/whatsAppWhite.svg" />
            </a>
            <p className="mt-6 text-gray-500 text-sm">
              Criado em: {business.createdAt.toDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
