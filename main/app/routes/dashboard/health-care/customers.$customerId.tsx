import { PatientData } from "@prisma/client";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { mergeAll } from "remeda";
import { z } from "zod";
import { prisma } from "~/db";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { validateWithZod } from "~/utils/validateWithZod";
import dayjs from "dayjs";
import { Card } from "~/shadcn/components/ui/card";

export const $getCustomerData = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(
    validateWithZod(
      z.object({
        customerId: z.string(),
      })
    )
  )
  .handler(async ({ context: { user }, data }) => {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id: data.customerId,
        healthcareProvidedBy: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        CustomerData: true,
        Patient: {
          include: {
            PatientData: true,
          },
        },
      },
    });
  });

export const Route = createFileRoute(
  "/dashboard/health-care/customers/$customerId"
)({
  component: RouteComponent,
  loader: ({ params: { customerId } }) => {
    return $getCustomerData({ data: { customerId } });
  },
});

function RouteComponent() {
  const customer = useLoaderData({
    from: "/dashboard/health-care/customers/$customerId",
  });

  return (
    <div className="p-4">
      <h2 className="mb-4 font-bold text-2xl">Customer Information</h2>
      <Card className="p-10">
        <div className="gap-4 grid grid-cols-2">
          <div>
            <p className="font-semibold">Name:</p>
            <p>
              {customer.CustomerData?.firstName}{" "}
              {customer.CustomerData?.lastName}
            </p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{customer.email}</p>
          </div>
          {customer.CustomerData && (
            <>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>{customer.CustomerData.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p>{customer.CustomerData.address}</p>
              </div>
            </>
          )}
        </div>
      </Card>
      <div className="mt-5">
        <h2 className="mb-4 font-bold text-2xl">Patients</h2>
        <div className="gap-4 grid grid-cols-3">
          {customer.Patient.map((patient) => {
            const patientDataMerged = mergeAll(
              patient.PatientData
            ) as PatientData;
            return (
              <Card key={patient.id} className="p-4">
                <h3 className="mb-2 font-semibold">{patient.name}</h3>
                {patient.PatientData && (
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Species: </span>
                      {patientDataMerged.species}
                    </p>
                    <p>
                      <span className="font-medium">Breed: </span>
                      {patientDataMerged.breed}
                    </p>
                    <p>
                      <span className="font-medium">Age: </span>
                      {dayjs().diff(patientDataMerged.birthDate, "year")} years
                    </p>
                    <p>
                      <span className="font-medium">Weight: </span>
                      {patientDataMerged.weight} kg
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
