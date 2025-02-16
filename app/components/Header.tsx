"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { data: session } = useSession();
  // const { showNotification } = useNotification();
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut();
      // showNotification("Signed out successfully 👍🏻", "success");
      toast({
        title: "Signed out successfully 👍🏻",
      });
    } catch {
      // showNotification("Failed to sign out ☹️", "error");
      toast({
        title: "Failed to sign out ☹️",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-6">
        <div className="flex flex-1">
          <Link
            href="/"
            prefetch={true}
            onClick={() => toast({
              title: "Welcome to LEGATO 😎",
              description: "The heartbeat of Music culture",
            })}
            className="flex items-center space-x-2 font-bold"
          >
            <Home className="h-5 w-5" />
            <span>LEGATO 🎵</span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              {session ? (
                <>
                  <DropdownMenuLabel>
                    {session.user?.email?.split("@")[0]}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/upload"
                        className="w-full cursor-pointer"
                        onClick={() => toast({
                          title: "Welcome to Admin Dashboard 🌟",
                          description: "You can upload videos here",
                        })}
                      >
                        Upload Video
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link
                    href="/login"
                    className="w-full cursor-pointer"
                    onClick={() => toast({
                      title: "Please sign in to continue 🚀",
                      description: "You need to sign in to access this feature",
                      action: <Link href={`/login`}><ToastAction altText="Login">Try again</ToastAction></Link>
                    })}
                  >
                    Login
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
    // <div className="navbar bg-base-300 sticky top-0 z-40">
    //   <div className="container mx-auto">
    //     <div className="flex-1 px-2 lg:flex-none">
    //       <Link
    //         href="/"
    //         className="btn btn-ghost text-xl gap-2 normal-case font-bold"
    //         prefetch={true}
    //         onClick={() =>
    //           showNotification("Welcome to Crescendo - The heartbeat of Music culture 😎", "info")
    //         }
    //       >
    //         <Home className="w-5 h-5" />
    //         Crescendo
    //       </Link>
    //     </div>
    //     <div className="flex flex-1 justify-end px-2">
    //       <div className="flex items-stretch gap-2">
    //         <div className="dropdown dropdown-end">
    //           <div
    //             tabIndex={0}
    //             role="button"
    //             className="btn btn-ghost btn-circle"
    //           >
    //             <User className="w-5 h-5" />
    //           </div>
    //           <ul
    //             tabIndex={0}
    //             className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
    //           >
    //             {session ? (
    //               <>
    //                 <li className="px-4 py-1">
    //                   <span className="text-sm opacity-70">
    //                     {session.user?.email?.split("@")[0]}
    //                   </span>
    //                 </li>
    //                 <div className="divider my-1"></div>

    //                 <li>
    //                   <Link
    //                     href="/upload"
    //                     className="px-4 py-2 hover:bg-base-200 block w-full"
    //                     onClick={() =>
    //                       showNotification("Welcome to Admin Dashboard 🌟", "info")
    //                     }
    //                   >
    //                     Video Upload
    //                   </Link>
    //                 </li>

    //                 <li>
    //                   <button
    //                     onClick={handleSignOut}
    //                     className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
    //                   >
    //                     Sign Out
    //                   </button>
    //                 </li>
    //               </>
    //             ) : (
    //               <li>
    //                 <Link
    //                   href="/login"
    //                   className="px-4 py-2 hover:bg-base-200 block w-full"
    //                   onClick={() =>
    //                     showNotification("Please sign in to continue 🚀", "info")
    //                   }
    //                 >
    //                   Login
    //                 </Link>
    //               </li>
    //             )}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
