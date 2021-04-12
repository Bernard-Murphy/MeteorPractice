
/* This function is used to validate that a username contains only allowed characters. Usernames may contain any combination 
of letters, numbers, dashes, and underscores. */

const allowedCharacters = (string) => {
    const allowedArray = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_'.split('');
    const splitString = string.split('');
    for (let i = 0; i < splitString.length; i++) {
        if (allowedArray.indexOf(splitString[i]) === -1){
            return false;
        }
    }
    return true;

}

export default allowedCharacters;