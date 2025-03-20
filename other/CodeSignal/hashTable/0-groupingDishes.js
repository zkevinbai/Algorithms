// Input
    // 2d array of dishes and the ingredients used to make them
        // the dish is the first entry in the sub array, the ingredients for that dish come after
// Output
    // 2d array of the ingredients and the dishes that they can be used to make
        // the ingredient is the first entry in the sub array, the dishes come after
        // only ingredients used to make two or more dishes are included

function groupingDishes(dishes) {
    let ingredients = {};

    for(let i=0; i<dishes.length; i++){
        let dishArray = dishes[i];
        let dish = dishArray[0];

        for(let j=1; j<dishArray.length; j++){
            let ingredient = dishArray[j];
            if(ingredients[ingredient]){
                ingredients[ingredient].push(dish);
            } else {
                ingredients[ingredient] = [dish];
            }
        }
    }

    let keys = Object.keys(ingredients).sort();

    let groupedDishes = [];

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let ingredientArray = ingredients[key];
        
        if(ingredientArray.length > 1){
            groupedDishes.push( [key].concat(ingredientArray.sort()) )
        }
    }

    return groupedDishes;
}
