"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";

import { FormEvent, useEffect, useState } from "react";

import { distances } from "../../../utils/distances";

import { SelectTrigger } from "@radix-ui/react-select";

import { Cities } from "../../../utils/cities";
import Link from "next/link";

export default function Business() {
  const [business, setBusiness] = useState<any[]>([]); // Store fetched business data

  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const [error, setError] = useState<string | null>(null); // Error state

  const [location, setLocation] = useState<string | null>(null); // Default location

  const [distance, setDistance] = useState<string>("10"); // Default distance

  const [city, setCity] = useState<string>(""); // Allow initial empty city value

  // Get the user's location on component mount

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );

          setError(null); // Clear any previous error
        },

        (error) => {
          setError("Location access denied or unavailable.");

          console.error(error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to fetch business data

  const fetchBusinessData = async () => {
    try {
      setLoading(true);

      const queryLocation = location || "0"; // Default location

      const queryCity = city || ""; // If no city, fetch all businesses

      const queryDistance = distance || "10"; // Default distance

      let url = `http://localhost:3001/business/${queryCity}/${queryLocation}/${queryDistance}`;

      if (queryCity === "") {
        // If no city, use the endpoint that fetches all businesses but apply distance if available

        url = `http://localhost:3001/business?distance=${queryDistance}&location=${queryLocation}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch business data");
      }

      const data = await response.json();

      setBusiness(data); // Update state with fetched data
    } catch (err) {
      setError("An error occurred while fetching business data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and whenever parameters change

  useEffect(() => {
    fetchBusinessData(); // Fetch data based on selected parameters
  }, [location, distance, city]); // Re-fetch when any of these state values change

  // Handle form submission

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetchBusinessData();
  };

  return (
    <div>
      <header className="w-full bg-slate-200 shadow-md">
        <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">accesive</h1>
          <Link href="/" className="text-blue-500 underline">
            <img alt="Return Home" src="/home.svg" />
          </Link>
        </nav>
      </header>
      <div className="px-32 py-12">
        <div className="flex flex-col space-y-2">
          <form onSubmit={handleSubmit} className="text-center py-3">
            <Select onValueChange={(value) => setDistance(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione uma distância" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {Object.entries(distances).map(([label, value]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setCity(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione uma cidade" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {Object.entries(Cities).map(([label, value]) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-6">
          {business.length > 0 ? (
            business.map((businessItem: any) => (
              <Card
              key={businessItem.id}
              className="relative overflow-hidden border-zinc-300 rounded-xl border-2"
            >
              <CardHeader className="relative">
                {/* Always reserve space for the banner */}
                <div className="w-full h-8 flex items-center justify-center">
                  {businessItem.urgency && (
                    <div className="absolute top-0 left-0 w-full py-2 px-2 font-bold text-center bg-[repeating-linear-gradient(45deg,_#FFDD57_0,_#FFDD57_10px,_#FFAD39_10px,_#FFAD39_20px)]">
                      EMERGÊNCIA
                    </div>
                  )}
                </div>
            
                {/* Card Title */}
                <CardTitle>
                  <h1 className="font-semibold text-center pb-4">{businessItem.name}</h1>
                </CardTitle>
            
                {/* Card Description */}
                <CardDescription>
                  <img
                    src={businessItem.logo}
                    alt="Business Logo"
                    className="w-full h-40 object-cover"
                  />
                </CardDescription>
              </CardHeader>
            
              <CardContent>
                <h2 className="text-center">{businessItem.city}</h2>
              </CardContent>
            
              <CardFooter>
                <h3 className="text-center">{businessItem.description}</h3>
              </CardFooter>
            </Card>
            
            ))
          ) : (
            <p>Nenhuma empresa encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
