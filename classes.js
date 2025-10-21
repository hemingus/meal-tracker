// Classes
export class Food {
    constructor (foodName, energyDensity, {isDrink=false, description=""} = {}) {
        this.id = crypto.randomUUID();
        this.foodName = foodName;
        this.energyDensity = energyDensity;
        this.isDrink = isDrink;
        this.description = description;
    }

    get densityUnits() {
        const units = this.isDrink ? "kcal / 100ml" : "kcal / 100g";
        return units;
    }
}

export class Meal {
    constructor (mealItems = [], category = "snack", timestamp = new Date()) {
        this.id = crypto.randomUUID();
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