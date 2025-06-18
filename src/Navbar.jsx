import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <section>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/allrecipes" className="text-link">
              Recipe Box
            </Link>
          </li>
          <li>
            <Link to="/ingredients" className="text-link">
              Ingredients
            </Link>
          </li>
          <li>
            <Link to="/groceries" className="text-link">
              Grocery List
            </Link>
          </li>
          <li>
            <Link to="/planner" className="text-link">
              Meal Planner
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
