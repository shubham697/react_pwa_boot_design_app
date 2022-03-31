import {db, serverTime} from '../utils/firebase';

export const createOrder = (order_params) =>{
    order_params.createdAt = serverTime
    return db.collection("Orders").add(order_params).then(response => {return response})
}

export const getMyOrders = (customer_id) =>{
    return db.collection("Orders").where("customer.id", "==", customer_id).get().then(response => {return response})
}
