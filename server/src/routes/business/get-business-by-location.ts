import { FastifyInstance } from "fastify";
import { SplitPosition } from "../../utils/split-position";
import { prisma } from "../../lib/prisma";

export async function GetBusinessByLocation(app: FastifyInstance) {
  /*
  - Frontend pede localizacao
  - Frontend (JS) usa api nativa do JS Geolocation
  - Frontend pega o resultado da api geolaction e envia para esta rota no backend
  */

  app.get("/business/:city/:position/:range", async (request, reply) => {
    const { position, city, range }: any = request.params;
    const earthRadius = 6371;

    const business = await (city == null
      ? prisma.business.findMany()
      : prisma.business.findMany({
          where: { city },
        })
    );

    // se não tiver range e nem cidade especificada retornar tudo
    if (range == 0) {
      return reply.send(business);
    }

    const businessesInRange = business.filter((b) => {
      if (b.position) {
        const [bLat, bLong] = SplitPosition(b.position); 
        const [uLat, uLong] = SplitPosition(position); 

        // Converter graus para radianos
        const rad = (deg: any) => (deg * Math.PI) / 180;
        const dLat = rad(bLat - uLat);
        const dLon = rad(bLong - uLong);

        // Formula Harversine
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(rad(uLat)) * Math.cos(rad(bLat)) * Math.sin(dLon / 2) ** 2;

        const distance =
          2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return distance <= parseFloat(range);
      }
      return false;
    });

    return reply.send(businessesInRange);
  });
}
