export default function Recipe(props) {
  console.log(props);

  const recipeIngredients = props.recipe.recipeIngredients.map((ingredient) => (
    <li key={ingredient.ingredientId}>
      {ingredient.quantity} {ingredient.unitOfMeasure}{" "}
      {ingredient.ingredient.name}
    </li>
  ));

  return (
    <>
      {props.recipe.recipeId ? (
        <p className="recipe-id">Recipe Id: {props.recipe.recipeId}</p>
      ) : null}
      <h4 className="recipe-name">Recipe Name: {props.recipe.name}</h4>
      <p className="recipe-servings">Servings: {props.recipe.servings}</p>
      <h5>Ingredients:</h5>
      <ul>{recipeIngredients}</ul>
    </>
  );
}
