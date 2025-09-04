"use server";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "./users";
import { ActionAgent, UserFormData } from "./Tayp";
import { AgentcontactSchema } from "./schema";
import prisma from "./db";
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
  const cuntry = await db.areacuntry.findMany({
    take: 6,
  });
  return cuntry;
};
export const fetsharyacuntryname = async ({ name }: { name: string }) => {
  const areacuntry = await db.areacuntry.findFirst({
    where: {
      name: name,
    },
  });
  return areacuntry;
};
export const fetshAgenys = async () => {
  const Agents = await db.listing.findMany({
    select: {
      agents: true,
    },
  });
  return Agents;
};
//action contact Agent Listiing
export const SendAgentListing = async (
  prevState: ActionAgent | null,
  formData: FormData
): Promise<ActionAgent> => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;

  const UserData: UserFormData = {
    FirstName: formData.get("FirstName") as string,
    LastName: formData.get("LastName") as string,
    email: formData.get("email") as string,
    userId: userId as string,
    agentEmail: formData.get("agentemail") as string,
    listingId: formData.get("listingId") as string,
    Phone: Number(formData.get("Phone")),
  };

  // Validate the form data
  const validatedData = AgentcontactSchema.safeParse(UserData);
  if (!validatedData.success) {
    return {
      success: false,
      Data: {
        FirstName: UserData.FirstName,
        LastName: UserData.LastName,
        email: UserData.email,
        Phone: UserData.Phone,
      },
      message: "Please fix the errors in the form",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    await db.interest.create({
      data: {
        name: UserData.FirstName + " " + UserData.LastName,
        email: UserData.email,
        userId: UserData.userId,
        agentemail: UserData.agentEmail ?? "",
        listingId: UserData.listingId,
      },
    });

    return {
      success: true,
      message: "Successfully Contact Agent!",
    };
  } catch (error) {
    console.error("Error creating Interest:", error);

    return {
      success: false,
      message: "Something went wrong while contacting the agent.",
    };
  }
};
///text form react ui
export const SendAgentListinge = async (
  FirstName: string,
  LastName: string,
  phone: number,
  email: string
) => {
  const UserData: UserFormData = {
    FirstName: FirstName as string,
    LastName: LastName as string,
    email: email as string,
    Phone: Number(phone),
  };
  // Validate the form data
  const validatedData = AgentcontactSchema.safeParse(UserData);
  if (!validatedData.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
    };
  }
  return {
    success: true,
    message: "Successfully Contact Agent !",
  };
};
///sersh query
export const SershQuerlisting = async (value: string) => {
  type RawCursorResult = {
    cursor: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firstBatch: any[];
    };
  };
  if (value == "") return { listing: [], citys: [] };
  const city = (await prisma.$runCommandRaw({
    distinct: "listing",
    key: "location.city",
    query: {
      $or: [{ "location.city": { $regex: value, $options: "i" } }],
    },
  })) as RawCursorResult;
  const liset = (await prisma.$runCommandRaw({
    find: "listing",
    filter: {
      $or: [
        { "location.street_address": { $regex: value, $options: "i" } },
        { "location.county": { $regex: value, $options: "i" } },
      ],
    },

    limit: 5,
  })) as RawCursorResult;
  const citys = city.values;
  const listing = liset.cursor.firstBatch;
  return { listing, citys };
};
export const SershQuerCatylistirng = async (value: string) => {
  type RawCursorResult = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    cursor: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firstBatch: any[];
    };
  };
  const city = (await prisma.$runCommandRaw({
    distinct: "listing",
    key: "location.city",
    query: {
      $or: [{ "location.city": { $regex: value, $options: "i" } }],
    },
  })) as RawCursorResult;
  const citys = city.values;
  return citys;
};
///Fetsh Query filtring LIsting

export const FetshSershListoning = async ({
  Page = 1,
  Minimam,
  Maximam,
  Bads,
  Baths,
  status,
  listing_type,
  city,
  address,
  limit = 6,
}: {
  Page?: number;
  Minimam?: number;
  Maximam?: number;
  Bads?: string;
  Baths?: string;
  status?: string;
  listing_type?: string;
  city?: string;
  address?: string;
  limit?: number;
}) => {
  const skip = (Page - 1) * limit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  if (Minimam !== undefined || Maximam !== undefined) {
    filter.price = {};
    if (Minimam !== undefined) filter.price.$gte = Number(Minimam);
    if (Maximam !== undefined) filter.price.$lte = Number(Maximam);
  }
  if (Bads) filter.bedrooms = { $gte: Number(Bads.replace("+", "")) };
  if (Baths) filter.bathrooms = { $gte: Number(Baths.replace("+", "")) };
  if (status) filter.listing_status = { $regex: status, $options: "i" };
  if (listing_type !== undefined) {
    if (listing_type === "Rentals") {
      filter.is_rental = true;
    } else {
      filter.is_rental = false;
    }
  }
  if (city) filter["location.city"] = { $regex: city, $options: "i" };
  if (address)
    filter["location.street_address"] = { $regex: address, $options: "i" };
  const total = await db.listing.count();
  // query listings
  const listing = await db.$runCommandRaw({
    find: "listing",
    filter,
    skip,
    limit,
    sort: { createdAt: -1 }, // latest first
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listings = listing?.cursor?.firstBatch.map((doc: any) => ({
    ...doc,
    id: doc._id.$oid,
  }));
  return {
    listings: listings,
    metadata: { total: total, totalPage: Math.ceil(total / limit), Page: Page },
  };
};
