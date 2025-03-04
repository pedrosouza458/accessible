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
    const { lat, long } = request.params as { lat: string; long: string };
    const { city, range, category } = request.query as {
      city: string;
      range: string;
      category: string;
    }; // Use query parameters for optional fields
    const earthRadius = 6371; // Earth radius in kilometers
    const defaultRange = 50; // Default 50km range if not specified
    const searchRange = range ? parseFloat(range) : defaultRange;
    // Build the filters dynamically
    const filters: any[] = [];

    city ?? filters.push({ city });

    if (category) {
      filters.push({
        categories: {
          some: {
            name: category,
          },
        },
      });
    }

    const business = await prisma.business.findMany({
      where: {
        AND: filters.length > 0 ? filters : undefined, // Apply filters if any
      },
      include: {
        categories: true,
      },
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
