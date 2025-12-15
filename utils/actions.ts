"use server";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "./users";
import {
  ActionAgent,
  ActionUserReview,
  ActionUserSeavd,
  RevierFormData,
  UserFormData,
  UserFormDataSaved,
} from "./Tayp";
import { AgentcontactSchema, SavedcontactSchema } from "./schema";
import prisma from "./db";
import { cookies } from "next/headers";
import { ListingAgents } from "@prisma/client";
import { console } from "inspector";
import { checkSavedSearchForUser } from "@/lib/saved-search-helper";

// const session = await auth.api.getSession({
//   headers: await headers(),
// });
///convartpriceAction
export async function setCurrency(currency: string) {
  (await cookies()).set("currency", currency, {
    path: "/",
    httpOnly: false, // client can read
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

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
//fetch all fieivaret
export const faveretlisting = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;
  const faveretlisting = await db.favorite.findMany({
    where: { userId },
    include: { listing: true },
  });
  return faveretlisting;
};
// export const getListingFav = async ({ id }: { id: string }) => {
//   const listing = await db.listing.findFirst({
//     where: {
//       id,
//     },
//   });
//   return listing
// };
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
        userId: UserData.userId!,
        agentemail: UserData.agentEmail ?? "",
        listingId: UserData.listingId,
        createdAt: new Date(),
      },
    });
    return {
      success: true,
      message: "Successfully Contact Agent!",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
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
// export const SershQuerlisting = async (value: string) => {
//   type RawCursorResult = {
//     cursor: {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       firstBatch: any[];
//     };
//   };

//   if (value === "") return { listing: [], citys: [] };
//   const city = (await prisma.$runCommandRaw({
//     distinct: "listing",
//     key: "location.city",
//     query: {
//       $or: [{ "location.city": { $regex: value, $options: "i" } }],
//     },
//   })) as RawCursorResult;
//   const liset = (await prisma.$runCommandRaw({
//     find: "listing",
//     filter: {
//       $or: [
//         { "location.street_address": { $regex: value, $options: "i" } },
//         { "location.county": { $regex: value, $options: "i" } },
//       ],
//     },

//     limit: 5,
//   })) as RawCursorResult;
//   const citys = city.values ;
//   const listing = liset.cursor.firstBatch;
//   return { listing, citys };
// };

export const SershQuerlisting = async (value: string) => {
  type RawFindResult = {
    cursor: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firstBatch: any[];
    };
  };

  type RawDistinctResult = {
    values: string[];
    ok: number;
  };
  if (value === "") return { listing: [], citys: [] };

  // DISTINCT: find unique cities
  const city = (await prisma.$runCommandRaw({
    distinct: "listing",
    key: "location.city",
    query: {
      $or: [{ "location.city": { $regex: value, $options: "i" } }],
    },
  })) as RawDistinctResult;

  // FIND: get listing results
  const liset = (await prisma.$runCommandRaw({
    find: "listing",
    filter: {
      $or: [
        { "location.street_address": { $regex: value, $options: "i" } },
        { "location.county": { $regex: value, $options: "i" } },
      ],
    },
    limit: 5,
  })) as RawFindResult;

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
  Status,
  listing_type,
  city,
  address,
  limit = 8,
}: {
  Page?: number;
  Minimam?: number;
  Maximam?: number;
  Bads?: string;
  Baths?: string;
  Status?: string;
  listing_type?: string;
  city?: string;
  address?: string;
  limit?: number;
}) => {
  type RawFindResult = {
    cursor: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firstBatch: any[];
    };
  };
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
  if (Status) filter.listing_status = { $regex: Status, $options: "i" };
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
  const listing = (await db.$runCommandRaw({
    find: "listing",
    filter,
    skip,
    limit,
    sort: { createdAt: -1 }, // latest first
  })) as RawFindResult;
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

//page agents querys
export const FetshAllAgents = async ({
  Page = 1,
  limit = 11,
}: {
  Page?: number;
  limit?: number;
}) => {
  const skip = (Page - 1) * limit;
  const Agents = await db.listing.findMany({
    skip,
    take: limit,
    select: {
      agents: true,
    },
  });
  const agents: ListingAgents[] = [];
  Agents.map((Agent) => {
    Agent.agents.map((agent: ListingAgents) => {
      if (
        !agents.find((a: ListingAgents) => a.email === agent.email) &&
        agents.length < limit
      ) {
        agents.push(agent);
      }
    });
  });
  const total = await db.listing.count();
  return {
    Agents: agents,
    metadata: { total: total, totalPage: Math.ceil(total / limit), Page: Page },
  };
};

//fetsh agent is name
export const fetshAgentlisting = async ({ name }: { name: string }) => {
  const listings = await prisma.listing.findMany({
    select: { agents: true },
  });
  let foundAgent = null;
  const authername = decodeURIComponent(name);
  for (const listing of listings) {
    foundAgent = listing.agents.find((agent) => agent.first_name == authername);
    if (foundAgent) break;
  }
  return foundAgent;
};

