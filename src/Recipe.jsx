import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import putRecipe from "./api/putRecipe";

export default function Recipe(props) {
  const recipeIngredients = props.recipe.recipeIngredients.map((ingredient) => (
    <li key={ingredient.ingredientId ? ingredient.ingredientId : ingredient}>
      {ingredient.quantity} {ingredient.unitOfMeasure}{" "}
      {ingredient.ingredientName}
    </li>
  ));

  return (
    <>
      {props.recipe.recipeId ? (
        <p className="recipe-id">Recipe Id: {props.recipe.recipeId}</p>
      ) : null}
      <h4 className="recipe-name">Recipe Name: {props.recipe.recipeName}</h4>
      <p className="recipe-servings">Servings: {props.recipe.servings}</p>
      <h5>Ingredients:</h5>
      <ul>{recipeIngredients}</ul>
    </>
  );
}
