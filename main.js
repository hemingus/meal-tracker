// main script

// Classes
class Food {
    constructor (foodname, energyDensity, {isDrink=false, description=""}) {
        this.id = crypto.randomUUID();
        this.foodname = foodname;
        this.energyDensity = energyDensity;
        this.isDrink = isDrink;
        this.description = description;
    }
}

class Meal {
    constructor (foods, timestamp) {
        this.id = crypto.randomUUID();
        this.foods = foods;
        this.timestamp = timestamp;
    }
}

class MealItem {
    constructor(food, amount) {
        this.food = food;
        this.amount = amount;
    }
    getCalories() {
        return (this.food.energyDensity * this.amount) / 100;
    }
}

const meals = JSON.parse(localStorage.getItem("meals")) || [];
const foods = JSON.parse(localStorage.getItem("foods")) || [];
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
        foodElement.textContent = `Food: ${meal.food}`;

        // Amount
        const amountElement = document.createElement("p");
        amountElement.textContent = `Amount: ${meal.amount}`;

        // Calories
        const caloriesElement = document.createElement("p");
        caloriesElement.textContent = `Calories: ${meal.energyDensity}`;

        mealElement.append(foodElement, amountElement, caloriesElement);
        mealContainer.append(mealElement);    
    })
    localStorage.setItem("meals", JSON.stringify(meals));
}

renderMeals();

