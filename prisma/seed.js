const { PrismaClient } = require("@prisma/client");
const listings = require("./listings.json");
const prisma = new PrismaClient();
async function main() {
  for (const listing of listings) {
    await prisma.listing.create({
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
