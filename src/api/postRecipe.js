export default async function postRecipe(recipe) {
  const response = await fetch("/recipe/create-recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Could not save recipe");
  }

  return response.json();
}
