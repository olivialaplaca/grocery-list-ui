import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/mealplanner")({
  component: MealPlannerRoute,
});

function MealPlannerRoute() {
  return (
    <div className="meal-planner-page">
      <h2>What do you want to eat this week?</h2>
      <p>How many days shall we plan for?</p>
      <p>Do you always eat breakfast, lunch, and dinner?</p>
      <p>What about snacks and desserts?</p>
      <p>How many people shall we plan for?</p>
      <p>Any dietary restrictions we need to consider?</p>
    </div>
  );
}
