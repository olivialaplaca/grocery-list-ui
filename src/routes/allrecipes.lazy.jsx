import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getAllRecipes from "../api/getAllRecipes";
import AddRecipeForm from "../AddRecipeForm";
import Recipe from "../components/RecipeCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export const Route = createLazyFileRoute("/allrecipes")({
  component: RecipesRoute,
});

function RecipesRoute() {
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const { isLoading, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
    staleTime: 30000,
  });

  function toggleAddRecipeForm() {
    setShowAddRecipeForm((prevShow) => !prevShow);
  }

  return (
    <div>
      <div>
        <h3>All Recipes</h3>
        <Button variant="contained" onClick={toggleAddRecipeForm}>
          {showAddRecipeForm ? "Close X" : "new recipe"}
        </Button>
        {showAddRecipeForm ? <AddRecipeForm /> : null}
        {data ? (
          <Grid container spacing={2}>
            {data.map((recipe) => (
              <Recipe key={recipe.recipeId} recipe={recipe} />
            ))}
          </Grid>
        ) : null}
      </div>
    </div>
  );
}
