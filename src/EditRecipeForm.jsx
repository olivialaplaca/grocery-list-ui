import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import putRecipe from "./api/putRecipe";

export default function EditRecipeForm(props) {
  const [updatedRecipe, setUpdatedRecipe] = useState({ ...props.recipe });

  const mutation = useMutation({
    mutationFn: (recipeToUpdate) => putRecipe(recipeToUpdate),
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setUpdatedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  }

  function handleIngredientChange(event, key) {
    const { value, name } = event.target;
    setUpdatedRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipeIngredients: prevRecipe.recipeIngredients.map((ingredient) =>
        ingredient.ingredientId === key
          ? { ...ingredient, [name]: value }
          : ingredient
      ),
    }));
  }

  function deleteIngredient(event, ingredientId) {
    event.preventDefault();
    setUpdatedRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipeIngredients: prevRecipe.recipeIngredients.filter(
        (ingredient) => ingredient.ingredientId != ingredientId
      ),
    }));
  }

  function addMoreIngredients(event) {
    event.preventDefault();
    setUpdatedRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipeIngredients: [
        ...prevRecipe.recipeIngredients,
        {
          ingredientId: prevRecipe.recipeIngredients.length + 1,
          ingredientName: "",
          quantity: "",
          unitOfMeasure: "",
        },
      ],
    }));
  }

  function saveRecipe(event) {
    event.preventDefault();
    mutation.mutate(updatedRecipe);
    props.setRecipetoView(updatedRecipe);
    props.save();
  }

  return (
    <div className="edit-recipe-form">
      <h4>Edit Recipe</h4>
      <form onSubmit={saveRecipe}>
        <input
          type="text"
          aria-label="recipe name"
          placeholder="Recipe name"
          name="recipeName"
          onChange={handleChange}
          value={updatedRecipe.recipeName ? updatedRecipe.recipeName : ""}
        />
        <input
          type="text"
          aria-label="servings"
          placeholder="Number of servings"
          name="servings"
          onChange={handleChange}
          value={updatedRecipe.servings ? updatedRecipe.servings : ""}
        />
        <div>
          <p>Ingredients:</p>
          {updatedRecipe.recipeIngredients &&
          updatedRecipe.recipeIngredients.length > 0 ? (
            updatedRecipe.recipeIngredients.map((ingredient) => (
              <div
                key={ingredient.ingredientId}
                className="ingredient-input-group">
                <label>
                  Name:
                  <input
                    type="text"
                    aria-label="ingredient name"
                    placeholder="Ingredient name"
                    name="ingredientName"
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient.ingredientId)
                    }
                    value={
                      ingredient.ingredientName ? ingredient.ingredientName : ""
                    }
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="text"
                    aria-label="quantity"
                    placeholder="Numeric quantity"
                    name="quantity"
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient.ingredientId)
                    }
                    value={ingredient.quantity ? ingredient.quantity : ""}
                  />
                  <input
                    type="text"
                    aria-label="unit"
                    placeholder="Unit of measurement"
                    name="unitOfMeasure"
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient.ingredientId)
                    }
                    value={
                      ingredient.unitOfMeasure ? ingredient.unitOfMeasure : ""
                    }
                  />
                </label>
                <button
                  type="button"
                  onClick={(event) =>
                    deleteIngredient(event, ingredient.ingredientId)
                  }>
                  Delete ingredient
                </button>
              </div>
            ))
          ) : (
            <p>No ingredients added yet.</p>
          )}
        </div>
        <button type="submit">Save changes</button>
        <button type="button" onClick={addMoreIngredients}>
          Add more ingredients
        </button>
      </form>
    </div>
  );
}
