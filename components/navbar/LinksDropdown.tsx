import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { setstring } from "@/utils/format";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LuAlignLeft } from "react-icons/lu";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
// import UserIcon from "./UserIcon";
import { Logout } from "../logout";
import { Session } from "@/lib/auth";
import Link from "next/link";
function LinksDropdown({ session }: { session: Session | null }) {
  const username = session?.user.name;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px] dark:hover:bg-muted   hover:bg-muted ">
          <LuAlignLeft className="w-6 h-6 text-primary" />
          {session ? (
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="text-primary">{setstring(username ?? "")}</AvatarFallback>
            </Avatar>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {!session ? (
          <div>
            <DropdownMenuItem>
              <Link href="/login">
                <button className="w-full text-left">Login</button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signup">
                <button className="w-full text-left">Signup</button>
              </Link>
            </DropdownMenuItem>
          </div>
        ) : (
          <div>
            {links.map((link) => {
              if (link.label === "dashboard") return null;
              return (
                <DropdownMenuItem key={link.href}>
                  <Link href={link.href} className="capitalize w-full">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />

            {/* Admin Panel Link - Only for admin */}
            {session?.user?.email === "salamhani697@gmail.com" && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
