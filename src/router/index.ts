import { createRouter, createWebHistory } from "vue-router"

const dashboard = () => import("../components/dashboard.vue")
const transactionPage = () => import("../components/transactionPage.vue")


const route = [
    {
        path:"/",
        redirect:'/dashboard'
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: dashboard
    },
    {
        path:'/transactions',
        name:'transaction_page',
        component:transactionPage
    }

]

export const router = createRouter({
    history:createWebHistory(),
    routes:route
})