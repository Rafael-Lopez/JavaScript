import { elements } from './base';

export const getInput = () => elements.searchInput.value;

//Even though this one has only one line of code too, it's a best practice to put it in curly brackets since we are not returning anything, and if you don't add the brackets there's an implicit return
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    
    if(title.length > limit) {
        title.split(' ').reduce( (accumulator, current) => {
            if( accumulator + current.length <= limit) {
                newTitle.push(current);
            }
            
            //New value of the accumulator for the next iteration
            return accumulator + current.length;
        }, 0 );
        
        return `${newTitle.join(' ')}...`;
    }
    
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    // recipes.forEach( current => renderRecipe(current) );  
    recipes.forEach( renderRecipe );  
};