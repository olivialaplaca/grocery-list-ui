import { useEffect, useState } from "react";
import IngredientsList from "./IngredientsList";

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  async function getIngredients() {
    const ingredientsRes = await fetch("/ingredients/all");
    const ingredientsJson = await ingredientsRes.json();
    let ingredientNames = ingredientsJson.map((ingredient) => ingredient.name);
    setIngredients(ingredientNames);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const newIngredient = formData.get("ingredient");
    if (newIngredient == "") {
      console.log("ingredient needs a name");
    } else {
      const ingredientObj = { name: newIngredient, packageSize: null };
      saveIngredient(ingredientObj);
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      formElement.reset();
    }
  }

  async function saveIngredient(addIngredient) {
    const result = await fetch("ingredients/create-ingredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addIngredient),
    });
    console.log(result);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="ingredient name"
          name="ingredient"
        />
        <button>+Add Ingredient</button>
      </form>
      <IngredientsList ingredients={ingredients} />
    </>
  );
}
