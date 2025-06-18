import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <p>Welcome to the grocery list builder. What do you want to eat?</p>
    </div>
  );
}
