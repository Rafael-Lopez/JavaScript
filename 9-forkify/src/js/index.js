// Global app controller

// API key: 65778a9329a40afec80fb8874bcd787f
// https://www.food2fork.com/api/search

import axios from 'axios';

async function getResults(query) {
    
    const key = '65778a9329a40afec80fb8874bcd787f';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try {
        const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = result.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
}

getResults('pizza');