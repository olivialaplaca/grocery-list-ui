import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { MealPlanContext } from "../contexts";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useMutation } from "@tanstack/react-query";
import postGroceryList from "../api/postGroceryList";
import { Button } from "@mui/material";

export const Route = createLazyFileRoute("/mealplanner")({
  component: MealPlannerRoute,
});

function Draggable(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.recipe.recipeId,
    data: props.recipe,
  });
  return (
    <li ref={setNodeRef} {...attributes} {...listeners}>
      {props.recipe.recipeName + ", " + props.recipe.servings}
    </li>
  );
}

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({ id: props.meal });
  return (
    <div ref={setNodeRef} className={isOver ? "hovered-droppable" : null}>
      {props.children || <span>Drop here</span>}
    </div>
  );
}

function MealPlannerRoute() {
  const [mealPlan, setMealPlan] = useContext(MealPlanContext);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [plannedMeals, setPlannedMeals] = useState({});
  const [useLeftovers, setUseLeftovers] = useState(true);
  const meals = ["breakfast", "lunch", "dinner"];
  const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [groceryListRequest, setGroceryListRequest] = useState({});
  const [groceryList, setGroceryList] = useState([]);

  const postMutation = useMutation({
    mutationFn: () => postGroceryList(groceryListRequest),
    onSuccess: (data) => {
      setGroceryList(data);
    },
  });

  function handleDragStart(event) {
    const currentRecipe = event.active.data.current;
    setActiveRecipe(currentRecipe);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveRecipe(null);
    if (active && over) {
      setPlannedMeals((prevMeals) => {
        return { ...prevMeals, [over.id]: active.data.current };
      });
    }
  }

  function getPlannedRecipe(dayMeal) {
    const plannedRecipe = plannedMeals[dayMeal];
    if (plannedRecipe) {
      return plannedRecipe.recipeName;
    }
    return "Drop here";
  }

  function toggleLeftovers() {
    setUseLeftovers(!useLeftovers);
  }

  function handleGenerateGroceryList() {
    var recipeIds = {};
    for (var [key, value] of Object.entries(plannedMeals)) {
      recipeIds = { ...recipeIds, [key]: value.recipeId };
    }
    setGroceryListRequest({
      mealPlanRecipes: recipeIds,
      numberOfPeople: 2, //TODO: update this to get value from input
      useLeftovers: useLeftovers,
    });
    postMutation.mutate();
  }

  function renderGroceryList() {
    var listItems = [];
    for (var i in groceryList) {
      listItems.push(
        <li>
          {groceryList[i].itemName +
            ", " +
            groceryList[i].unitOfMeasure +
            ", " +
            groceryList[i].quantity}
        </li>
      );
    }
    return <ul>{listItems}</ul>;
  }

  return (
    <div className="meal-planner-page">
      <h2>What do you want to eat this week?</h2>
      <div className="meal-plan-settings">
        <label>
          Number of servings for each meal:
          <input type="number" name="servings-per-meal" />
        </label>
        <label className="leftovers-toggle">
          Plan to use leftovers?
          <input
            type="checkbox"
            checked={useLeftovers}
            onChange={toggleLeftovers}
          />
        </label>
      </div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="recipes-for-meal-plan">
          <h3>Selected recipes:</h3>
          <ul>
            {mealPlan.map((recipe) => (
              <Draggable key={recipe.recipeId} recipe={recipe} />
            ))}
          </ul>
        </div>
        <div>
          <table className="meal-plan-table">
            <thead>
              <tr>
                <th></th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day) => (
                <tr key={day}>
                  <th>{day}</th>
                  {meals.map((mealCol) => (
                    <td key={mealCol}>
                      <Droppable meal={day + "-" + mealCol}>
                        {getPlannedRecipe(day + "-" + mealCol)}
                      </Droppable>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Button>Save meal plan</Button>
          <Button onClick={handleGenerateGroceryList}>
            Generate grocery list
          </Button>
          <div>{postMutation.isSuccess ? renderGroceryList() : null}</div>
        </div>
        <DragOverlay>
          {activeRecipe ? (
            <p className="drag-overlay">{activeRecipe.recipeName}</p>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
