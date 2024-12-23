/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LogoutImport } from './routes/logout'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardHealthCareImport } from './routes/dashboard.health-care'
import { Route as DashboardCustomerImport } from './routes/dashboard.customer'
import { Route as authAuthImport } from './routes/(auth)/_auth'
import { Route as DashboardHealthCareIndexImport } from './routes/dashboard.health-care.index'
import { Route as DashboardHealthCareUserImport } from './routes/dashboard.health-care.user'
import { Route as DashboardHealthCareProfileImport } from './routes/dashboard.health-care.profile'
import { Route as DashboardHealthCareCustomersImport } from './routes/dashboard.health-care.customers'
import { Route as DashboardHealthCareAddCustomerImport } from './routes/dashboard.health-care.add-customer'
import { Route as DashboardCustomerProfileImport } from './routes/dashboard.customer.profile'
import { Route as authAuthSignUpImport } from './routes/(auth)/_auth.sign-up'
import { Route as authAuthLoginImport } from './routes/(auth)/_auth.login'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()

// Create/Update Routes

const authRoute = authImport.update({
  id: '/(auth)',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRoute = LogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardHealthCareRoute = DashboardHealthCareImport.update({
  id: '/dashboard/health-care',
  path: '/dashboard/health-care',
  getParentRoute: () => rootRoute,
} as any)

const DashboardCustomerRoute = DashboardCustomerImport.update({
  id: '/dashboard/customer',
  path: '/dashboard/customer',
  getParentRoute: () => rootRoute,
} as any)

const authAuthRoute = authAuthImport.update({
  id: '/_auth',
  getParentRoute: () => authRoute,
} as any)

const DashboardHealthCareIndexRoute = DashboardHealthCareIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardHealthCareRoute,
} as any)

const DashboardHealthCareUserRoute = DashboardHealthCareUserImport.update({
  id: '/user',
  path: '/user',
  getParentRoute: () => DashboardHealthCareRoute,
} as any)

const DashboardHealthCareProfileRoute = DashboardHealthCareProfileImport.update(
  {
    id: '/profile',
    path: '/profile',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any,
)

const DashboardHealthCareCustomersRoute =
  DashboardHealthCareCustomersImport.update({
    id: '/customers',
    path: '/customers',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardHealthCareAddCustomerRoute =
  DashboardHealthCareAddCustomerImport.update({
    id: '/add-customer',
    path: '/add-customer',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardCustomerProfileRoute = DashboardCustomerProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => DashboardCustomerRoute,
} as any)

const authAuthSignUpRoute = authAuthSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => authAuthRoute,
} as any)

const authAuthLoginRoute = authAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth': {
      id: '/(auth)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthImport
      parentRoute: typeof authRoute
    }
    '/dashboard/customer': {
      id: '/dashboard/customer'
      path: '/dashboard/customer'
      fullPath: '/dashboard/customer'
      preLoaderRoute: typeof DashboardCustomerImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/health-care': {
      id: '/dashboard/health-care'
      path: '/dashboard/health-care'
      fullPath: '/dashboard/health-care'
      preLoaderRoute: typeof DashboardHealthCareImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth/login': {
      id: '/(auth)/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authAuthLoginImport
      parentRoute: typeof authAuthImport
    }
    '/(auth)/_auth/sign-up': {
      id: '/(auth)/_auth/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof authAuthSignUpImport
      parentRoute: typeof authAuthImport
    }
    '/dashboard/customer/profile': {
      id: '/dashboard/customer/profile'
      path: '/profile'
      fullPath: '/dashboard/customer/profile'
      preLoaderRoute: typeof DashboardCustomerProfileImport
      parentRoute: typeof DashboardCustomerImport
    }
    '/dashboard/health-care/add-customer': {
      id: '/dashboard/health-care/add-customer'
      path: '/add-customer'
      fullPath: '/dashboard/health-care/add-customer'
      preLoaderRoute: typeof DashboardHealthCareAddCustomerImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/customers': {
      id: '/dashboard/health-care/customers'
      path: '/customers'
      fullPath: '/dashboard/health-care/customers'
      preLoaderRoute: typeof DashboardHealthCareCustomersImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/profile': {
      id: '/dashboard/health-care/profile'
      path: '/profile'
      fullPath: '/dashboard/health-care/profile'
      preLoaderRoute: typeof DashboardHealthCareProfileImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/user': {
      id: '/dashboard/health-care/user'
      path: '/user'
      fullPath: '/dashboard/health-care/user'
      preLoaderRoute: typeof DashboardHealthCareUserImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/': {
      id: '/dashboard/health-care/'
      path: '/'
      fullPath: '/dashboard/health-care/'
      preLoaderRoute: typeof DashboardHealthCareIndexImport
      parentRoute: typeof DashboardHealthCareImport
    }
  }
}

