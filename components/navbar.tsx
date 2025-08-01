import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import UserMenu from "./user-menu"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="fixed top-0  z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
         <Link href={"/"} className="flex items-center gap-2">
          <img src="/vercel.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-bold">Locker Pro</span>
         </Link>
          
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Button variant="ghost">Your Passwords</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost">Create New Password</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <UserMenu />
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar