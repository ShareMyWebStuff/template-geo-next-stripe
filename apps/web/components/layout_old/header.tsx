import HeaderBtns from "./HeadBtns";
import { HeaderNav } from "./HeaderNav";
import Logo from "./Logo";


export default function Header() {
  return (
    <header className="bg-blue-normal pt-8 text-white-800">
      <div className="m-auto max-w-7xl w-11/12 ">
        <div className="flex items-center justify-between sm:border-b-1 border-white-500 border-solid pb-4 md:pb-4">

          <span className="hover:cursor-pointer">
            <Logo />
          </span>

          <div className="flex items-center justify-between">
            <HeaderBtns />
          </div>

        </div>
        <div className="sm:block hidden py-2">
            <HeaderNav source={"a"} manualExpand={false} />
        </div>

      </div>
    </header>
  )
}
