import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetBusiness(app: FastifyInstance){
  app.get("/business", async (_, reply) => {
    const business = await prisma.business.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc"
      }
    });
    return reply.send(business);
  });
}