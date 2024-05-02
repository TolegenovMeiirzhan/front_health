import axios from 'axios'
import {Endpoints} from "../Assets/values/endpoints";

export async function api_GetAll(endpoint) {
    const promise = axios.get(endpoint);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetUserByEmail(email) {
    const promise = axios.get(`${Endpoints.getUserByEmail}?email=${email}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_PostUserRegistration(data) {
    const promise = axios.post(Endpoints.postRegistration, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_PostUserLogin(data) {
    const promise = axios.post(Endpoints.postLogin, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_PostUserUpdateInfo(data) {
    const promise = axios.post(Endpoints.postUpdateUserInfo, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_PostGenerateDayPlan(data) {
    const promise = axios.post(Endpoints.postGenerateDayPlan, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteMealFromPlan(mealId, periodId, dayPlanId) {
    const promise = axios.delete(`${Endpoints.deleteMealFromPlan}?mealId=${mealId}&PlanMealCollectionId=${periodId}&dayPlanId=${dayPlanId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_AddMealToPlan(data) {
    const promise = axios.post(Endpoints.addMealToPlan, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_AddProductsToUser(data) {
    const promise = axios.post(Endpoints.addProductsToUser, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetUserProducts(userId) {
    const promise = axios.get(`${Endpoints.getUserProducts}?userId=${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
