import { GET_ORDER_SUCCESS } from "../../../utils/constants";

export const getOrderSuccessAC = (data) => {
    return (
        {
            type: GET_ORDER_SUCCESS,
            name: data.name,
            numberOrder: data.order.number
        }
    )
}