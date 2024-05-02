export const Endpoints = {
    getDietTypes: '/api/diettype',
    getProductTypes: '/api/producttype',
    getActivityLevels: '/api/activitylevel',
    getGeneralPurposeTypes: '/api/generalpurposetype',
    getUserByEmail: '/api/user',
    postRegistration: '/api/user/register',
    postLogin: '/api/user/login',
    postUpdateUserInfo: '/api/user/updateinfo',

    getDayPlanForDate: '/api/dayplan/day',
    postGenerateDayPlan: '/api/dayplan/generate',
    getAllMeals: '/api/meal/all',
    deleteMealFromPlan: '/api/dayplan/remove-meal',
    addMealToPlan: '/api/dayplan/add-meal',

    addProductsToUser: '/api/user/add-products',
    getUserProducts: '/api/user/products',
}