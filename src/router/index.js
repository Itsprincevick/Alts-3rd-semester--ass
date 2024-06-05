import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading components
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const DetailsView = () => import('../views/DetailsView.vue');
const RepositoryView = () => import('../views/RepositoryView.vue');
const ErrorView = () => import('../views/ErrorView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home - My Portfolio'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About - My Portfolio'
    }
  },
  {
    path: '/details/:id',
    name: 'details',
    component: DetailsView,
    meta: {
      title: 'Details - My Portfolio'
    }
  },
  {
    path: '/repository',
    name: 'repository',
    component: RepositoryView,
    meta: {
      title: 'Repository - My Portfolio'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'errorPage',
    component: ErrorView,
    meta: {
      title: 'Error - Page Not Found'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation Guard to change page titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'My Portfolio';
  next();
});

export default router;

