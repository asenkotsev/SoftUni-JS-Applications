import { getAll, createMovie, checkResult, getMovieById, editMovie, likeMovie, deleteMovie } from '../data.js'

export default async function home() {
    this.partials = {
        navbar: await this.load('./templates/common/navbar.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        guest: await this.load('./templates/catalog/guest.hbs'),
        catalog: await this.load('./templates/catalog/catalog.hbs'),
        movie: await this.load('./templates/catalog/movie.hbs')
    };

    const context = Object.assign({}, this.app.userData);
    if (this.app.userData.email) {
        const movies = await getAll();
        context.movies = movies;
    }


    this.partial('./templates/home.hbs', context);
}

export async function createPage() {
    this.partials = {
        navbar: await this.load('./templates/common/navbar.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    this.partial('./templates/catalog/create.hbs', this.app.userData)
}

export async function createPost() {
    const movie = {
        name: this.params.title,
        description: this.params.description,
        imageUrl: this.params.imageUrl,
    }

    try {
        if (movie.name == '') {
            throw new Error('Title shouldn\'t be empty')
        }
        if (movie.description == '') {
            throw new Error('Description shouldn\'t be empty')
        }
        if (movie.imageUrl == '') {
            throw new Error('Image url shouldn\'t be empty')
        }

        const result = await createMovie(movie);
        checkResult(result);
        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}

export async function detailsPage() {
    this.partials = {
        navbar: await this.load('./templates/common/navbar.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    const movie = await getMovieById(this.params.id);
    const context = Object.assign({ movie }, this.app.userData);
    if (movie.ownerId === sessionStorage.getItem('userId')) {
        movie.canEdit = true;
    }

    await this.partial('./templates/catalog/details.hbs', context);
}

export async function editPage() {
    this.partials = {
        navbar: await this.load('./templates/common/navbar.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }
    const movie = await getMovieById(this.params.id);
    const context = Object.assign({ movie }, this.app.userData);

    await this.partial('./templates/catalog/edit.hbs', context);
}

export async function editPost() {
    const id = this.params.id;
    const movie = await getMovieById(id);

    movie.name = this.params.title;
    movie.description = this.params.description;
    movie.imageUrl = this.params.imageUrl;

    try {
        if (movie.name == '') {
            throw new Error('Title shouldn\'t be empty')
        }
        if (movie.description == '') {
            throw new Error('Description shouldn\'t be empty')
        }
        if (movie.imageUrl == '') {
            throw new Error('Image url shouldn\'t be empty')
        }

        const result = await editMovie(id, movie);
        checkResult(result);
        this.redirect(`#/details/${id}`);
    } catch (err) {
        alert(err.message);
    }
}

export async function like() {
    const id = this.params.id;
    try {
        const result = await likeMovie(id);
        checkResult(result);
    } catch (err) {
        alert(err.message);
    }
}


export async function movieDelete() {
    const id = this.params.id;
    try {
        const result = await deleteMovie(id);
        checkResult(result);
        this.redirect('#/home');
    } catch (err) {
        alert(err.message);
    }
}