import {$host} from "../index";

export const changeChecked = async (checked, id) => {
    const {data} = await $host.put('/api/request/change-checked/', {checked, id}, {headers: {authorization: 'ADMIN'}})
    return data
}

export const deleteRequest = async (id) => {
    const {data} = await $host.delete('/api/request/delete/', {params: {id}, headers: {authorization: 'ADMIN'}})
    return data
}

export const getAllRequests = async () => {
    const {data} = await $host.get('/api/request/')
    return data
}