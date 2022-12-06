import {
    ADMIN_ROUTE,
    MAIN_ROUTE,
    LOGIN_ROUTE
} from "./utils/consts";
import Admin from "./page/Admin";
import Main from "./page/Main";
import Auth from "./page/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]
export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]