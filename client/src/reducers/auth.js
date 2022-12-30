import * as actionType from "../constants/actionTypes.js";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            console.log(action?.data);
            return state;
        default:
            return state;
    }
}

export default authReducer;