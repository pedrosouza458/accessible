import { prisma } from "../lib/prisma";
import { CreateBusinessForm } from "./create-business-form";

async function main() {

  await prisma.business.deleteMany();
  await prisma.question.deleteMany();

 const bussines = await prisma.business.createMany({
    data: [
      {
        id: "8ea9dcf9-e413-4d60-a65f-505c26cecd17",
        email: "1@gmail.com",
        password: "123456",
        name: "Sorvete Gelado",
        phone: "912341234",
        logo: "https://www.designi.com.br/images/preview/10425424.jpg",
        description: "Sorvete mais gostoso da região",
        city: "Charqueadas",
        position: "-29.9547025, -51.6243934",
      },
      {
        id: "6fde4fb9-a5d8-4050-b969-d642002d48fa",
        email: "2@gmail.com",
        password: "123456",
        name: "Ateliê Gráfico",
        phone: "912341234",
        logo: "https://scontent.fpoa33-2.fna.fbcdn.net/v/t39.30808-1/300672401_530044555564677_5340190607726412077_n.jpg?stp=dst-jpg_s480x480&_nc_cat=103&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=a8QYBt9G1zYQ7kNvgGN3rVu&_nc_zt=24&_nc_ht=scontent.fpoa33-2.fna&_nc_gid=Ay5TI914ZYvIOt0mISnyrRc&oh=00_AYBN_jsSqHAbyeClzuYmXcFIeaVOOrTCgZDSMVItr8_ZcA&oe=6739F1BC",
        description: "Xerox e impressões no melhor preço",
        city: "Charqueadas",
        position: "-29.9545642, -51.6238718",
      },
      {
        id: "15bff3c3-2166-4e32-a422-dd12896ed59c",
        email: "3@gmail.com",
        password: "123456",
        name: "Coffee Shop",
        phone: "912341234",
        logo: "https://t4.ftcdn.net/jpg/04/83/16/09/360_F_483160952_bYB2DOjUdsuB33gTXodCnnn8qDMxtSkl.jpg",
        description: "Café mais gostoso da região",
        city: "Charqueadas",
        position: "-29.9547831, -51.6248894",
      },
      {
        id: "39c345a8-7918-47a1-8cea-cae58cbe82ef",
        name: "Toy Shop",
        city: "Charqueadas",
        email: "toyshop4@gmail.com",
        password: "123456",
        phone: "51912341234",
        description: "Melhor loja de brinquedos de Charqueadas",
        logo: "https://img.freepik.com/vetores-gratis/projeto-de-fonte-para-loja-de-brinquedos-de-palavra-com-muitos-brinquedos_1308-42318.jpg",
        position: "-29.9647004, -51.6147256",
        urgency: true
      },
      {
         id: "8e6490c0-9abc-498a-8d99-899adc3be851",
        name: "Xis do Bom",
        city: "São Jerônimo",
        email: "toyshop3@gmail.com",
        password: "123456",
        phone: "51912341234",
        description: "Melhor loja de brinquedos de Charqueadas",
        position: "-29.9639185, -51.7226042",
        urgency: true
      }
    ],
  });

  console.log("Seed data inserted successfully.");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
