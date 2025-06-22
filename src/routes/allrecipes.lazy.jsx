import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getAllRecipes from "../api/getAllRecipes";
import AddRecipeForm from "../AddRecipeForm";
import Recipe from "../Recipe";
import EditRecipeForm from "../EditRecipeForm";

export const Route = createLazyFileRoute("/allrecipes")({
  component: RecipesRoute,
});

function RecipesRoute() {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipetoView, setRecipetoView] = useState(null);
  const [editForm, setEditForm] = useState();
  const { isLoading, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
    staleTime: 30000,
  });

  function toggleAddRecipeForm() {
    setShowAddRecipeForm((prevShow) => !prevShow);
  }

  function viewRecipe(recipeId) {
    if (recipetoView === null) {
      setRecipetoView(() =>
        data.find((recipe) => recipe.recipeId === recipeId)
      );
      setShowRecipe(true);
    } else if (recipeId == recipetoView.recipeId) {
      setShowRecipe(false);
    } else {
      setRecipetoView(() =>
        data.find((recipe) => recipe.recipeId === recipeId)
      );
      setShowRecipe(true);
    }
  }

  function showEditForm() {
    setEditForm(true);
    //ideally, swap recipe with edit form
  }

  return (
    <div className="recipe-page">
      <div>
        <h3>Recipes</h3>
        <button onClick={toggleAddRecipeForm}>Add recipe</button>
        {showAddRecipeForm ? <AddRecipeForm mode="add" /> : null}
        {data ? (
          <ul className="recipe-list">
            {data.map((recipe) => (
              <li
                key={recipe.recipeId}
                onClick={() => viewRecipe(recipe.recipeId)}>
                {recipe.recipeName}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {showRecipe ? (
        <div>
          <Recipe key={recipetoView.recipeId} recipe={recipetoView} />
          <button onClick={showEditForm}>Edit recipe</button>
          {editForm ? <EditRecipeForm recipe={recipetoView} /> : null}
        </div>
      ) : null}
    </div>
  );
}
