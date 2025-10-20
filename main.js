// main script



const clearFoodsButton = document.createElement("button");
clearFoodsButton.textContent = "clear foods";
clearFoodsButton.addEventListener("click", (event) => {
    localStorage.removeItem("foods");
    foods.length = 0;
    renderFoods();
})
document.body.append(clearFoodsButton);

const addFoodsButton = document.createElement("button");
addFoodsButton.textContent = "add foods";
addFoodsButton.addEventListener("click", (event) => {
    const food1 = new Food("Fiskegrategn", 160);
    const food2 = new Food("Kjøttkaker", 200);
    const food3 = new Food("Milkshake", 50, {isDrink: true});
    addFood(food1);
    addFood(food2);
    addFood(food3);
    localStorage.setItem("foods", JSON.stringify(foods));
    renderFoods();
})

document.body.append(addFoodsButton);

// Classes
class Food {
    constructor (foodName, energyDensity, {isDrink=false, description=""} = {}) {
        this.id = crypto.randomUUID();
        this.foodName = foodName;
        this.energyDensity = energyDensity;
        this.isDrink = isDrink;
        this.description = description;
    }
}

class Meal {
    constructor (mealItems = [], timestamp = new Date()) {
        this.id = crypto.randomUUID();
        this.mealItems = mealItems;
        this.timestamp = timestamp;
    }

    get totalCalories() {
        return this.mealItems.reduce((sum, item) => sum + item.calories, 0);
    }
}

class MealItem {
    constructor(food, amount) {
        this.food = food;
        this.amount = amount;
    }

    get calories() {
        return (this.food.energyDensity * this.amount) / 100;
    }
}

const meals = JSON.parse(localStorage.getItem("meals")) || [];
const foods = JSON.parse(localStorage.getItem("foods")) || [];
const mealContainer = document.querySelector("#meals-container");
const foodContainer = document.querySelector("#foods-container");

function renderFoods() {
    foodContainer.replaceChildren();
    foods.forEach(food => {
        createFoodElement(food);
    })
}

function renderMeals() {
    meals.forEach(meal => {
        createMealElement(meal)
    })
}

function createFoodElement(food) {
    const foodCard = document.createElement("div");
    foodCard.id = food.id;
    foodCard.classList.add("food-card");

    const nameElement = document.createElement("p");
    const icon = food.isDrink ? "🥤" : "🍔";
    nameElement.textContent = `${icon} ${food.foodName}`;
    foodCard.append(nameElement);

    const energyElement = document.createElement("p");
    energyElement.textContent = `${food.energyDensity}`;
    foodCard.append(energyElement);

    if (food.description) {
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = food.description;
        foodCard.append(descriptionElement);
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (event) => {
        const index = foods.findIndex(item => item.id === food.id);
        if (index !== -1) {
            foods.splice(index, 1);
            console.log(`removed item with id: ${food.id} from foods.`);
            localStorage.setItem("foods", JSON.stringify(foods));
        }
        
        renderFoods();
    })
    foodCard.append(removeButton);
    foodContainer.append(foodCard);
}

function createMealElement(meal) {
    return null;
}
   
function renderMeals() {
    mealContainer.replaceChildren();
    meals.forEach((meal, index) => {
        createMealElement(meal);
    })
    localStorage.setItem("meals", JSON.stringify(meals));
}

function addFood(food) {
    foods.push(food);
    localStorage.setItem("foods", JSON.stringify(foods));
}



renderFoods();




