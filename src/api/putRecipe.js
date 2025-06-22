export default async function putRecipe(recipe) {
  const response = await fetch("/recipe/update-recipe", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Could not save recipe");
  }

  return response.json();
}
