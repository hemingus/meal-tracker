import { Food, Meal, MealItem } from "./classes.js"
import { 
    createMealItemElement,
    createFoodElement,
    createEditButton,
    createMealElement
} from "./script_modules/createFunctions.js"

// <-- Globals -->
const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
const meals = storedMeals.map(m => {
    return new Meal(m.mealItems.map(mi => 
        new MealItem(new Food(mi.food.foodName, mi.food.energyDensity, mi.food), mi.amount)), 
        m.category, 
        m)});
const storedFoods = JSON.parse(localStorage.getItem("foods")) || [];
const foods = storedFoods.map(f => new Food(f.foodName, f.energyDensity, f));
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

// Meal Item adding handling
let mealItemsToAdd = [];
const categorySelect = document.querySelector("#meal-category");
const foodInput = document.querySelector("#food-input");
foodInput.addEventListener("input", () => {
    const query = foodInput.value.toLowerCase();
    foodList.innerHTML = "";
    const matches = foods
        .filter(f => f.foodName.toLowerCase().startsWith(query))
        .slice(0, 5);

    matches.forEach(match => {
        const option = document.createElement("option");
        option.value = match.foodName;
        foodList.appendChild(option);
    })
})

const foodList = document.getElementById("food-list");
const amountInput = document.querySelector("#amount-input");

const mealItemsContainer = document.querySelector("#meal-items");

const addMealItemButton = document.querySelector("#addMealItem-button");
addMealItemButton.addEventListener("click", (e) => {
    e.preventDefault();
    const foodName = foodInput.value.trim();
    const amount = parseFloat(amountInput.value);

    const food = foods.find(
        f => f.foodName.toLowerCase() === foodName.toLowerCase()
    );

    if (!food) {
        alert(`Can't find a food named: "${foodName}".`);
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount (greater than 0).");
        return;
    }
    const mealItem = new MealItem(food, amount);
    mealItemsToAdd.push(mealItem);
    console.log(mealItemsToAdd);
    renderMealItems(mealItemsToAdd);
    foodInput.value = "";
    amountInput.value = "";
    foodInput.focus();
})

// Meal form -> add event listener
const mealForm = document.querySelector("#meal-form");
mealForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (mealItemsToAdd.length > 0) {
        addMeal(new Meal(mealItemsToAdd, categorySelect.value));
        mealItemsToAdd = [];
        mealItemsContainer.replaceChildren();
        e.target.reset();
        return
    } 
    alert("Meal has no content. Add minimum 1 meal item.")
})

const filterCategory = document.getElementById("filterCategory");
const filterCaloriesType = document.getElementById("filterCaloriesType");
const filterCaloriesValue = document.getElementById("filterCaloriesValue");
const filterDate = document.getElementById("filterDate");
const sortMeals = document.getElementById("sortMeals");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

function applyFilters() {
    let filtered = [...meals];

    const cat = filterCategory.value;
    if (cat !== "all") {
        filtered = filtered.filter(m => m.category === cat);
    }

    const type = filterCaloriesType.value;
    const val = parseFloat(filterCaloriesValue.value);
    if (type !== "none" && !isNaN(val)) {
    if (type === "above") filtered = filtered.filter(m => m.totalCalories > val);
    if (type === "below") filtered = filtered.filter(m => m.totalCalories < val);
    }

    const dateValue = filterDate.value;
    if (dateValue) {
        const selectedDay = new Date(dateValue);
        filtered = filtered.filter(m => {
        const mealDate = new Date(m.timestamp);
        return (
            mealDate.getFullYear() === selectedDay.getFullYear() &&
            mealDate.getMonth() === selectedDay.getMonth() &&
            mealDate.getDate() === selectedDay.getDate()
        );
        });
    }
    // Sorting
    switch (sortMeals.value) {
        case "caloriesAsc":
            filtered.sort((a, b) => a.totalCalories - b.totalCalories);
            break;
        case "caloriesDesc":
            filtered.sort((a, b) => b.totalCalories - a.totalCalories);
            break;
        case "dateAsc":
            filtered.sort((a, b) => a.timestamp - b.timestamp);
            break;
        case "dateDesc":
            filtered.sort((a, b) => b.timestamp - a.timestamp);
            break;
    }
    renderMeals(filtered);
}

clearFiltersBtn.addEventListener("click", () => {
    filterCategory.value = "all";
    filterCaloriesType.value = "none";
    filterCaloriesValue.value = "";
    filterDate.value = "";
    renderMeals(meals);
});

[filterCategory, filterCaloriesType, filterCaloriesValue, filterDate, sortMeals]
    .forEach(el => el.addEventListener("input", applyFilters));

///// Render /////
renderFoods(foods);
renderMeals(meals);

// =========
// Functions
// =========

// <-- Add / Remove functions -->
export function addMeal(meal) {
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
    renderMeals(meals);
}

export function removeMeal(meal) {
    const index = meals.findIndex(item => item.id === meal.id);
    if (index !== -1) {
        meals.splice(index, 1);
        console.log(`removed item with id: ${meal.id} from meals.`);
        localStorage.setItem("meals", JSON.stringify(meals));
    }
    renderMeals(meals);
}

export function addFood(food) {
    if (foods.find(f => f.foodName === food.foodName)) {
        alert("A food by that name already exist.")
        return
    }
    foods.push(food);
    localStorage.setItem("foods", JSON.stringify(foods));
    renderFoods(foods);
}

export function removeFood(food) {
    const index = foods.findIndex(item => item.id === food.id);
    if (index !== -1) {
        foods.splice(index, 1);
        console.log(`removed item with id: ${food.id} from foods.`);
        localStorage.setItem("foods", JSON.stringify(foods));
    }
    renderFoods(foods);
}

// <-- Render functions -->
function renderMealItems(arr) {
    mealItemsContainer.replaceChildren();
    arr.forEach(item => {
        const mealItemElement = createMealItemElement(item)
        mealItemsContainer.append(mealItemElement);
    })
}
function renderFoods(arr) {
    foodContainer.replaceChildren();
    arr.forEach(food => {
        foodContainer.append(createFoodElement(food));
    })
    localStorage.setItem("foods", JSON.stringify(foods));
}

function renderMeals(arr) {
    mealContainer.replaceChildren();
    arr.forEach(meal => {
        mealContainer.append(createMealElement(meal));
    })
    localStorage.setItem("meals", JSON.stringify(meals));
}