import { prisma } from "~/db";
import { User } from "@prisma/client";

type ConnectCustomerToProviderParams = {
  providerId: string;
  customerId: string;
};

export const addCustomerToProvider = async ({
  providerId,
  customerId,
}: ConnectCustomerToProviderParams): Promise<User> => {
  return await prisma.user.update({
    where: {
      id: customerId,
      role: "PATIENT_SIDE",
    },
    data: {
      healthcareProvidedBy: {
        connect: {
          id: providerId,
          role: "HEALTH_SIDE",
        },
      },
    },
  });
};
