const { PrismaClient } = require("@prisma/client");
const counties = require("./counties.json");
const prisma = new PrismaClient();
async function main() {
  for (const listing of counties) {
    await prisma.areaCuntry.create({
      data: listing,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
