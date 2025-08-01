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

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <KeyIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">LockerPro</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <a href="#features">Features</a>
          </Button>
          <Button variant="ghost">Pricing</Button>
          <UserMenu />
          <ModeToggle />
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
              <div className="flex flex-col space-y-3 mt-6">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#features">Features</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Pricing
                </Button>
                <div className="pt-4 border-t">
                  <UserMenu />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar