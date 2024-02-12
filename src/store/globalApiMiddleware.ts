import {Middleware, MiddlewareAPI} from "redux";

export const globalApiMiddleware: Middleware = (storeAPI: MiddlewareAPI) => (next) => async (action:any) => {

    if (action.type.endsWith('/fulfilled')) {
        // Handle global logic for successful API calls here
    } else if (action.type.endsWith('/rejected')) {
        // Handle global logic for failed API calls here, for example:
        const error = action.error;
        if (error.message === 'Unauthorized') {
            // Handle unauthorized globally
        }
    }

    return next(action);
};
