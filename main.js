// main script

import { Food, Meal, MealItem } from "./classes.js"


// Globals
const mealCategories = ["Breakfast", "Lunch", "Dinner", "Snack"]

const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
const meals = storedMeals.map(m => new Meal(m.mealItems, m.category, m));
const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];
const foods = storedFoods.map(f => new Food(f.foodName, f.energyDensity, f));

const mealContainer = document.querySelector("#meals-container");
const foodContainer = document.querySelector("#foods-container");

// const clearFoodsButton = document.createElement("button");
// clearFoodsButton.textContent = "clear foods";
// clearFoodsButton.addEventListener("click", (event) => {
//     localStorage.removeItem("foods");
//     foods.length = 0;
//     renderFoods();
// })
// document.body.append(clearFoodsButton);

// const addFoodsButton = document.createElement("button");
// addFoodsButton.textContent = "add foods";
// addFoodsButton.addEventListener("click", (event) => {
//     const food1 = new Food("Fiskegrategn", 160);
//     const food2 = new Food("Kjøttkaker", 200);
//     const food3 = new Food("Milkshake", 50, {isDrink: true});
//     addFood(food1);
//     addFood(food2);
//     addFood(food3);
//     localStorage.setItem("foods", JSON.stringify(foods));
//     renderFoods();
// })

// document.body.append(addFoodsButton);


// Food form
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

// Render functions
function renderFoods() {
    foodContainer.replaceChildren();
    foods.forEach(food => {
        createFoodElement(food);
    })
    localStorage.setItem("foods", JSON.stringify(foods));
}

function renderMeals() {
    mealContainer.replaceChildren();
    meals.forEach((meal, index) => {
        createMealElement(meal);
    })
    localStorage.setItem("meals", JSON.stringify(meals));
}

// Food card
function createFoodElement(food) {
    const foodCard = document.createElement("div");
    foodCard.id = food.id;
    foodCard.classList.add("food-card");

    const nameElement = document.createElement("h3");
    nameElement.textContent = `${food.foodEmoji} ${food.foodName}`;
    foodCard.append(nameElement);

    const energyElement = document.createElement("p");
    energyElement.textContent = `Energy: ${food.energyDensity} ${food.densityUnits}`;
    foodCard.append(energyElement);

    if (food.description) {
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = food.description;
        foodCard.append(descriptionElement);
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeFood(food);
    })
    foodCard.append(removeButton);
    foodContainer.append(foodCard);
}

// Create edit form

function createEditForm() {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        const editForm = document.createElement("form");
        editForm.classList.add("edit-form");
        // TODO - lag ny funksjon for å opprette EditForm 
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();

        })
        document.body.append(editForm)
    })
}


// Meal form
const mealForm = document.querySelector("#meal-form");
mealForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addMeal(new Meal(foodName, energyDensity, { isDrink, description }));
    e.target.reset();
})

// Meal card
function createMealElement(meal) {
    const categoryElement = document.createElement("h3");
    categoryElement.textContent = meal.category;
    mealContainer.append(categoryElement);

    const timestampElement = document.createElement("h4");
    timestampElement.textContent = meal.timestamp;
    mealContainer.append(timestampElement);

    const mealItemsContainer = document.createElement("div");
    mealItemsContainer.classList.add("meal-items");
    meal.mealItems.forEach(item => {
        const mealParagraph = document.createElement("p");
        mealParagraph.textContent = `${item.amount} ${item.food.densityUnits} ${item.food.foodName} ${item.food}`
        mealItemsContainer.append(mealParagraph);
    })

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeMeal(meal);
    })
    mealContainer.append(mealItemsContainer);
}

// Add / Remove Meals
function addMeal(meal) {
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
    renderMeals();
}

function removeMeal(meal) {
    const index = meals.findIndex(item => item.id === meal.id);
    if (index !== -1) {
        meals.splice(index, 1);
        console.log(`removed item with id: ${meal.id} from meals.`);
        localStorage.setItem("meals", JSON.stringify(meals));
    }
    renderMeals();
}

// Add / Remove Foods
function addFood(food) {
    foods.push(food);
    localStorage.setItem("foods", JSON.stringify(foods));
    renderFoods();
}

function removeFood(food) {
    const index = foods.findIndex(item => item.id === food.id);
    if (index !== -1) {
        foods.splice(index, 1);
        console.log(`removed item with id: ${food.id} from foods.`);
        localStorage.setItem("foods", JSON.stringify(foods));
    }
    renderFoods();
}


renderFoods();
renderMeals();




