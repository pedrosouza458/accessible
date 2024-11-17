import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetBusinessById(app: FastifyInstance) {
  app.get("/business/:id", async (request, reply) => {
    const { id }: any = request.params;
    const business = await prisma.business.findMany({
      where: {
        id,
      },
    });
    return reply.send({business});
  });
}
