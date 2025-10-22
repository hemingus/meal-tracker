// Classes
export class Food {
    constructor (foodName, energyDensity, { id = crypto.randomUUID(), isDrink=false, description=""} = {}) {
        this.id = id;
        this.foodName = foodName;
        this.energyDensity = energyDensity;
        this.isDrink = isDrink;
        this.description = description;
    }

    get densityUnits() {
        const units = this.isDrink ? "kcal/100ml" : "kcal/100g";
        return units;
    }

    get units() {
        return this.isDrink ? "ml" : "g";
    }

    get foodEmoji() {
        const emoji = this.isDrink ? "🥤" : "🍽️";
        return emoji;
    }
}

export class Meal {
    constructor (mealItems = [], category = "Snack", { id = crypto.randomUUID(), timestamp = Date.now() } = {}) {
        this.id = id;
        this.mealItems = mealItems;
        this.category = category;
        this.timestamp = timestamp;
    }

    get totalCalories() {
        return this.mealItems.reduce((sum, item) => sum + item.calories, 0);
    }
}

export class MealItem {
    constructor(food, amount) {
        this.food = food;
        this.amount = amount;
    }

    get calories() {
        return (this.food.energyDensity * this.amount) / 100;
    }
}