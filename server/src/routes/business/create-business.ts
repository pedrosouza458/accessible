import { Business } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

interface CreateBusinessRequest {
  name: string;
  city: string;
  phone: string;
  description: string;
  logo: string;
  lat: string;
  long: string;
  email: string;
  password: string;
  urgency: boolean;
}

export async function CreateBusiness(app: FastifyInstance) {
  app.post("/business", async (request, reply) => {
    const {
      name,
      city,
      phone,
      description,
      logo,
      lat,
      long,
      email,
      password,
      urgency,
    } = request.body as CreateBusinessRequest;
    const hashedPassword = await hash(password, 6);
    const business = await prisma.business.create({
      data: {
        name,
        phone,
        city,
        description,
        logo,
        lat,
        long,
        email,
        password: hashedPassword,
        urgency,
      },
    });
    if (business) {
      return reply.send(business);
    }
    return reply.send("Erro");
  });
}
