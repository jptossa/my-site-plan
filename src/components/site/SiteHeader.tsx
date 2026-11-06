import { MotionToggle } from "@/components/MotionToggle";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <div className="site-header__right">
          <NavLinks />
          <div className="site-header__tools">
            <MotionToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
