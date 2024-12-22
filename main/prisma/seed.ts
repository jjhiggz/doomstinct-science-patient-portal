import { prisma } from "~/db";
import { createUser } from "~/routes/(auth)/-helpers/auth-utils.server";
import { addCustomerToProvider } from "./queries/add-customer-to-provider";
import { addPatientToCustomer } from "./queries/add-patient-to-customer";

const clearDb = async () => {
  console.log("🧹 Clearing database...");

  try {
    await prisma.patientData.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.customerData.deleteMany();
    await prisma.providerData.deleteMany();
    await prisma.passwordResetToken.deleteMany();
    await prisma.password.deleteMany();
    await prisma.user.deleteMany();
    console.log("✅ Cleared all tables");
  } catch (error) {
    console.error("Error clearing tables:", error);
  }
};

const seedUsers = async () => {
  console.log("🌱 Starting database seeding...");
  console.log("👨‍⚕️ Creating healthcare providers...");

  // Create healthcare provider
  const doomstinctProvider = await createUser({
    email: "doctor@doomstinct-science.com",
    password: "password123",
  });
  console.log("✅ Created Doomstinct provider");

  // Create provider for instinct-science.com
  const instinctProvider = await createUser({
    email: "doctor@instinct-science.com",
    password: "password123",
  });
  console.log("✅ Created Instinct provider");

  console.log("📋 Creating provider data for Instinct...");
  await prisma.providerData.create({
    data: {
      firstName: "Sarah",
      lastName: "Wilson",
      businessName: "Instinct Science",
      licenseNumber: "VSL-2024-1234",
      specialties: ["Small Animals", "Exotic Pets", "Preventive Care"],
      businessHours: "Mon-Fri 9:00-17:00",
      serviceLocations: ["123 Science Ave, Innovation City, ST 12345"],
      certifications: ["DVM", "Animal Behavior Specialist"],
      insuranceAccepted: ["PetCare Plus", "AnimalHealth Pro", "VetGuard"],
      staffSize: 15,
      emergencyService: true,
      rating: 4.8,
      user: {
        connect: {
          id: instinctProvider.id,
        },
      },
    },
  });
  console.log("✅ Created Instinct provider data");

  console.log("👥 Creating patients for Doomstinct...");
  // Create patients for doomstinct provider
  const doomstinctCustomers = await Promise.all([
    createUser({
      email: "patient1@customer.com",
      password: "password123",
    }),
    createUser({
      email: "patient2@customer.com",
      password: "password123",
    }),
    createUser({
      email: "patient3@customer.com",
      password: "password123",
    }),
  ]);
  console.log("✅ Created Doomstinct patients");

  console.log("🔗 Connecting patients to Doomstinct provider...");
  // Connect doomstinct patients to provider
  await Promise.all(
    doomstinctCustomers.map((customer) =>
      addCustomerToProvider({
        customerId: customer.id,
        providerId: doomstinctProvider.id,
      })
    )
  );
  console.log("✅ Connected Doomstinct patients");

  console.log("👥 Creating customers for Instinct...");
  // Create patients for instinct provider
  const instinctCustomers = await Promise.all([
    createUser({
      email: "alice.johnson@customer.com",
      password: "password123",
    }),
    createUser({
      email: "bob.wilson@customer.com",
      password: "password123",
    }),
    createUser({
      email: "carol.smith@customer.com",
      password: "password123",
    }),
  ]);

  await Promise.all(
    instinctCustomers.map((customer) =>
      addCustomerToProvider({
        customerId: customer.id,
        providerId: instinctProvider.id,
      })
    )
  );

  console.log("🐾 Creating pets for Alice...");
  const aliceId = instinctCustomers[0].id;
  await prisma.customerData.create({
    data: {
      firstName: "Alice",
      lastName: "Johnson",
      address: "123 Main Street, Anytown, USA",
      phone: "555-0100",
      preferences: "Prefers email communication",
      billingInfo: "Credit card ending in 4242",
      timezone: "America/New_York",
      language: "English",
      marketing: true,
      userId: aliceId,
    },
  });

  const alicePets = await Promise.all([
    addPatientToCustomer({
      customerId: aliceId,
      patientName: "Max",
    }),
    addPatientToCustomer({
      customerId: aliceId,
      patientName: "Luna",
    }),
  ]);

  await Promise.all([
    prisma.patientData.create({
      data: {
        species: "Dog",
        breed: "Golden Retriever",
        birthDate: new Date("2020-03-15"),
        weight: 32.5,
        sex: "Male",
        microchipId: "985141553447788",
        allergies: "Chicken",
        medications: ["Heartworm prevention"],
        medicalNotes: "Healthy and active dog, regular checkups up to date",
        dietaryNeeds: "Grain-free diet",
        isNeutered: true,
        insurance: "PetPlan Premium Coverage",
        emergencyContact: "John Johnson (Brother) - 555-0123",
        patientId: alicePets[0].id,
      },
    }),
    prisma.patientData.create({
      data: {
        species: "Cat",
        breed: "Siamese",
        birthDate: new Date("2021-06-20"),
        weight: 4.2,
        sex: "Female",
        microchipId: "985141553447789",
        allergies: "None known",
        medications: [],
        medicalNotes: "Indoor cat, slightly overweight",
        dietaryNeeds: "Weight management formula",
        isNeutered: true,
        insurance: "PetPlan Basic Coverage",
        emergencyContact: "John Johnson (Brother) - 555-0123",
        patientId: alicePets[1].id,
      },
    }),
  ]);
  console.log("✅ Created pets for Alice");

  console.log("✅ Created Instinct customers");

  return {
    doomstinctProvider,
    doomstinctCustomers,
    instinctProvider,
    instinctCustomers,
  };
};

export const seed = async () => {
  try {
    console.log("🚀 Starting seeding process...");
    console.log("🧹 Clearing existing database...");
    await clearDb();
    console.log("✅ Database cleared");
    const seededData = await seedUsers();
    console.log("🎉 Database seeded successfully:", seededData);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log("👋 Database connection closed");
  }
};

seed();
