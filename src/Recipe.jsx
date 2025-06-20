import { useState } from "react";

export default function Recipe(props) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState({ ...props.recipe });

  const recipeIngredients = props.recipe.recipeIngredients.map((ingredient) => (
    <li key={ingredient.ingredientId ? ingredient.ingredientId : ingredient}>
      {ingredient.quantity} {ingredient.unitOfMeasure}{" "}
      {ingredient.ingredientName}
    </li>
  ));

  function handleEdit() {
    setShowEditForm(!showEditForm);
  }

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

  function saveUpdatedRecipe() {
    console.log(updatedRecipe);
  }

  return (
    <>
      {props.recipe.recipeId ? (
        <p className="recipe-id">Recipe Id: {props.recipe.recipeId}</p>
      ) : null}
      <h4 className="recipe-name">Recipe Name: {props.recipe.name}</h4>
      <p className="recipe-servings">Servings: {props.recipe.servings}</p>
      <h5>Ingredients:</h5>
      <ul>{recipeIngredients}</ul>
      <button onClick={handleEdit}>Edit Recipe</button>
      {showEditForm ? (
        <>
          <form onSubmit={saveUpdatedRecipe}>
            <input
              type="text"
              aria-label="recipe name"
              name="name"
              onChange={handleChange}
              value={updatedRecipe.name}
            />
            <input
              type="text"
              aria-label="servings"
              name="servings"
              onChange={handleChange}
              value={updatedRecipe.servings}
            />
            <p>Ingredients:</p>
            {updatedRecipe.recipeIngredients.map((ingredient) => (
              <div key={ingredient.ingredientId}>
                <label>
                  Name:
                  <input
                    type="text"
                    aria-label="ingredient name"
                    name="ingredientName"
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient.ingredientId)
                    }
                    value={ingredient.ingredientName}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="text"
                    aria-label="quantity"
                    name="quantity"
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient.ingredientId)
                    }
                    value={ingredient.quantity}
                  />
                  <input
                    type="text"
                    aria-label="unit"
                    name="unitOfMeasure"
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient.ingredientId)
                    }
                    value={ingredient.unitOfMeasure}
                  />
                </label>
              </div>
            ))}
            <button>Save</button>
          </form>
          <form
            // onSubmit={addMoreIngredients}
            className="recipe-ingredient-form">
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
        </>
      ) : null}
    </>
  );
}
