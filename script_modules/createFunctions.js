import { removeFood, removeMeal } from "../main.js"

// <-- Create element functions -->

export function createMealItemElement(mealItem) {
    const mealItemElement = document.createElement("p");
    const amountElement = document.createElement("span");
    amountElement.textContent = `${mealItem.amount}${mealItem.food.units} `;
    amountElement.classList.add("amount-p");

    const foodNameElement = document.createElement("span");
    foodNameElement.textContent = ` ${mealItem.food.foodName} `;
    foodNameElement.classList.add("foodname-p");

    const caloriesElement = document.createElement("span");
    caloriesElement.textContent = `=${mealItem.calories} ${mealItem.units}`;
    caloriesElement.classList.add("calories-p");
    mealItemElement.append(amountElement, foodNameElement, caloriesElement)
    return mealItemElement;
}



export function createFoodElement(food) {
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
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeFood(food);
    })
    foodCard.append(removeButton);
    return foodCard;
}



export function createEditButton() {
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
        document.body.append(editForm);
    })
}



export function createMealElement(meal) {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");
    const categoryElement = document.createElement("h3");
    categoryElement.textContent = `${meal.category} ${meal.mealEmoji}`;
    
    

    const timestampElement = document.createElement("h4");
    timestampElement.textContent = `${new Date(meal.timestamp)}`;
    timestampElement.style.color = "var(--cool-grey)";
    

    const mealItemsElement = document.createElement("div");
    mealItemsElement.classList.add("meal-items");
    meal.mealItems.forEach(item => {
        mealItemsElement.append(createMealItemElement(item));
    })

    const statsElement = document.createElement("strong");
    statsElement.textContent = `${meal.totalCalories} kcal`;
    statsElement.classList.add("stats-p");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeMeal(meal);
    })
    mealCard.append(categoryElement, timestampElement, mealItemsElement, statsElement, removeButton);
    return mealCard;
}