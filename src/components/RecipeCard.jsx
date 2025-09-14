import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import putRecipe from "../api/putRecipe";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function Recipe(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const recipeIngredients = props.recipe.recipeIngredients.map((ingredient) => (
    <li key={ingredient.ingredientId ? ingredient.ingredientId : ingredient}>
      {ingredient.quantity} {ingredient.unitOfMeasure}{" "}
      {ingredient.ingredientName}
    </li>
  ));

  return (
    <Card>
      <CardHeader
        title={props.recipe.recipeName}
        subheader={props.recipe.servings}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="add to meal plan">
          <AddIcon />
        </IconButton>
        <IconButton aria-label="edit recipe">
          <EditIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.recipe.recipeId ? (
            <p className="recipe-id">Recipe Id: {props.recipe.recipeId}</p>
          ) : null}
          <h4 className="recipe-name">
            Recipe Name: {props.recipe.recipeName}
          </h4>
          <p className="recipe-servings">Servings: {props.recipe.servings}</p>
          <h5>Ingredients:</h5>
          <ul>{recipeIngredients}</ul>
        </CardContent>
      </Collapse>
    </Card>
  );
}
