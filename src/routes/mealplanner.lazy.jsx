import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { MealPlanContext } from "../contexts";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

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

  return (
    <div className="meal-planner-page">
      <h2>What do you want to eat this week?</h2>
      <div className="meal-plan-settings">
        <label>
          Number of servings for each meal:
          <input type="number" />
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
          <button>Save meal plan</button>
          <button>Generate grocery list</button>
        </div>
        <DragOverlay>
          {activeRecipe ? (
            <p className="drag-overlay">{activeRecipe.recipeName}</p>
          ) : null}
        </DragOverlay>
      </DndContext>
      <p>How many days shall we plan for?</p>
      <p>Do you always eat breakfast, lunch, and dinner?</p>
      <p>What about snacks and desserts?</p>
      <p>How many people shall we plan for?</p>
      <p>Any dietary restrictions we need to consider?</p>
    </div>
  );
}
