import { createRouter, createWebHistory } from "vue-router"

const dashboard = () => import("../components/dashboard.vue")

const route = [
    {
        path:"/",
        redirect:'/dashboard'
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: dashboard
    }

]

export const router = createRouter({
    history:createWebHistory(),
    routes:route
})