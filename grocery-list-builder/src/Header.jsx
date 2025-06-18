import { Link } from "@tanstack/react-router";

export default function Header(props) {
  return (
    <>
      <Link to="/" className="text-link">
        <header className="header">
          <img src="/olive.png" alt="header logo" />
          <h1>Olive the Chef</h1>
        </header>
      </Link>
      <section>
        <h2>Welcome back, {props.user}!</h2>
      </section>
    </>
  );
}
