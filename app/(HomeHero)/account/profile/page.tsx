"use client";
import React, { useState, useEffect, useActionState } from "react";
import Image from "next/image";
import { getSession } from "@/utils/users";
import {
  updateUserProfileAction,
  UpdateProfileState,
} from "@/utils/profile-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Edit2, Save, X, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UserSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
}

const initialState: UpdateProfileState = {
  success: false,
  message: "",
};

export default function ProfilePage() {
  const [session, setSession] = useState<{ user: UserSession } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [state, action, isPending] = useActionState(
    updateUserProfileAction,
    initialState
  );

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userSession = await getSession();
        if (!userSession?.user) {
          window.location.href = "/login";
          return;
        }
        setSession(userSession as { user: UserSession });
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setIsEditing(false);
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state?.success, state?.message]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 py-8 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>

        {/* Error Alert */}
        {state?.message && !state.success && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
            <p className="text-sm font-medium">{state.message}</p>
          </div>
        )}

        {/* Profile Card */}
        <Card className="border-0 shadow-lg dark:bg-linear-to-br dark:from-card dark:via-card dark:to-muted">
          <CardHeader className="bg-linear-to-r pt-8 from-primary/10 to-primary/5 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                      priority
                    />
                  ) : (
                    <User className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {session?.user?.name || "User"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                size="lg"
                className="gap-2"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {isEditing ? (
              // Edit Form
              <form action={action} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    defaultValue={session?.user?.name || ""}
                    placeholder="Enter your full name"
                    className="w-full"
                    required
                  />
                  {state?.errors?.name && (
                    <p className="text-xs text-destructive mt-1">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={session?.user?.email || ""}
                    disabled
                    className="w-full opacity-60"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Profile Image URL
                  </label>
                  <Input
                    type="url"
                    name="image"
                    defaultValue={session?.user?.image || ""}
                    placeholder="https://example.com/image.jpg"
                    className="w-full"
                  />
                </div>

                {/* Save Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 gap-2"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              // View Profile
              <div className="space-y-6">
                {/* Name */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {session?.user?.name || "Not set"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Email
                      </p>
                      <p className="text-lg font-semibold text-foreground mt-1">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Profile Image
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {session?.user?.image ? "Custom Image" : "Default Avatar"}
                    </p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Member Since
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {new Date(
                        session.user.createdAt || Date.now()
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 p-6 rounded-lg bg-muted/30 border border-muted/50">
          <h3 className="font-semibold text-foreground mb-3">
            Account Security
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your account is secured with BetterAuth. For additional security
            options, please visit your account settings.
          </p>
          <Button variant="outline" className="gap-2">
            Security Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
