import API from './api.js';

const endpoints = {
    MOVIES: 'data/movies'
};

const api = new API(
    '29E7CF98-2C77-83FD-FF4A-667A177FA200',
    '3A984439-19BB-42DD-AAA4-9B6C9C606F54',
);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

export async function getAll() {
    return api.get(endpoints.MOVIES);
}

export async function createMovie(movie) {
    return api.post(endpoints.MOVIES, movie);
}

export async function getMovieById(id) {
    return api.get(endpoints.MOVIES + '/' + id);
}

export async function editMovie(id, movie) {
    return api.put(endpoints.MOVIES + '/' + id, movie);
}

export async function deleteMovie(id) {
    return api.delete(endpoints.MOVIES + '/' + id);
}

export async function likeMovie(id) {
    const movie = await getMovieById(id);
    return editMovie(id, { likes: movie.likes + 1 });
}

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}