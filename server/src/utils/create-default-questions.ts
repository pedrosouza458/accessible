import { prisma } from "../lib/prisma";

export async function CreateDefaultQuestions(formId: string) {
  const questions = await prisma.question.createMany({
    data: [
      {
        formId,
        title: "Qual seu nome completo?",
        optional: false,
        global: true,
      },
      {
        formId,
        title: "Qual seu telefone?",
        optional: false,
        global: true,
      },
      {
        formId,
        title: "Qual sua idade?",
        optional: false,
        global: true,
      },
    ],
  });
  return questions;
}
