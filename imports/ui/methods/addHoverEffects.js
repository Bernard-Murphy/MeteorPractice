import op from './opacity';


/* This function adds the opacity hover effect to menu items. This has to be done using Javascript and not CSS or else the 
elements will render with default styling and transition to their resting state in the transition time (0.25s) - and it will 
look ugly.*/

const addHoverEffects = () => {
    const menuItems = document.getElementsByClassName('div-menu-items');
        for (let i = 0; i < menuItems.length; i++){
            menuItems[i].addEventListener('mouseenter', () => {
                op.removeOpacity([`div-menu-${[i]}`, `p-menu-${[i]}`]);
            })
            menuItems[i].addEventListener('mouseleave', () => {
                op.returnOpacity([`div-menu-${[i]}`, `p-menu-${[i]}`])
            })
        }
}

export default addHoverEffects;