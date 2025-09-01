export default async function postGroceryList(groceryListRequest) {
  const response = await fetch("mealplanner/meal-plan/generate-grocery-list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(groceryListRequest),
  });
  const data = await response.json();
  return data;
}
