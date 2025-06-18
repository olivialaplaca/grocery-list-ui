export default async function getAllRecipes() {
  const response = await fetch("/recipe/all");
  const data = await response.json();
  return data;
}
