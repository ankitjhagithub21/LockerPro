import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import UserMenu from "./user-menu"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { KeyIcon } from "lucide-react"

const Navbar = () => {
  return (
   <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-0 px-4">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <KeyIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">LockerPro</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" >
               <Button variant="ghost">Features</Button>
            </a>
            <Button variant="ghost">Pricing</Button>
            <UserMenu/>
            <ModeToggle/>
          </div>
          
        </div>
      </nav>
  )
}

export default Navbar