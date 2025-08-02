import UserMenu from "./user-menu"
import { ModeToggle } from "./mode-toggle"
import { KeyIcon} from "lucide-react"
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
          <UserMenu />
          <ModeToggle />
        </div>


       
      </div>
    </nav>
  )
}

export default Navbar