import { prisma } from "~/db";
import { Patient, User } from "@prisma/client";

type AddPatientToCustomerParams = {
  customerId: string;
  patientName: string;
};

export const addPatientToCustomer = async ({
  customerId,
  patientName,
}: AddPatientToCustomerParams): Promise<Patient> => {
  return await prisma.patient.create({
    data: {
      name: patientName,
      owner: {
        connect: {
          id: customerId,
          role: "PATIENT_SIDE",
        },
      },
    },
  });
};
