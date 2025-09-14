import { createLazyFileRoute } from "@tanstack/react-router";
import SignIn from "../components/SignIn";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <p>Welcome to the grocery list builder. What do you want to eat?</p>
      <SignIn />
    </div>
  );
}
