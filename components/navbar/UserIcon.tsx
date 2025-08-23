import { setstring } from "@/utils/format";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";

async function UserIcon() {
  const { data: session } = authClient.useSession();
  const username = session?.user.name;
  if (!session)
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{setstring(username ?? "")}</AvatarFallback>
      </Avatar>
      // <LuUserRound className="w-6 h-6 bg-primary rounded-full dark:text-black text-white" />
    );
  return null;
}
export default UserIcon;
