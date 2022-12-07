import Link from "next/link";

function Header() {
  return (
    <div className="navbar">
      <Link href="/" passHref><button className="btn btn-ghost normal-case text-xl">everything</button></Link>
    </div>
  );
}

export default Header;
