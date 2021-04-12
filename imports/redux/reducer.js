import { LOGIN, LOGOUT, ROUTE, CHANGE_LOCATION } from "./actions";

const initialState = {
    menu: "",
    subMenu: "",
    user: "BernardMurphy",
    menuData: {},
    mugshotUrl: "/assets/mugshot.jpg",
    userRole: "Runner",
    scannerLocation: "Motor 1",
    userPrivileges: "",
    previousMenu: "",
    previousSubMenu: "",
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case LOGIN:
            return {
                ...state,
                menu: "Main Menu",
                subMenu: "",
                user: action.data.user,
                menuData: {},
                userRole: action.data.userRole,
                userPrivileges: action.data.userPrivileges,
                previousMenu: "Login",
                previousSubMenu: "",
                loggedIn: true
            }

        case LOGOUT: 
            return {
                ...state,
                menu: "Login",
                subMenu: "",
                user: "",
                menuData: {},
                userRole: "",
                userPrivileges: "",
                previousMenu: "",
                previousSubMenu: "",
                loggedIn: false
            }
        
        case ROUTE:
            return {
                ...state,
                previousMenu: state.menu,
                menu: action.data.newRoute
            }
        case CHANGE_LOCATION:
            return {
                ...state,
                scannerLocation: action.data.location
            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer