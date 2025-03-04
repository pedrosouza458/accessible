import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetBusinessById(app: FastifyInstance) {
  app.get("/business/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const business = await prisma.business.findMany({
      where: {
        id,
      },
    });
    return reply.send(business);
  });
}
