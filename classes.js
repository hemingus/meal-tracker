// Classes
export class Food {
    constructor (foodName, energyDensity, {isDrink=false, description=""} = {}) {
        this.id = crypto.randomUUID();
        this.foodName = foodName;
        this.energyDensity = energyDensity;
        this.isDrink = isDrink;
        this.description = description;
    }
}

export class Meal {
    constructor (mealItems = [], timestamp = new Date()) {
        this.id = crypto.randomUUID();
        this.mealItems = mealItems;
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