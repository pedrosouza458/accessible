import { FastifyInstance } from "fastify";
import { SplitPosition } from "../../utils/split-position";
import { prisma } from "../../lib/prisma";

export async function GetBusinessByLocation(app: FastifyInstance) {
  /*
  - Frontend pede localizacao
  - Frontend (JS) usa api nativa do JS Geolocation
  - Frontend pega o resultado da api geolaction e envia para esta rota no backend
  */
 
  app.get("/business/:lat/:long", async (request, reply) => {
    const { lat, long }: any = request.params;
    const { city, range }: any = request.query; // Use query parameters for optional fields
    const earthRadius = 6371; // Earth radius in kilometers
    const defaultRange = 50; // Default 50km range if not specified
    const searchRange = range ? parseFloat(range) : defaultRange;

    const business = await prisma.business.findMany({
      where: city ? { city } : undefined
    });

    const businessesInRange = business.filter((b) => {
      if (b.lat && b.long) {
        // Convert degrees to radians
        const rad = (deg: any) => (deg * Math.PI) / 180;
        const dLat = rad(Number(b.lat) - Number(lat));
        const dLon = rad(Number(b.long) - Number(long));

        // Haversine formula
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(rad(Number(lat))) * 
          Math.cos(rad(Number(b.lat))) * 
          Math.sin(dLon / 2) ** 2;

        const distance =
          2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return distance <= searchRange;
      }
      return false;
    });

    return reply.send(businessesInRange);
  });
}