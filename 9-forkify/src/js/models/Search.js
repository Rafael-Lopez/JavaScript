import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {   
        const key = '65778a9329a40afec80fb8874bcd787f';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}