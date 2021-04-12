
/* This function makes sure there are no backslashes or apostrophes, i.e. common SQL injection tools, in a given string */

const forbiddenCharacters = (string) => {
    const forbiddenArray = ['\'', '"', '\\']
    const splitString = string.split('');
    for (let i = 0; i < splitString.length; i++) {
        if (forbiddenArray.indexOf(splitString[i]) !== -1){
            return true;
        }
    }
    return false;

}

export default forbiddenCharacters