import { prisma } from "../lib/prisma";

export async function CreateBusinessForm(businessId: string){
  const form = await prisma.form.create({
    data: {
      businessId
    }
  })
  return form;
}