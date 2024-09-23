import { createRouter, createWebHashHistory } from "vue-router";

import { Home } from "../components/home.vue";
import { Permissao1 } from "../components/permissao1.vue";
import { Permissao2 } from "../components/permissao2.vue";
import { Permissao3 } from "../components/permissao3.vue";
import { Permissao3 } from "../components/permissao3.vue";
import { NotAllowed } from "../components/notAllowed.vue";
import { store } from './store'; // Importando o store para verificar autenticação


export const router = createRouter({ 
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name:'home',
        },
        {
            path: '/p1',
            component: Permissao1,
            name:'P1',
            beforeEnter: (to, from, next) => {
                // Verificar se está autenticado e tem perfil de usuário
                if (store.state.isAuthenticated && store.state.userProfiles.includes('admin')) {
                  next();
                } else {
                  next('/not-allowed');
                }
            }
        },
        {
            path: '/p2',
            component: Permissao2,
            name:'P2',
            beforeEnter: (to, from, next) => {
                // Verificar se está autenticado e tem perfil de usuário
                if (store.state.isAuthenticated && store.state.userProfiles.includes('usuario')) {
                  next();
                } else {
                  next('/not-allowed');
                }
            }
        },
        {
            path: '/p3',
            component: Permissao3,
            name:'P3',
            beforeEnter: (to, from, next) => {
                // Verificar se está autenticado e tem perfil de admin ou usuário
                if (
                  store.state.isAuthenticated &&
                  (store.state.userProfiles.includes('admin') || store.state.userProfiles.includes('usuario'))
                ) {
                  next();
                } else {
                  next('/not-allowed');
                }
            }
        },
        {
            path: '/not-allowed',
            component: NotAllowed,
            name: 'notAllowed'
        },
        {
        path: '/:catchAll(.*)',
        redirect: { name: 'notAllowed' } // Redireciona para a página inicial se a rota não for encontrada
        }
    ]});

// Verificar autenticação automática antes de cada navegação
router.beforeEach((to, from, next) => {
    // Se o usuário não está autenticado, tentar autenticar automaticamente
    if (!store.state.isAuthenticated) {
      store.dispatch('authenticateUser').then(() => {
        next(); // Continuar a navegação após a autenticação
      });
    } else {
      next(); // Se já está autenticado, prosseguir
    }
  });