export const SendAgent = async (
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
        userId: UserData.userId!,
        agentemail: UserData.agentEmail ?? "",
        createdAt: new Date(),
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
export const ListingOfAgents = async ({ email }: { email: string }) => {
  const listing = await db.listing.findMany({
    where: {
      agents: {
        some: {
          email: email,
        },
      },
    },
  });
  return listing;
};
///revioes
export const createReviewAction = async (
  prevState: ActionUserReview,
  formData: FormData
): Promise<ActionUserReview> => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;
  if (!user) redirect("/login");
  const UserData: RevierFormData = {
    comment: (formData.get("comment") as string) || "",
    listingId: formData.get("listingId") as string,
    authorName: (user.name || "Anonymous") as string,
    rating: Number(formData.get("rating")),
  };

  try {
    await db.review.create({
      data: {
        comment: UserData.comment || "No comment provided",
        authorName: UserData.authorName || "No comment provided",
        listingId: UserData.listingId,
        rating: BigInt(UserData.rating),
        userId: userId!,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return {
      success: true,
      message: "Successfully Reviews Listings!",
    };
  } catch (error) {
    console.error("Error creating Interest:", error);
    return {
      success: false,
      message: "Something went wrong while contacting the agent.",
    };
  }
};
//fetch  all reviews user
export const fetchlistingReviewsByUser = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;
  // const reviews = await db.review.findMany({
  //   where: { userId },
  //   select: {
  //     id: true,
  //     comment: true,
  //     rating: true,
  //     createdAt: true,
  //   },
  // });
  const reviews = await db.review.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      rating: true,
      authorName: true,
      comment: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return reviews;
};
//
export const deleteReview = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  const reviewId = formData.get("reviewId") as string;
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        userId: userId,
      },
    });
    revalidatePath("/account/reviews");
    return { message: "review deleted " };
  } catch (error) {
    return error;
  }
};
// export const SaveSearchUserAction = async (
//   prevState: ActionUserSeavd,
//   formData: FormData
// ): Promise<ActionUserSeavd> => {
//   const session = await getSession();
//   const user = session?.user;
//   const userId = user?.id;
//   if (!user) redirect("/login");
//   const UserData: UserFormDataSaved = {
//     url: formData.get("url") as string,
//     nameSearch: formData.get("nameSearch") as string,
//     email_frequency: formData.get("email_frequency") as string,
//   };
//   const params = new URLSearchParams(UserData.url);
//   const parmesAll = Object.fromEntries(params.entries());
//   const validatedData = SavedcontactSchema.safeParse(UserData);
//   if (!validatedData.success) {
//     return {
//       success: false,
//       Data: {
//         nameSearch: UserData.nameSearch,
//         email_frequency: UserData.email_frequency,
//         url: UserData.url,
//       },
//       message: "Please fix the errors in the form",
//       errors: validatedData.error.flatten().fieldErrors,
//     };
//   }
//   try {
//     await db.seavdsearchuser.create({
//       data: {
//         userId: userId as string,
//         url: validatedData.data.url as string,
//         qury: parmesAll,
//         nameSearch: validatedData.data.nameSearch as string,
//         email_frequency: validatedData.data.email_frequency as string,
//       },
//     });
//     return {
//       success: true,
//       message: "Successfully Saved Search!",
//     };
//   } catch (error) {
//     console.error("Error creating Interest:", error);
//     return {
//       success: false,
//       message: "Something went wrong while contacting the agent.",
//     };
//   }
// };
export const SaveSearchUserAction = async (
  prevState: ActionUserSeavd,
  formData: FormData
): Promise<ActionUserSeavd> => {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  const userId = user.id;

  const rawUrl = formData.get("url") as string;
  let fullUrl = rawUrl;
  if (!rawUrl.startsWith("http")) {
    fullUrl = "https://example.com/?" + rawUrl;
  }
  const UserData: UserFormDataSaved = {
    url: fullUrl,
    nameSearch: formData.get("nameSearch") as string,
    email_frequency: formData.get("email_frequency") as string,
  };

  const fixedUrl = fixUrl(UserData.url as string);
  let parsedQuery: Record<string, string> = {};

  try {
    const urlObj = new URL(fixedUrl);
    parsedQuery = Object.fromEntries(urlObj.searchParams.entries());
  } catch (err) {
    console.error("Invalid URL:", err);
    return {
      success: false,
      message: "The URL provided is invalid.",
      Data: UserData,
      errors: { url: ["Invalid URL"] },
    };
  }

  const validated = SavedcontactSchema.safeParse({
    ...UserData,
    url: fixedUrl,
  });

  if (!validated.success) {
    return {
      success: false,
      Data: UserData,
      message: "Please fix the errors in the form",
      errors: validated.error.flatten().fieldErrors,
    };
  }
  console.log(validated.data.url);
  console.log(validated);
  try {
    const saversersh = await db.seavdsearchuser.create({
      data: {
        userId: userId as string,
        url: validated.data.url,
        qury: parsedQuery,
        nameSearch: validated.data.nameSearch,
        email_frequency: validated.data.email_frequency,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    await checkSavedSearchForUser(userId, saversersh.id);
    return {
      success: true,
      message: "Successfully Saved Search!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while saving the search.",
    };
  }
};

function fixUrl(url: string): string {
  const parts = url.split("?");
  if (parts.length <= 2) return url; // URL already valid
  return parts[0] + "?" + parts.slice(1).join("&");
}

export const fetshAllSavedSearsh = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;
  const Savedshershe = await db.seavdsearchuser.findMany({
    where: {
      userId: userId,
    },
  });
  return Savedshershe;
};
export const deleteSeaved = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  const reviewId = formData.get("savedId") as string;
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;
  try {
    await db.seavdsearchuser.delete({
      where: {
        id: reviewId,
        userId: userId,
      },
    });
    revalidatePath("/account/s");
    return { message: "Saved Searsh Deleted !" };
  } catch (error) {
    return error;
  }
};
