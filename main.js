import { Food, Meal, MealItem } from "./classes.js"
import { 
    createMealItemElement,
    createFoodElement,
    createEditButton,
    createMealElement
} from "./script_modules/createFunctions.js"

// <-- Globals -->
const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
const meals = storedMeals.map(m => new Meal(m.mealItems, m.category, m));
const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];
const foods = storedFoods.map(f => new Food(f.foodName, f.energyDensity, f));
const mealItemsContainer = document.querySelector("#meal-items");
const mealContainer = document.querySelector("#meals-container");
const foodContainer = document.querySelector("#foods-container");

// =======================================================================
// <-- Runs when app starts -->
// =======================================================================

// Food form -> add event listener
const foodForm = document.querySelector("#food-form");
foodForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const foodName = document.getElementById("foodName-input").value.trim();
    const energyDensity = document.getElementById("energyDensity-input").value;
    const isDrink = document.getElementById("isDrink-input").checked;
    const description = document.getElementById("foodDescription-input").value.trim();

    if (!foodName || isNaN(energyDensity)) {
        alert("New food: fill in all required fields");
        return
    }
    addFood(new Food(foodName, energyDensity, { isDrink, description }));
    e.target.reset();
})

// Meal form -> add event listener
const mealForm = document.querySelector("#meal-form");
mealForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addMeal(new Meal(foodName, energyDensity, { isDrink, description }));
    e.target.reset();
})

// Meal Item adding handling
const mealItems = [];
const foodInput = document.querySelector("#food-input");
const amountInput = document.querySelector("#amount-input");

const addMealItemButton = document.querySelector("#addMealItem-button");
addMealItemButton.addEventListener("click", (e) => {
    e.preventDefault();
    const foodName = foodInput.value.trim();
    const amount = parseFloat(amountInput.value);

    const food = foods.find(
        f => f.foodName.toLowerCase() === foodName.toLowerCase()
    );

    if (!food) {
        alert(`Can't find the food: "${foodName}".`);
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount (greater than 0).");
        return;
    }
    const mealItem = new MealItem(food, amount);
    mealItems.push(mealItem);
    console.log(mealItems);
    renderMealItems();
    foodInput.value = "";
    amountInput.value = "";
    foodInput.focus();
})

// Render
renderFoods();
renderMeals();



// =========
// Functions
// =========

// <-- Add / Remove functions -->
export function addMeal(meal) {
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
    renderMeals();
}

export function removeMeal(meal) {
    const index = meals.findIndex(item => item.id === meal.id);
    if (index !== -1) {
        meals.splice(index, 1);
        console.log(`removed item with id: ${meal.id} from meals.`);
        localStorage.setItem("meals", JSON.stringify(meals));
    }
    renderMeals();
}

export function addFood(food) {
    if (foods.find(f => f.foodName === food.foodName)) {
        alert("A food by that name already exist.")
        return
    }
    foods.push(food);
    localStorage.setItem("foods", JSON.stringify(foods));
    renderFoods();
}

export function removeFood(food) {
    const index = foods.findIndex(item => item.id === food.id);
    if (index !== -1) {
        foods.splice(index, 1);
        console.log(`removed item with id: ${food.id} from foods.`);
        localStorage.setItem("foods", JSON.stringify(foods));
    }
    renderFoods();
}

// <-- Render functions -->

function renderMealItems() {
    mealItemsContainer.replaceChildren();
    mealItems.forEach(item => {
        const mealItemElement = createMealItemElement(item)
        mealItemsContainer.append(mealItemElement);
    })
}
function renderFoods() {
    foodContainer.replaceChildren();
    foods.forEach(food => {
        foodContainer.append(createFoodElement(food));
    })
    localStorage.setItem("foods", JSON.stringify(foods));
}

function renderMeals() {
    mealContainer.replaceChildren();
    meals.forEach((meal, index) => {
        mealContainer.append(createMealElement(meal));
    })
    localStorage.setItem("meals", JSON.stringify(meals));
}







