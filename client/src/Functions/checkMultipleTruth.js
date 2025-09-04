export const checkMultipleTruth = (arrayOfBool) => {
    for ( let i in arrayOfBool) {
        if (arrayOfBool[i]) {
            return true;
        }
    }

    return false;
}