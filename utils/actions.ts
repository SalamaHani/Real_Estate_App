"use server";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "./users";
// const session = await auth.api.getSession({
//   headers: await headers(),
// });

export const Feauterdlistings = async () => {
  const faverd = await db.listing.findMany({
    take: 5,
  });
  return faverd;
};
export const fetchlistingById = async ({ id }: { id: string }) => {
  const listing = await db.listing.findUnique({
    where: {
      id: id,
    },
  });
  return listing;
};
export const users = async () => {
  return await db.listing.count();
};
///Favorite PRODUCTS Action
export const toggleFavoriteAction = async (prevState: {
  listingId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const session = await getSession();
  const user = session?.user;
  if (user === null) redirect("/login");
  const { listingId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      if (!session?.user?.id) {
        return { message: "User must be logged in to favorite a listing" };
      }
      await db.favorite.create({
        data: {
          listingId,
          userId: session.user?.id ?? "guest",
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from faves" : "Added to faves" };
  } catch (error) {
    return error;
  }
};
export const fetchFavoriteId = async ({ listingId }: { listingId: string }) => {
  const session = await getSession();
  const user = session?.user;
  if (user == null) redirect("/login");
  const favoreit = await db.favorite.findFirst({
    where: {
      listingId,
      userId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favoreit?.id || null;
};
export const fetshAraeacuntry = async () => {
  const cuntry = await db.areaCuntry.findMany({
    take: 6,
  });
  return cuntry;
};
export const fetshAgenys = async () => {
  const Agents = await db.listing.findMany({
    select: {
      agents: true,
    },
  });
  return Agents;
};
