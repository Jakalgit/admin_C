import {$host} from "../index";

/* Работа с цветами */
export const createItemColor = async (formData) => {
    const {data} = await $host.post('api/color/', formData, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeImg_1 = async (formData) => {
    const {data} = await $host.post('api/color/change/img1', formData, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeImg_2 = async (formData) => {
    const {data} = await $host.post('api/color/change/img2', formData, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeImg_3 = async (formData) => {
    const {data} = await $host.post('api/color/change/img3', formData, {headers: {authorization: 'ADMIN'}})
    return data
}

export const changeImg_4 = async (formData) => {
    const {data} = await $host.post('api/color/change/img4', formData, {headers: {authorization: 'ADMIN'}})
    return data
}

export const fetchColor = async (itemId) => {
    const {data} = await $host.get('api/color/get', {params: {itemId}})
    return data
}