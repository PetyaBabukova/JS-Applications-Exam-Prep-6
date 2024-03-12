import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/products';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (itemId) => request.get(`${baseUrl}/${itemId}`)

export const create = (itemData) => request.post(baseUrl, itemData);

export const edit = (itemId, itemData) => request.put(`${baseUrl}/${itemId}`, itemData);

export const remove = (itemId) => request.del(`${baseUrl}/${itemId}`);

export const buy = (productId) => request.post('http://localhost:3030/data/bought', { productId });

export const getTotalBought = (productId) => request.get( `http://localhost:3030/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count` );

export const didUserBuy = (productId, userId)=> request.get( `http://localhost:3030/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count` );