import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Recipe from "./Recipe";
import postRecipe from "./api/postRecipe";

export default function AddRecipeForm() {
  const [showRecipeForm, setShowRecipeForm] = useState(true);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [recipeToAdd, setRecipeToAdd] = useState({
    recipeName: "",
    servings: "",
    mealCategories: [],
    recipeIngredients: [],
  });
  const [recipeCategories, setRecipeCategories] = useState([
    { name: "BREAKFAST", checked: false },
    { name: "LUNCH", checked: false },
    { name: "DINNER", checked: false },
    { name: "SNACK", checked: false },
    { name: "DESSERT", checked: false },
    { name: "BEVERAGE", checked: false },
  ]);

  const postMutation = useMutation({
    mutationFn: () => postRecipe(recipeToAdd),
  });

  function handleCheckbox(event) {
    const checkbox = event.target;
    const checkboxVal = checkbox.value;

    setRecipeCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.name === checkboxVal
          ? { name: checkboxVal, checked: !category.checked }
          : category
      )
    );
  }

  function addIngredients(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("recipeName");
    const recipeServings = formData.get("servings");
    const categoryList = recipeCategories.filter(
      (category) => category.checked === true
    );

    setRecipeToAdd((prevRecipe) => {
      return {
        ...prevRecipe,
        recipeName: name,
        servings: recipeServings,
        mealCategories: categoryList.map((category) => category.name),
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
          <fieldset className="meal-category-set">
            <legend>Meal Categories:</legend>
            {recipeCategories.map((category) => (
              <div className="meal-category-option" key={category.name}>
                <input
                  type="checkbox"
                  id={category.name.toLowerCase()}
                  name={category.name.toLowerCase()}
                  value={category.name}
                  checked={category.checked}
                  onChange={handleCheckbox}
                />
                <label htmlFor={category.name.toLowerCase()}>
                  {category.name}
                </label>
              </div>
            ))}
          </fieldset>
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
          <button onClick={saveRecipe}>Save Recipe</button>
          {postMutation.isSuccess ? <p>Recipe saved!</p> : null}
        </>
      ) : null}
    </>
  );
}
