// Generates a random rating
export const getRating = () => {
    return Math.floor((Math.random() * (6-1))+1);
}