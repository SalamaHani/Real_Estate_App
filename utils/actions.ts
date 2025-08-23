"use server";
import db from "./db";
// export const Feauterdlistings = async () => {
//   const faverd = await db.listing.findMany({
//     where: {
//       id: "68a19e80e9bd9275ee3fa35b",
//     },
//   });
//   return faverd;
// };
export const Feauterdlistings = async () => {
  const faverd = await db.listing.findMany({
    take: 5,
  });
  return faverd;
};
export const users = async () => {
  return await db.listing.count();
};
