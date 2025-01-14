import { prisma } from "../lib/prisma";

async function main() {
  // Clear existing data
  await prisma.business.deleteMany();
  await prisma.category.deleteMany();

  // Seed categories
  const categories = [
    { id: "c2c5fca8-ab70-49ba-bacc-d8957e85973f", name: "Alimentação" },
    { id: "c1724501-fb19-482f-9202-9cf9fe3b285c", name: "Farmácia" },
    { id: "f9b408cd-d8b6-41f2-8c2f-33a9ad7c6433", name: "Supermercado" },
    { id: "ddec2974-2f73-4f65-9f2e-5053641f09b9", name: "Banco" },
    { id: "f2c5d7b6-2e74-4c65-9e3f-6053642f09a1", name: "Entretenimento" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Seed businesses with specific categories
  const businesses = [
    {
      id: "8ea9dcf9-e413-4d60-a65f-505c26cecd17",
      email: "1@gmail.com",
      password: "123456",
      name: "Sorvete Gelado",
      phone: "912341234",
      logo: "https://www.designi.com.br/images/preview/10425424.jpg",
      description: "Sorvete mais gostoso da região",
      city: "Charqueadas",
      lat: "-29.9547025",
      long: "-51.6243934",
      categories: ["c2c5fca8-ab70-49ba-bacc-d8957e85973f"], // Alimentação
    },
    {
      id: "9ba8c7f1-6e23-4d78-a9e5-62d1f5eae77f",
      email: "2@gmail.com",
      password: "password123",
      name: "Farmácia Boa Saúde",
      phone: "912341235",
      logo: "https://www.example.com/logo.png",
      description: "Medicamentos e cuidados com a saúde",
      city: "Porto Alegre",
      lat: "-30.0346471",
      long: "-51.2176584",
      categories: ["c1724501-fb19-482f-9202-9cf9fe3b285c"], // Farmácia
    },
    {
      id: "3f2b1f8c-ec55-47c9-b5e8-7359c2f6c123",
      email: "3@gmail.com",
      password: "super123",
      name: "Supermercado Econômico",
      phone: "912341236",
      logo: "https://www.example.com/logo-super.png",
      description: "Tudo o que você precisa para sua casa",
      city: "Canoas",
      lat: "-29.9171484",
      long: "-51.1837227",
      categories: [
        "f9b408cd-d8b6-41f2-8c2f-33a9ad7c6433", // Supermercado
        "ddec2974-2f73-4f65-9f2e-5053641f09b9", // Banco
      ],
    },
  ];

  for (const business of businesses) {
    await prisma.business.create({
      data: {
        id: business.id,
        email: business.email,
        password: business.password,
        name: business.name,
        phone: business.phone,
        logo: business.logo,
        description: business.description,
        city: business.city,
        lat: business.lat,
        long: business.long,
        categories: {
          connect: business.categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });
  }

  console.log("Data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
