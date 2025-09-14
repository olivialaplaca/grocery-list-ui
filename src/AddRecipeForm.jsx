import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Recipe from "./components/RecipeCard";
import postRecipe from "./api/postRecipe";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function AddRecipeForm() {
  const [showRecipeForm, setShowRecipeForm] = useState(true);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [recipeToAdd, setRecipeToAdd] = useState({
    recipeName: "",
    servings: "",
    recipeIngredients: [],
  });

  const postMutation = useMutation({
    mutationFn: () => postRecipe(recipeToAdd),
  });

  function addIngredients(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("recipeName");
    const recipeServings = formData.get("servings");

    setRecipeToAdd((prevRecipe) => {
      return {
        ...prevRecipe,
        recipeName: name,
        servings: recipeServings,
      };
    });
    setShowIngredientForm((prevShow) => !prevShow);
    setShowRecipeForm((prevShow) => !prevShow);
  }

  function addMoreIngredients(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const ingredientObj = {};
    ingredientObj.ingredientName = formData.get("ingredientName");

    const quantityStr = formData.get("quantity");
    const quantityArr = quantityStr.split(" ");
    ingredientObj.quantity = quantityArr[0];
    ingredientObj.unitOfMeasure = quantityArr[1];

    setRecipeToAdd((prevRecipe) => {
      return {
        ...prevRecipe,
        recipeIngredients: [...prevRecipe.recipeIngredients, ingredientObj],
      };
    });
    formElement.reset();
  }

  function saveRecipe(event) {
    event.preventDefault();
    postMutation.mutate();
  }

  return (
    <Paper>
      <h3>New Recipe</h3>
      {showRecipeForm ? (
        <form onSubmit={addIngredients}>
          <TextField
            required
            name="recipeName"
            label="Recipe Name"
            defaultValue="e.g. Lentil Soup"
          />
          <TextField
            required
            name="servings"
            label="Servings"
            defaultValue="e.g. 4"
          />
          <Button>Add Ingredients</Button>
        </form>
      ) : null}
      {showIngredientForm ? (
        <Paper>
          <form
            onSubmit={addMoreIngredients}
            className="recipe-ingredient-form">
            <label>
              Add recipe ingredient:
              <input
                type="text"
                placeholder="e.g. onion"
                aria-label="ingredient name"
                name="ingredientName"
              />
              <input
                type="text"
                placeholder="e.g. 1 cup"
                aria-label="quantity"
                name="quantity"
              />
            </label>
            <Button>+ Add ingredient</Button>
          </form>
          {props.recipe.recipeId ? (
            <p className="recipe-id">Recipe Id: {props.recipe.recipeId}</p>
          ) : null}
          <h4 className="recipe-name">
            Recipe Name: {props.recipe.recipeName}
          </h4>
          <p className="recipe-servings">Servings: {props.recipe.servings}</p>
          <h5>Ingredients:</h5>
          <ul>{recipeIngredients}</ul>
          <Button onClick={saveRecipe}>Save Recipe</Button>
          {postMutation.isSuccess ? <p>Recipe saved!</p> : null}
        </Paper>
      ) : null}
    </Paper>
  );
}
