import { Business } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { CreateBusinessForm } from "../../utils/create-business-form";
import { CreateDefaultQuestions } from "../../utils/create-default-questions";
import { hash } from "bcryptjs";

export async function CreateBusiness(app: FastifyInstance) {
  app.post("/business", async (request, reply) => {
    const { name, city, phone, description, logo, position, email, password, urgency }: any = request.body;
    const hashedPassword = await hash(password, 6);
    const business = await prisma.business.create({
      data: {
        name, 
        phone,
        city, 
        description, 
        logo, 
        position,
        email,
        password: hashedPassword,
        urgency
      }
    })
    let form = await CreateBusinessForm(business.id)
    let questions = await CreateDefaultQuestions(form.id)
    if(business && form && questions){
      return reply.send(business)
    }
    return reply.send("Erro")
  });
}
