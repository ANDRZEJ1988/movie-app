export const requestFunction = async (argument) => {
    try {
        const requestAllMovies = await fetch(argument);
        const jsonAllMovies = await requestAllMovies.json();
        const {results, images, genres} = jsonAllMovies;
        if (results) return results;
        if (images) return images;
        else return genres;
    } catch (e) {
        return console.log(e);
    }
}