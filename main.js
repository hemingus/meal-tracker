// main script

const meals = JSON.parse(localStorage.getItem("meals")) || [];
const mealContainer = document.querySelector("#meals-container");

const mockMeals = [{
    food: "potato",
    time: Date.now(),
    amount: 152,
    energyDensity: 399
},
{
    food: "meatballs",
    time: Date.now(),
    amount: 152,
    energyDensity: 399
}]

if (meals.length === 0) {
    mockMeals.forEach(meal => addMeal(meal.food, meal.amount, meal.energyDensity));
    addMeal("chips", 300, 566);
}


function addMeal(food, amount, energyDensity) {
    const newMeal = {
        food,
        time: Date.now(),
        amount,
        energyDensity
    }
    meals.push(newMeal);
    renderMeals();
}

function renderMeals() {
    mealContainer.replaceChildren();
    meals.forEach((meal, index) => {
        const mealElement = document.createElement("div");
        mealElement.classList.add("meal-card")

        // Food
        const foodElement = document.createElement("p");
        foodElement.textContent = meal.food;

        // Amount
        const amountElement = document.createElement("p");
        amountElement.textContent = meal.amount;

        // Calories
        const caloriesElement = document.createElement("p");
        caloriesElement.textContent = meal.energyDensity;

        mealElement.append(foodElement, amountElement, caloriesElement);
        mealContainer.append(mealElement);    
    })
    localStorage.setItem("meals", JSON.stringify(meals));
}

renderMeals();

