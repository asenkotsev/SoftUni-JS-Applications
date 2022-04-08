import { beginRequest, endRequest, showError } from './notifications.js';
import API from './api.js';

const endpoints = {
    RECIPES: 'data/recipes',
    RECIPE_BY_ID: 'data/recipes/'
};

const api = new API(
    'E4038531-3A7C-F3BC-FF0F-3689D795E600',
    '6348EC39-702A-451F-8035-3463512A6CF0',
    beginRequest,
    endRequest
);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

export async function getAll() {
    return api.get(endpoints.RECIPES);
}

export async function createRecipe(recipe) {
    return api.post(endpoints.RECIPES, recipe);
}

export async function getRecipeById(id) {
    return api.get(endpoints.RECIPE_BY_ID + id);
}

export async function editRecipe(id, recipe) {
    return api.put(endpoints.RECIPE_BY_ID + id, recipe);
}

export async function deleteRecipe(id) {
    return api.delete(endpoints.RECIPE_BY_ID + id);
}

export async function likeRecipe(id) {
    const recipe = await getRecipeById(id);
    return editRecipe(id, { likes: recipe.likes + 1 });
}

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}