import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function createAnswer(app: FastifyInstance) {
  app.post('/answers', async (request, reply) => {
    const { formId, answers }: any = request.body;

    if (!formId || !answers || !Array.isArray(answers) || answers.length === 0) {
      return reply.status(400).send({ error: "formId e answers are required." });
    }

    try {
      const form = await prisma.form.findUnique({
        where: { id: formId },
        include: { questions: true },
      });

      if (!form) {
        return reply.status(404).send({ error: "Form not found" });
      }

      const validQuestionIds = form.questions.map(q => q.id);
      const invalidAnswers = answers.filter(answer => !validQuestionIds.includes(answer.questionId));

      if (invalidAnswers.length > 0) {
        return reply.status(400).send({ error: "Um ou mais questões não pertencem ao formulário." });
      }

      const createdAnswers = await prisma.answer.createMany({
        data: answers.map(answer => ({
          questionId: answer.questionId,
          formId: formId,
          response: answer.response,
        })),
      });

      return reply.status(201).send({ message: "Respostas registradas", createdAnswers });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Internal server error" });
    }
  });
}
