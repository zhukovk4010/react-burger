import { SET_ACTIVE_TAB } from "../../utils/constants";


const initialState = {
    activeTab: 'one'
}


const activeTabReducer = (state = initialState, action) => {
    switch (action.type) {
        //Изменяем значение активного переключателя
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.numberTab
            }
        default:
            return state;
    }
}

export default activeTabReducer;