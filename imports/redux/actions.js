import { Users } from '../api/Users';
import { Vehicles } from '../api/Vehicles';
import bcrypt from 'bcryptjs';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ROUTE = 'ROUTE';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';


export const login = (username, password) => async dispatch => {
    const data = Users.findOne({
        username: username
    })
    const auth = await bcrypt.compareSync(password, data.password)
    if (auth){
        dispatch({
            type: LOGIN,
            data: {
                user: data.username,
                mugshotUrl: data.mugshotUrl,
                userRole: data.userRole,
                userPrivileges: data.userPrivileges
            }
        })
    } else {
        return false;
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const route = (newRoute) => {
    return {
        type: ROUTE,
        data: {
            newRoute: newRoute
        }
    }
}

export const change_location = (user, id, name) => {
    return {
        type: CHANGE_LOCATION,
        data: {
            location: name
        }
    }
}