import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchCategories = () => axios.get(`${BASE_URL}/categories.php`);

export const fetchMealsByCategory = (category) => axios.get(`${BASE_URL}/filter.php?c=${category}`);

export const fetchRandomMeal = () => axios.get(`${BASE_URL}/random.php`);
