import { elements } from './base';

export const getInput = () => elements.searchInput.value;

//Even though this one has only one line of code too, it's a best practice to put it in curly brackets since we are not returning anything, and if you don't add the brackets there's an implicit return
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
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

// type: 'prev' or 'next'
const createButton = (page, type) => `
         <button class="btn-inline results__btn--${type}" data-goto=${type ==='prev' ? page - 1 : page +1}>
            <span>Page ${type ==='prev' ? page - 1 : page +1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type ==='prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
    `;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    
    if(page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Buth buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to previous page
        button = createButton(page, 'prev');
    }
    
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page =1, resPerPage =10) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    
    // recipes.forEach( current => renderRecipe(current) );  
    recipes.slice(start, end).forEach( renderRecipe );  
    
    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};