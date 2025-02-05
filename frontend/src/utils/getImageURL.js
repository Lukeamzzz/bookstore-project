
function getImageURL(name){
    return new URL(`../assets/book_covers/${name}`, import.meta.url)
}

export {getImageURL}