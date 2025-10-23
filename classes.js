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
        const units = this.isDrink ? "ml" : "g";
        return units;
    }

    get foodEmoji() {
        const emoji = this.isDrink ? "🥤" : "🍽️";
        return emoji;
    }
}

export class Meal {
    constructor (mealItems = [], category = "Snack", { id = crypto.randomUUID(), timestamp = Date.now(), notes="" } = {}) {
        this.id = id;
        this.mealItems = mealItems;
        this.category = category;
        this.timestamp = timestamp;
        this.notes = notes;
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
        return Math.floor((this.food.energyDensity * this.amount) / 100);
    }

    get units() {
        return "kcal";
    }
}