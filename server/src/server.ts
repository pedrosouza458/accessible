import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import { SplitPosition } from "./utils/split-position";
import { GetBusiness } from "./routes/business/get-business";
import { GetBusinessByLocation } from "./routes/business/get-business-by-location";
import { CreateBusiness } from "./routes/business/create-business";
import fastifyCors from "@fastify/cors";
import fasitfyJwt from "@fastify/jwt";
import { createAnswer } from "./routes/answer/create-answer";
import { LoginBusiness } from "./routes/business/login-business";
import { GetBusinessById } from "./routes/business/get-business-by-id";
const app = Fastify();
require("dotenv").config();

app.get("/", async (request, reply) => {
  return reply.send("oi");
});

app.register(fastifyCors);
app.register(fasitfyJwt, {
  secret: "1231241251251",
});
// Business
app.register(GetBusiness);
app.register(GetBusinessByLocation);
app.register(CreateBusiness)
app.register(LoginBusiness)
app.register(GetBusinessById)

// Answer
app.register(createAnswer);

app.listen({ port: 3001 }).then(() => {
  console.log("HTTP server running");
});
