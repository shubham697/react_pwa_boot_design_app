import {db, serverTime} from '../utils/firebase';

export const createMember = (member_params) =>{
    member_params.createdAt = serverTime
    return db.collection("Members").doc(member_params.id).set(member_params).then(response => {return response})
}

export const getMember = (phone) =>{
    return db.collection("Members").where("phone", "==", phone).get().then(response => {return response})
}

export const updateMember = (member_id, phone, name) =>{
    return db.collection("Members").doc(member_id).update({phone : phone , name : name}).then(response => {return response})
}