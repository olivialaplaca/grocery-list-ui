import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getAllRecipes from "../api/getAllRecipes";
import RecipeForm from "../RecipeForm";
import Recipe from "../Recipe";

export const Route = createLazyFileRoute("/allrecipes")({
  component: RecipesRoute,
});

function RecipesRoute() {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [recipetoView, setRecipetoView] = useState(null);
  const { isLoading, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
    staleTime: 30000,
  });

  function toggleAddRecipeForm() {
    setShowAddRecipeForm((prevShow) => !prevShow);
  }

  function viewRecipe(recipeId) {
    setRecipetoView(() => data.find((recipe) => recipe.recipeId === recipeId));
  }

  return (
    <>
      <h3>Recipes</h3>
      <button onClick={toggleAddRecipeForm}>Add recipe</button>
      {showAddRecipeForm ? <RecipeForm /> : null}
      {data ? (
        <ul>
          {data.map((recipe) => (
            <li
              key={recipe.recipeId}
              onClick={() => viewRecipe(recipe.recipeId)}>
              {recipe.name}
            </li>
          ))}
          {recipetoView ? (
            <div className="view-recipe-target">
              <Recipe key={recipetoView.recipeId} recipe={recipetoView} />
            </div>
          ) : null}
        </ul>
      ) : null}
    </>
  );
}
