import { removeFood, removeMeal } from "../main.js"

// <-- Create element functions -->

export function createMealItemElement(mealItem) {
    const mealItemElement = document.createElement("p");
    mealItemElement.textContent = `${mealItem.amount}${mealItem.food.units} ${mealItem.food.foodName}`;
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
    return mealItemsContainer;
}