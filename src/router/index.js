import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      // описание meta-тегов для каждой страницы
      title: 'Sweet Home - HOMEMADE BAKING IN CYPRUS',
      metaTags: [
        {
          name: 'description',
          content: 'The home page of our example app.'
        },
        {
          name: 'keywords',
          content:
            'Shortcrust pastry, Flaky pastry, Puff pastry, Meringue, Muos'
        },
        {
          property: 'og:title',
          content: 'HOMEMADE BAKING IN CYPRUS'
        },
        {
          property: 'og:description',
          content: 'The home page of our example app.'
        },
        {
          property: 'og:type',
          content: 'text/javascript'
        },
        {
          property: 'og:image',
          content: '/img/logo.png'
        }
      ]
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      // описание meta-тегов для каждой страницы
      title: 'Cart',
      metaTags: [
        {
          name: 'description',
          content: 'The home page of our example app.'
        },
        {
          name: 'keywords',
          content:
            'Shortcrust pastry, Flaky pastry, Puff pastry, Meringue, Muos'
        },
        {
          property: 'og:title',
          content: 'HOMEMADE BAKING IN CYPRUS'
        },
        {
          property: 'og:description',
          content: 'The home page of our example app.'
        },
        {
          property: 'og:type',
          content: 'text/javascript'
        },
        {
          property: 'og:image',
          content: '/img/logo.png'
        }
      ]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/thank',
    name: 'Thank',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "thank" */ '../views/Thank.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// функция которая встроит meta-теги в нужные места сайта
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  } else {
    document.title = previousNearestWithMeta.meta.title
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    el => el.parentNode.removeChild(el)
  )

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
