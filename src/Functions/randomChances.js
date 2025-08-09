export const randomChances = (num) => {
    const answer = Array.from({ length: num }, _ => false);
    const index = Math.floor(Math.random() * answer.length);
    answer[index] = true;
    return {
        answer: answer, 
        index: index
    };
}