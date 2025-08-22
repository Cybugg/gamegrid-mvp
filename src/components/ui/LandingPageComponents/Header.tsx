import { Link } from "react-router-dom";
import Hero from "./Hero";
import Button from "./Button";
const Header = function () {
  return (
    <section>
      <section className="flex justify-between align-middle font-oxanium">
        <div>
          <h3 className="bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)] bg-clip-text text-transparent text-2xl font-bold ">
            GameGrid
          </h3>
        </div>
        <div className="flex gap-12 text-#BBB1A5 text-base font-medium">
          <Link
            to={"/"}
            className="bg-[linear-gradient(90deg,#F88A01_-0.1%,#F66E14_92.2%)] bg-clip-text text-transparent  "
          >
            Home
          </Link>
          <Link to={"/"}>GameLobby</Link>
          <Link to={"/"}>Dashboard</Link>
          <Link to={"/"}>Whitepaper</Link>
        </div>
        <Button to="/index">Connect Wallet</Button>
      </section>

      <Hero />
    </section>
  );
};

export default Header;
