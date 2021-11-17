import { createRouter, createWebHistory } from "vue-router"

const dashboard = () => import("../components/dashboard.vue")
const transactionPage = () => import("../components/transactionPage.vue")
const operationPage = () => import("../components/operationPage.vue")
const loginPage = () => import("../components/login.vue")
const registerPage = () => import("../components/registerPage.vue")
const frame = () => import("../components/frame.vue")
const route = [
    {
        path:"/",
        redirect:'/login'
    },
    {
        path:"/login",
        name:'login',
        component:loginPage

    },
    {
        path:"/registerPage",
        name:'register',
        component:registerPage
    },
    {
        path:'/home',
        component: frame,
        children:[
            {
                path:'/dashboard',
                name:'dashboard',
                component:dashboard
            },
            {
                path:'/transactions',
                name:'transaction_page',
                component:transactionPage
            },
            {
                path:'/operations',
                name:'operation_page',
                component:operationPage
            }
        ]
    },
    
]

export const router = createRouter({
    history:createWebHistory(),
    routes:route
})