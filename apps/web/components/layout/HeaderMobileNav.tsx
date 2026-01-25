import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { HiBars3 } from "react-icons/hi2";
import { HeaderNav } from "./HeaderNav";
import Logo from "./Logo";
import { Separator } from "@radix-ui/react-separator";

const HeaderMobileNav = () => {

  return (
    <nav className="sm:hidden">

      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-2" variant="offWhiteOutline">
            <HiBars3 className="w-5! h-5!" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-blue text-off-white p-4">
          <SheetHeader>
            <SheetTitle><Logo session={null}/></SheetTitle>
            <SheetDescription>Empowering students to achieve more</SheetDescription>
          </SheetHeader>
          <Separator className="h-px bg-off-white"/>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <HeaderNav source={"m"} manualExpand={true} />
          </div>
        </SheetContent>
      </Sheet>

    </nav>
  );
};

export default HeaderMobileNav;
