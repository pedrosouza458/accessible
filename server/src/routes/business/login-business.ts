import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { compare } from "bcryptjs";

export function LoginBusiness(app: FastifyInstance){
  app.post("/business/login", async (request, reply) => {
    const { email, password }: any = request.body;

    const businessFromEmail = await prisma.business.findMany({
      where: {
        email
      }
    })

    if(!businessFromEmail){
      return reply
      .status(401)
      .send({ error: "Email ou senha errada, tente novamente" });
    }

    const hashedPassword = businessFromEmail[0].password;

    const isPasswordValid = await compare(password, hashedPassword);

    if (!isPasswordValid) {
      // Return a 401 Unauthorized error if the password is invalid
      return reply
        .status(401)
        .send({ error: "Email ou senha errada, tente novamente" });
    }

    const token = await reply.jwtSign(
      {
        sub: businessFromEmail[0].id,
      },
      {
        sign: {
          expiresIn: "7d",
        },
      }
    );

    return reply.send({token})
  });
}