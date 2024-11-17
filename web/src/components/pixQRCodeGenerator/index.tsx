"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { CreditCard } from "lucide-react"; // Import an icon from lucide-react

// Define the props type, only requiring the pixKey
interface PixQRCodeGeneratorProps {
  pixKey: string; // The Pix key used to generate the QR code
}

const PixQRCodeGenerator: React.FC<PixQRCodeGeneratorProps> = ({ pixKey }) => {
  const [qrCode, setQrCode] = useState<string>("");

  // Function to generate the PIX QR Code based only on Pix key
  const generatePixCode = (pixKey: string): string => {
    const pixCode = [
      `${pixKey.length.toString().padStart(2, "0")}${pixKey}`, // Pix Key
    ];

    // Calculate CRC16 checksum
    const crc16 = calculateCRC16(pixCode.join(""));
    return `${pixKey}`;
  };

  // Function to calculate CRC16 for PIX code
  const calculateCRC16 = (data: string): string => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
        else crc <<= 1;
      }
    }
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
  };

  // Generate the PIX QR Code Image
  useEffect(() => {
    const pixData = generatePixCode(pixKey);
    QRCode.toDataURL(pixData)
      .then((qrCodeDataUrl) => {
        setQrCode(qrCodeDataUrl);
      })
      .catch((error) => {
        console.error("Error generating QR Code", error);
      });
  }, [pixKey]);

  return (
    <div className="pix-qr-container">
      <h2 className="text-xl font-bold text-center">QR CODE PIX</h2>

      {/* Displaying the QR Code Image */}
      <div className="qr-code-container flex justify-center my-4">
        {qrCode ? (
          <img src={qrCode} alt="PIX QR Code" className="w-64 h-64" />
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default PixQRCodeGenerator;
