const op = {};

/* Adds and returns opacity to selected elements. Used in hover effects throughout the application. */

op.removeOpacity = (arr) => {
    arr.forEach((item) => {
        const element = document.querySelector(`#${item}`);
        element.style.transition = '0.25s';
        element.style.opacity = "50%";
    })
}

op.returnOpacity = (arr) => {
    arr.forEach((item) => {
        document.querySelector(`#${item}`).style.opacity = "100%";
    })
}

export default op;