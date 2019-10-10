import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    
    async getRecipe() {
        try {
            const result = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
        }
    }
    
    calcTime() {
        // Assuming that we need 15 min for each ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    
    calcServings() {
        // Assuming that each recipe is for 4 by default
        this.servings = 4;
    }
    
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        
        const newIngredients = this.ingredients.map( el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach( (unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            
            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            // Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex( el2 => unitsShort.includes(el2));
            
            let objIng;
            if(unitIndex > -1) {
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
                
            } else if (unitIndex === -1) {
                // There is NO unit
                objIng = {
                    count: 1,
                    unit: '',
                    //ingredient: ingredient
                    ingredient
                };
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is a number       
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            }
            
            return objIng;
        });
        
        this.ingredients = newIngredients;
    }
}