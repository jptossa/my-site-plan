import { Logo } from "./Logo";
import { SiteMenu } from "./SiteMenu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <SiteMenu />
      </div>
    </header>
  );
}
