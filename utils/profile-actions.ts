"use server";
import db from "./db";
import { getSession } from "./users";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface UpdateProfileState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function updateUserProfileAction(
  prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      redirect("/login");
    }

    const name = formData.get("name") as string;

    // Validate inputs
    if (!name || name.trim().length === 0) {
      return {
        success: false,
        message: "Name is required",
        errors: {
          name: ["Name cannot be empty"],
        },
      };
    }

    if (name.length > 100) {
      return {
        success: false,
        message: "Name is too long",
        errors: {
          name: ["Name must be less than 100 characters"],
        },
      };
    }

    // Update user in database
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name.trim(),
      },
    });

    // Revalidate profile page
    revalidatePath("/account/profile");

    console.log(
      `✅ [PROFILE] User profile updated - ID: ${userId}, Name: ${updatedUser.name}`
    );

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("❌ [PROFILE] Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}