// Create and export the route tree

interface authAuthRouteChildren {
  authAuthLoginRoute: typeof authAuthLoginRoute
  authAuthSignUpRoute: typeof authAuthSignUpRoute
}

const authAuthRouteChildren: authAuthRouteChildren = {
  authAuthLoginRoute: authAuthLoginRoute,
  authAuthSignUpRoute: authAuthSignUpRoute,
}

const authAuthRouteWithChildren = authAuthRoute._addFileChildren(
  authAuthRouteChildren,
)

interface authRouteChildren {
  authAuthRoute: typeof authAuthRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authAuthRoute: authAuthRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

interface DashboardCustomerRouteChildren {
  DashboardCustomerProfileRoute: typeof DashboardCustomerProfileRoute
}

const DashboardCustomerRouteChildren: DashboardCustomerRouteChildren = {
  DashboardCustomerProfileRoute: DashboardCustomerProfileRoute,
}

const DashboardCustomerRouteWithChildren =
  DashboardCustomerRoute._addFileChildren(DashboardCustomerRouteChildren)

interface DashboardHealthCareRouteChildren {
  DashboardHealthCareAddCustomerRoute: typeof DashboardHealthCareAddCustomerRoute
  DashboardHealthCareCustomersRoute: typeof DashboardHealthCareCustomersRoute
  DashboardHealthCareProfileRoute: typeof DashboardHealthCareProfileRoute
  DashboardHealthCareUserRoute: typeof DashboardHealthCareUserRoute
  DashboardHealthCareIndexRoute: typeof DashboardHealthCareIndexRoute
}

const DashboardHealthCareRouteChildren: DashboardHealthCareRouteChildren = {
  DashboardHealthCareAddCustomerRoute: DashboardHealthCareAddCustomerRoute,
  DashboardHealthCareCustomersRoute: DashboardHealthCareCustomersRoute,
  DashboardHealthCareProfileRoute: DashboardHealthCareProfileRoute,
  DashboardHealthCareUserRoute: DashboardHealthCareUserRoute,
  DashboardHealthCareIndexRoute: DashboardHealthCareIndexRoute,
}

const DashboardHealthCareRouteWithChildren =
  DashboardHealthCareRoute._addFileChildren(DashboardHealthCareRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof authAuthRouteWithChildren
  '/logout': typeof LogoutRoute
  '/dashboard/customer': typeof DashboardCustomerRouteWithChildren
  '/dashboard/health-care': typeof DashboardHealthCareRouteWithChildren
  '/login': typeof authAuthLoginRoute
  '/sign-up': typeof authAuthSignUpRoute
  '/dashboard/customer/profile': typeof DashboardCustomerProfileRoute
  '/dashboard/health-care/add-customer': typeof DashboardHealthCareAddCustomerRoute
  '/dashboard/health-care/customers': typeof DashboardHealthCareCustomersRoute
  '/dashboard/health-care/profile': typeof DashboardHealthCareProfileRoute
  '/dashboard/health-care/user': typeof DashboardHealthCareUserRoute
  '/dashboard/health-care/': typeof DashboardHealthCareIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof authAuthRouteWithChildren
  '/logout': typeof LogoutRoute
  '/dashboard/customer': typeof DashboardCustomerRouteWithChildren
  '/login': typeof authAuthLoginRoute
  '/sign-up': typeof authAuthSignUpRoute
  '/dashboard/customer/profile': typeof DashboardCustomerProfileRoute
  '/dashboard/health-care/add-customer': typeof DashboardHealthCareAddCustomerRoute
  '/dashboard/health-care/customers': typeof DashboardHealthCareCustomersRoute
  '/dashboard/health-care/profile': typeof DashboardHealthCareProfileRoute
  '/dashboard/health-care/user': typeof DashboardHealthCareUserRoute
  '/dashboard/health-care': typeof DashboardHealthCareIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/logout': typeof LogoutRoute
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/dashboard/customer': typeof DashboardCustomerRouteWithChildren
  '/dashboard/health-care': typeof DashboardHealthCareRouteWithChildren
  '/(auth)/_auth/login': typeof authAuthLoginRoute
  '/(auth)/_auth/sign-up': typeof authAuthSignUpRoute
  '/dashboard/customer/profile': typeof DashboardCustomerProfileRoute
  '/dashboard/health-care/add-customer': typeof DashboardHealthCareAddCustomerRoute
  '/dashboard/health-care/customers': typeof DashboardHealthCareCustomersRoute
  '/dashboard/health-care/profile': typeof DashboardHealthCareProfileRoute
  '/dashboard/health-care/user': typeof DashboardHealthCareUserRoute
  '/dashboard/health-care/': typeof DashboardHealthCareIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/logout'
    | '/dashboard/customer'
    | '/dashboard/health-care'
    | '/login'
    | '/sign-up'
    | '/dashboard/customer/profile'
    | '/dashboard/health-care/add-customer'
    | '/dashboard/health-care/customers'
    | '/dashboard/health-care/profile'
    | '/dashboard/health-care/user'
    | '/dashboard/health-care/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/logout'
    | '/dashboard/customer'
    | '/login'
    | '/sign-up'
    | '/dashboard/customer/profile'
    | '/dashboard/health-care/add-customer'
    | '/dashboard/health-care/customers'
    | '/dashboard/health-care/profile'
    | '/dashboard/health-care/user'
    | '/dashboard/health-care'
  id:
    | '__root__'
    | '/'
    | '/logout'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/dashboard/customer'
    | '/dashboard/health-care'
    | '/(auth)/_auth/login'
    | '/(auth)/_auth/sign-up'
    | '/dashboard/customer/profile'
    | '/dashboard/health-care/add-customer'
    | '/dashboard/health-care/customers'
    | '/dashboard/health-care/profile'
    | '/dashboard/health-care/user'
    | '/dashboard/health-care/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LogoutRoute: typeof LogoutRoute
  authRoute: typeof authRouteWithChildren
  DashboardCustomerRoute: typeof DashboardCustomerRouteWithChildren
  DashboardHealthCareRoute: typeof DashboardHealthCareRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LogoutRoute: LogoutRoute,
  authRoute: authRouteWithChildren,
  DashboardCustomerRoute: DashboardCustomerRouteWithChildren,
  DashboardHealthCareRoute: DashboardHealthCareRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/logout",
        "/(auth)",
        "/dashboard/customer",
        "/dashboard/health-care"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/logout": {
      "filePath": "logout.tsx"
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_auth"
      ]
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_auth/login",
        "/(auth)/_auth/sign-up"
      ]
    },
    "/dashboard/customer": {
      "filePath": "dashboard.customer.tsx",
      "children": [
        "/dashboard/customer/profile"
      ]
    },
    "/dashboard/health-care": {
      "filePath": "dashboard.health-care.tsx",
      "children": [
        "/dashboard/health-care/add-customer",
        "/dashboard/health-care/customers",
        "/dashboard/health-care/profile",
        "/dashboard/health-care/user",
        "/dashboard/health-care/"
      ]
    },
    "/(auth)/_auth/login": {
      "filePath": "(auth)/_auth.login.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/sign-up": {
      "filePath": "(auth)/_auth.sign-up.tsx",
      "parent": "/(auth)/_auth"
    },
    "/dashboard/customer/profile": {
      "filePath": "dashboard.customer.profile.tsx",
      "parent": "/dashboard/customer"
    },
    "/dashboard/health-care/add-customer": {
      "filePath": "dashboard.health-care.add-customer.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/customers": {
      "filePath": "dashboard.health-care.customers.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/profile": {
      "filePath": "dashboard.health-care.profile.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/user": {
      "filePath": "dashboard.health-care.user.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/": {
      "filePath": "dashboard.health-care.index.tsx",
      "parent": "/dashboard/health-care"
    }
  }
}
ROUTE_MANIFEST_END */
