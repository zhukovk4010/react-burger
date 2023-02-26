import { SET_ACTIVE_TAB } from "../../../utils/constants";

export const setActiveTab = (numberTab) => {
    return ({
        type: SET_ACTIVE_TAB,
        numberTab: numberTab
    })
}
