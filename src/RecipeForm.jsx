import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Recipe from "./Recipe";
import postRecipe from "./api/postRecipe";

export default function RecipeForm() {
  const [showRecipeForm, setShowRecipeForm] = useState(true);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [recipeToAdd, setRecipeToAdd] = useState({
    recipeName: "",
    servings: "",
    recipeIngredients: [],
  });

  const mutation = useMutation({
    mutationFn: () => postRecipe(recipeToAdd),
  });

  function addIngredients(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
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

  return (
    <>
      <h3>Add a New Recipe</h3>
      {showRecipeForm ? (
        <form onSubmit={addIngredients}>
          <input
            type="text"
            placeholder="e.g. Lentil Soup"
            aria-label="recipe name"
            name="recipeName"
          />
          <input
            type="text"
            placeholder="e.g. 5"
            aria-label="servings"
            name="servings"
          />
          <button>Add Ingredients</button>
        </form>
      ) : null}
      {showIngredientForm ? (
        <>
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
            <button>+ Add ingredient</button>
          </form>
          <Recipe recipe={recipeToAdd} />
          <button onClick={mutation.mutate}>Save Recipe</button>
          {mutation.isSuccess ? <p>Recipe saved!</p> : null}
        </>
      ) : null}
    </>
  );
}
