import { createRouter, createWebHistory } from 'vue-router'
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Categories from "../views/Categories/Categories.vue";
import EditCategory from "../views/Categories/EditCategory.vue";
import Products from "../views/Products/Products.vue";
import EditProduct from "../views/Products/EditProduct.vue";
import store from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit-category/:id',
      name: 'EditCategory',
      component: EditCategory,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit-product/:id',
      name: 'EditProduct',
      component: EditProduct,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.token) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.state.token) {
      next({
        name: "Dashboard",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
