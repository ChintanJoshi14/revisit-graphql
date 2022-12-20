import Image from "next/image";

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <Image
              src="/logo.png"
              alt="this is a logo"
              width={35}
              height={20}
              className="mr-2"
            />
            <span className="ml-1">ProjectMgmt</span>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
