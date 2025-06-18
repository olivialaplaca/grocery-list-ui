import { useEffect, useState } from "react";
import Recipe from "./Recipe";

export default function RecipeForm() {
  const [showRecipeForm, setShowRecipeForm] = useState(true);
  const [showIngredientForm, setShowIngredientForm] = useState(false);

  const [recipeToAdd, setRecipeToAdd] = useState({
    recipeName: "",
    servings: "",
    ingredientList: [],
  });

  function addIngredients(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const recipeName = formData.get("recipe name");
    const recipeServings = formData.get("servings");
    console.log(recipeName + " + " + recipeServings);

    setRecipeToAdd((prevRecipe) => {
      return {
        ...prevRecipe,
        recipeName: recipeName,
        servings: recipeServings,
      };
    });
    setShowIngredientForm((prevShow) => !prevShow);
    setShowRecipeForm((prevShow) => !prevShow);
  }

  //log
  useEffect(() => console.log(recipeToAdd), [recipeToAdd]);

  function addMoreIngredients(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const ingredientObj = {};
    ingredientObj.ingredientName = formData.get("ingredient name");

    const quantityStr = formData.get("quantity");
    const quantityArr = quantityStr.split(" ");
    ingredientObj.quantity = quantityArr[0];
    ingredientObj.unitOfMeasure = quantityArr[1];

    setRecipeToAdd((prevRecipe) => {
      return {
        ...prevRecipe,
        ingredientList: [...prevRecipe.ingredientList, ingredientObj],
      };
    });
    formElement.reset();
  }

  function submitRecipe(event) {
    saveRecipe(recipeToAdd);
  }

  async function saveRecipe(recipeObj) {
    const result = await fetch("/recipe/create-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeObj),
    });
    console.log(result);
  }

  return (
    <>
      <h3>Add a New Recipe</h3>
      {showRecipeForm ? (
        <form onSubmit={addIngredients} className="add-recipe-form">
          <input
            type="text"
            placeholder="e.g. Lentil Soup"
            aria-label="recipe name"
            name="recipe name"
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
            className="recipe-ingredient-form"
          >
            <label>
              Add recipe ingredient:
              <input
                type="text"
                placeholder="e.g. onion"
                aria-label="ingredient name"
                name="ingredient name"
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
          <button onClick={submitRecipe}>Save Recipe</button>
        </>
      ) : null}
    </>
  );
}
