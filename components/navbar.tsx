import { Button } from "@/components/ui/button"
import UserMenu from "./user-menu"
import { ModeToggle } from "./mode-toggle"
import { KeyIcon, MenuIcon, XIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <KeyIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">LockerPro</span>
        </Link>

        <div className="flex items-center gap-4">
            <UserMenu/>
            <ModeToggle/>
        </div>
       

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <KeyIcon className="h-6 w-6 text-primary" />
                  <span>LockerPro</span>
                </SheetTitle>
              </SheetHeader>
           
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar