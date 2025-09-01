import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getAllRecipes from "../api/getAllRecipes";
import AddRecipeForm from "../AddRecipeForm";
import Recipe from "../Recipe";
import EditRecipeForm from "../EditRecipeForm";
import { MealPlanContext } from "../contexts";
import Button from "@mui/material/Button";

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
  const [mealPlan, setMealPlan] = useContext(MealPlanContext);

  function toggleAddRecipeForm() {
    setShowAddRecipeForm((prevShow) => !prevShow);
  }

  function viewRecipe(recipeId) {
    setEditForm(false);
    if (recipetoView === null) {
      setRecipetoView(() =>
        data.find((recipe) => recipe.recipeId === recipeId)
      );
      setShowRecipe(true);
    } else if (recipeId == recipetoView.recipeId) {
      setShowRecipe((prevShow) => !prevShow);
    } else {
      setRecipetoView(() =>
        data.find((recipe) => recipe.recipeId === recipeId)
      );
      setShowRecipe(true);
    }
  }

  function showEditForm() {
    setEditForm(!editForm);
  }

  function addToMealPlan(recipe) {
    setMealPlan((prevMealPlan) => [...prevMealPlan, recipe]);
  }

  return (
    <div className="recipe-page">
      <div>
        <h3>All Recipes</h3>
        <Button variant="contained" onClick={toggleAddRecipeForm}>
          {showAddRecipeForm ? "Close X" : "Add recipe"}
        </Button>
        {showAddRecipeForm ? <AddRecipeForm /> : null}
        {data ? (
          <ul className="recipe-list">
            {data.map((recipe) => (
              <li className="recipe-list-item" key={recipe.recipeId}>
                <Button onClick={() => addToMealPlan(recipe)}>
                  {mealPlan.includes(recipe)
                    ? "Remove from meal plan"
                    : "Add to meal plan"}
                </Button>
                <span onClick={() => viewRecipe(recipe.recipeId)}>
                  {recipe.recipeName}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {showRecipe ? (
        <div>
          <Recipe key={recipetoView.recipeId} recipe={recipetoView} />
          <Button onClick={showEditForm}>
            {editForm ? "Close X" : "Edit recipe"}
          </Button>
          {editForm ? (
            <EditRecipeForm
              recipe={recipetoView}
              save={setEditForm}
              setRecipetoView={setRecipetoView}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
