import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import { createServerFn } from "@tanstack/start";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { prisma } from "~/db";
import { mergeAll } from "remeda";
import { PatientData } from "@prisma/client";

const $getPatients = createServerFn({ method: "GET" })
  .middleware([requireUserMiddleware])
  .handler(async ({ context: { user } }) => {
    const patients = await prisma.patient.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        PatientData: true,
      },
    });

    return patients;
  });

export const Route = createFileRoute("/dashboard/customer/pets")({
  component: RouteComponent,
  loader: async () => {
    const patients = await $getPatients();

    return {
      patients,
    };
  },
});

function RouteComponent() {
  const { patients } = useLoaderData({ from: "/dashboard/customer/pets" });

  if (!patients.length) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
        <h1 className="mt-4 font-bold text-3xl text-gray-800">No pets found</h1>
        <p className="mt-2 text-gray-600">You haven't added any pets yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => {
          const patientData = patient.PatientData;
          const newestData = mergeAll(patient.PatientData) as PatientData;
          return (
            <div
              key={patient.id}
              className="bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-shadow"
            >
              <h2 className="mb-2 font-semibold text-xl">
                {patient?.name || "Unnamed Pet"}
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>Species: {newestData?.species || "N/A"}</p>
                <p>Breed: {newestData?.breed || "N/A"}</p>
                <p>
                  Birth Date:{" "}
                  {newestData?.birthDate?.toLocaleDateString() || "N/A"}
                </p>
                <p>
                  Weight:{" "}
                  {newestData?.weight ? `${newestData.weight} kg` : "N/A"}
                </p>
                <p>Sex: {newestData?.sex || "N/A"}</p>
                <p>Microchip ID: {newestData?.microchipId || "N/A"}</p>
                <p>Insurance Info: {newestData?.insurance || "N/A"}</p>
                <p>Allergies: {newestData?.allergies || "N/A"}</p>
                <p>Medications: {newestData?.medications || "N/A"}</p>
                <p>
                  Emergency Contact: {newestData?.emergencyContact || "N/A"}
                </p>
                <p>Patient ID: {newestData?.patientId || "N/A"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
