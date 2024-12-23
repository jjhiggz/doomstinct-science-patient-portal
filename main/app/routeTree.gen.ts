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
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardHealthCareImport } from './routes/dashboard/health-care'
import { Route as DashboardCustomerImport } from './routes/dashboard/customer'
import { Route as authAuthImport } from './routes/(auth)/_auth'
import { Route as DashboardHealthCareIndexImport } from './routes/dashboard/health-care/index'
import { Route as DashboardCustomerIndexImport } from './routes/dashboard/customer/index'
import { Route as DashboardHealthCareUserImport } from './routes/dashboard/health-care/user'
import { Route as DashboardHealthCareProfileImport } from './routes/dashboard/health-care/profile'
import { Route as DashboardHealthCareFinancialsImport } from './routes/dashboard/health-care/financials'
import { Route as DashboardHealthCareAddCustomerImport } from './routes/dashboard/health-care/add-customer'
import { Route as DashboardCustomerProvidersImport } from './routes/dashboard/customer/providers'
import { Route as DashboardCustomerProfileImport } from './routes/dashboard/customer/profile'
import { Route as DashboardCustomerPetsImport } from './routes/dashboard/customer/pets'
import { Route as authAuthSignUpImport } from './routes/(auth)/_auth.sign-up'
import { Route as authAuthLoginImport } from './routes/(auth)/_auth.login'
import { Route as DashboardHealthCareCustomersIndexImport } from './routes/dashboard/health-care/customers.index'
import { Route as DashboardHealthCareCustomersCustomerIdImport } from './routes/dashboard/health-care/customers.$customerId'
import { Route as DashboardHealthCareChatChatIdImport } from './routes/dashboard/health-care/chat.$chatId'
import { Route as DashboardCustomerChatChatIdImport } from './routes/dashboard/customer/chat.$chatId'

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

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardHealthCareRoute = DashboardHealthCareImport.update({
  id: '/health-care',
  path: '/health-care',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardCustomerRoute = DashboardCustomerImport.update({
  id: '/customer',
  path: '/customer',
  getParentRoute: () => DashboardRoute,
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

const DashboardCustomerIndexRoute = DashboardCustomerIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardCustomerRoute,
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

const DashboardHealthCareFinancialsRoute =
  DashboardHealthCareFinancialsImport.update({
    id: '/financials',
    path: '/financials',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardHealthCareAddCustomerRoute =
  DashboardHealthCareAddCustomerImport.update({
    id: '/add-customer',
    path: '/add-customer',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardCustomerProvidersRoute = DashboardCustomerProvidersImport.update(
  {
    id: '/providers',
    path: '/providers',
    getParentRoute: () => DashboardCustomerRoute,
  } as any,
)

const DashboardCustomerProfileRoute = DashboardCustomerProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => DashboardCustomerRoute,
} as any)

const DashboardCustomerPetsRoute = DashboardCustomerPetsImport.update({
  id: '/pets',
  path: '/pets',
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

const DashboardHealthCareCustomersIndexRoute =
  DashboardHealthCareCustomersIndexImport.update({
    id: '/customers/',
    path: '/customers/',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardHealthCareCustomersCustomerIdRoute =
  DashboardHealthCareCustomersCustomerIdImport.update({
    id: '/customers/$customerId',
    path: '/customers/$customerId',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardHealthCareChatChatIdRoute =
  DashboardHealthCareChatChatIdImport.update({
    id: '/chat/$chatId',
    path: '/chat/$chatId',
    getParentRoute: () => DashboardHealthCareRoute,
  } as any)

const DashboardCustomerChatChatIdRoute =
  DashboardCustomerChatChatIdImport.update({
    id: '/chat/$chatId',
    path: '/chat/$chatId',
    getParentRoute: () => DashboardCustomerRoute,
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
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
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
      path: '/customer'
      fullPath: '/dashboard/customer'
      preLoaderRoute: typeof DashboardCustomerImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/health-care': {
      id: '/dashboard/health-care'
      path: '/health-care'
      fullPath: '/dashboard/health-care'
      preLoaderRoute: typeof DashboardHealthCareImport
      parentRoute: typeof DashboardImport
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
    '/dashboard/customer/pets': {
      id: '/dashboard/customer/pets'
      path: '/pets'
      fullPath: '/dashboard/customer/pets'
      preLoaderRoute: typeof DashboardCustomerPetsImport
      parentRoute: typeof DashboardCustomerImport
    }
    '/dashboard/customer/profile': {
      id: '/dashboard/customer/profile'
      path: '/profile'
      fullPath: '/dashboard/customer/profile'
      preLoaderRoute: typeof DashboardCustomerProfileImport
      parentRoute: typeof DashboardCustomerImport
    }
    '/dashboard/customer/providers': {
      id: '/dashboard/customer/providers'
      path: '/providers'
      fullPath: '/dashboard/customer/providers'
      preLoaderRoute: typeof DashboardCustomerProvidersImport
      parentRoute: typeof DashboardCustomerImport
    }
    '/dashboard/health-care/add-customer': {
      id: '/dashboard/health-care/add-customer'
      path: '/add-customer'
      fullPath: '/dashboard/health-care/add-customer'
      preLoaderRoute: typeof DashboardHealthCareAddCustomerImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/financials': {
      id: '/dashboard/health-care/financials'
      path: '/financials'
      fullPath: '/dashboard/health-care/financials'
      preLoaderRoute: typeof DashboardHealthCareFinancialsImport
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
    '/dashboard/customer/': {
      id: '/dashboard/customer/'
      path: '/'
      fullPath: '/dashboard/customer/'
      preLoaderRoute: typeof DashboardCustomerIndexImport
      parentRoute: typeof DashboardCustomerImport
    }
    '/dashboard/health-care/': {
      id: '/dashboard/health-care/'
      path: '/'
      fullPath: '/dashboard/health-care/'
      preLoaderRoute: typeof DashboardHealthCareIndexImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/customer/chat/$chatId': {
      id: '/dashboard/customer/chat/$chatId'
      path: '/chat/$chatId'
      fullPath: '/dashboard/customer/chat/$chatId'
      preLoaderRoute: typeof DashboardCustomerChatChatIdImport
      parentRoute: typeof DashboardCustomerImport
    }
    '/dashboard/health-care/chat/$chatId': {
      id: '/dashboard/health-care/chat/$chatId'
      path: '/chat/$chatId'
      fullPath: '/dashboard/health-care/chat/$chatId'
      preLoaderRoute: typeof DashboardHealthCareChatChatIdImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/customers/$customerId': {
      id: '/dashboard/health-care/customers/$customerId'
      path: '/customers/$customerId'
      fullPath: '/dashboard/health-care/customers/$customerId'
      preLoaderRoute: typeof DashboardHealthCareCustomersCustomerIdImport
      parentRoute: typeof DashboardHealthCareImport
    }
    '/dashboard/health-care/customers/': {
      id: '/dashboard/health-care/customers/'
      path: '/customers'
      fullPath: '/dashboard/health-care/customers'
      preLoaderRoute: typeof DashboardHealthCareCustomersIndexImport
      parentRoute: typeof DashboardHealthCareImport
    }
  }
}

// Create and export the route tree

interface DashboardCustomerRouteChildren {
  DashboardCustomerPetsRoute: typeof DashboardCustomerPetsRoute
  DashboardCustomerProfileRoute: typeof DashboardCustomerProfileRoute
  DashboardCustomerProvidersRoute: typeof DashboardCustomerProvidersRoute
  DashboardCustomerIndexRoute: typeof DashboardCustomerIndexRoute
  DashboardCustomerChatChatIdRoute: typeof DashboardCustomerChatChatIdRoute
}

const DashboardCustomerRouteChildren: DashboardCustomerRouteChildren = {
  DashboardCustomerPetsRoute: DashboardCustomerPetsRoute,
  DashboardCustomerProfileRoute: DashboardCustomerProfileRoute,
  DashboardCustomerProvidersRoute: DashboardCustomerProvidersRoute,
  DashboardCustomerIndexRoute: DashboardCustomerIndexRoute,
  DashboardCustomerChatChatIdRoute: DashboardCustomerChatChatIdRoute,
}

const DashboardCustomerRouteWithChildren =
  DashboardCustomerRoute._addFileChildren(DashboardCustomerRouteChildren)

interface DashboardHealthCareRouteChildren {
  DashboardHealthCareAddCustomerRoute: typeof DashboardHealthCareAddCustomerRoute
  DashboardHealthCareFinancialsRoute: typeof DashboardHealthCareFinancialsRoute
  DashboardHealthCareProfileRoute: typeof DashboardHealthCareProfileRoute
  DashboardHealthCareUserRoute: typeof DashboardHealthCareUserRoute
  DashboardHealthCareIndexRoute: typeof DashboardHealthCareIndexRoute
  DashboardHealthCareChatChatIdRoute: typeof DashboardHealthCareChatChatIdRoute
  DashboardHealthCareCustomersCustomerIdRoute: typeof DashboardHealthCareCustomersCustomerIdRoute
  DashboardHealthCareCustomersIndexRoute: typeof DashboardHealthCareCustomersIndexRoute
}

const DashboardHealthCareRouteChildren: DashboardHealthCareRouteChildren = {
  DashboardHealthCareAddCustomerRoute: DashboardHealthCareAddCustomerRoute,
  DashboardHealthCareFinancialsRoute: DashboardHealthCareFinancialsRoute,
  DashboardHealthCareProfileRoute: DashboardHealthCareProfileRoute,
  DashboardHealthCareUserRoute: DashboardHealthCareUserRoute,
  DashboardHealthCareIndexRoute: DashboardHealthCareIndexRoute,
  DashboardHealthCareChatChatIdRoute: DashboardHealthCareChatChatIdRoute,
  DashboardHealthCareCustomersCustomerIdRoute:
    DashboardHealthCareCustomersCustomerIdRoute,
  DashboardHealthCareCustomersIndexRoute:
    DashboardHealthCareCustomersIndexRoute,
}

const DashboardHealthCareRouteWithChildren =
  DashboardHealthCareRoute._addFileChildren(DashboardHealthCareRouteChildren)

interface DashboardRouteChildren {
  DashboardCustomerRoute: typeof DashboardCustomerRouteWithChildren
  DashboardHealthCareRoute: typeof DashboardHealthCareRouteWithChildren
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardCustomerRoute: DashboardCustomerRouteWithChildren,
  DashboardHealthCareRoute: DashboardHealthCareRouteWithChildren,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

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

export interface FileRoutesByFullPath {
  '/': typeof authAuthRouteWithChildren
  '/dashboard': typeof DashboardRouteWithChildren
  '/logout': typeof LogoutRoute
  '/dashboard/customer': typeof DashboardCustomerRouteWithChildren
  '/dashboard/health-care': typeof DashboardHealthCareRouteWithChildren
  '/login': typeof authAuthLoginRoute
  '/sign-up': typeof authAuthSignUpRoute
  '/dashboard/customer/pets': typeof DashboardCustomerPetsRoute
  '/dashboard/customer/profile': typeof DashboardCustomerProfileRoute
  '/dashboard/customer/providers': typeof DashboardCustomerProvidersRoute
  '/dashboard/health-care/add-customer': typeof DashboardHealthCareAddCustomerRoute
  '/dashboard/health-care/financials': typeof DashboardHealthCareFinancialsRoute
  '/dashboard/health-care/profile': typeof DashboardHealthCareProfileRoute
  '/dashboard/health-care/user': typeof DashboardHealthCareUserRoute
  '/dashboard/customer/': typeof DashboardCustomerIndexRoute
  '/dashboard/health-care/': typeof DashboardHealthCareIndexRoute
  '/dashboard/customer/chat/$chatId': typeof DashboardCustomerChatChatIdRoute
  '/dashboard/health-care/chat/$chatId': typeof DashboardHealthCareChatChatIdRoute
  '/dashboard/health-care/customers/$customerId': typeof DashboardHealthCareCustomersCustomerIdRoute
  '/dashboard/health-care/customers': typeof DashboardHealthCareCustomersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof authAuthRouteWithChildren
  '/dashboard': typeof DashboardRouteWithChildren
  '/logout': typeof LogoutRoute
  '/login': typeof authAuthLoginRoute
  '/sign-up': typeof authAuthSignUpRoute
  '/dashboard/customer/pets': typeof DashboardCustomerPetsRoute
  '/dashboard/customer/profile': typeof DashboardCustomerProfileRoute
  '/dashboard/customer/providers': typeof DashboardCustomerProvidersRoute
  '/dashboard/health-care/add-customer': typeof DashboardHealthCareAddCustomerRoute
  '/dashboard/health-care/financials': typeof DashboardHealthCareFinancialsRoute
  '/dashboard/health-care/profile': typeof DashboardHealthCareProfileRoute
  '/dashboard/health-care/user': typeof DashboardHealthCareUserRoute
  '/dashboard/customer': typeof DashboardCustomerIndexRoute
  '/dashboard/health-care': typeof DashboardHealthCareIndexRoute
  '/dashboard/customer/chat/$chatId': typeof DashboardCustomerChatChatIdRoute
  '/dashboard/health-care/chat/$chatId': typeof DashboardHealthCareChatChatIdRoute
  '/dashboard/health-care/customers/$customerId': typeof DashboardHealthCareCustomersCustomerIdRoute
  '/dashboard/health-care/customers': typeof DashboardHealthCareCustomersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/logout': typeof LogoutRoute
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/dashboard/customer': typeof DashboardCustomerRouteWithChildren
  '/dashboard/health-care': typeof DashboardHealthCareRouteWithChildren
  '/(auth)/_auth/login': typeof authAuthLoginRoute
  '/(auth)/_auth/sign-up': typeof authAuthSignUpRoute
  '/dashboard/customer/pets': typeof DashboardCustomerPetsRoute
  '/dashboard/customer/profile': typeof DashboardCustomerProfileRoute
  '/dashboard/customer/providers': typeof DashboardCustomerProvidersRoute
  '/dashboard/health-care/add-customer': typeof DashboardHealthCareAddCustomerRoute
  '/dashboard/health-care/financials': typeof DashboardHealthCareFinancialsRoute
  '/dashboard/health-care/profile': typeof DashboardHealthCareProfileRoute
  '/dashboard/health-care/user': typeof DashboardHealthCareUserRoute
  '/dashboard/customer/': typeof DashboardCustomerIndexRoute
  '/dashboard/health-care/': typeof DashboardHealthCareIndexRoute
  '/dashboard/customer/chat/$chatId': typeof DashboardCustomerChatChatIdRoute
  '/dashboard/health-care/chat/$chatId': typeof DashboardHealthCareChatChatIdRoute
  '/dashboard/health-care/customers/$customerId': typeof DashboardHealthCareCustomersCustomerIdRoute
  '/dashboard/health-care/customers/': typeof DashboardHealthCareCustomersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/logout'
    | '/dashboard/customer'
    | '/dashboard/health-care'
    | '/login'
    | '/sign-up'
    | '/dashboard/customer/pets'
    | '/dashboard/customer/profile'
    | '/dashboard/customer/providers'
    | '/dashboard/health-care/add-customer'
    | '/dashboard/health-care/financials'
    | '/dashboard/health-care/profile'
    | '/dashboard/health-care/user'
    | '/dashboard/customer/'
    | '/dashboard/health-care/'
    | '/dashboard/customer/chat/$chatId'
    | '/dashboard/health-care/chat/$chatId'
    | '/dashboard/health-care/customers/$customerId'
    | '/dashboard/health-care/customers'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard'
    | '/logout'
    | '/login'
    | '/sign-up'
    | '/dashboard/customer/pets'
    | '/dashboard/customer/profile'
    | '/dashboard/customer/providers'
    | '/dashboard/health-care/add-customer'
    | '/dashboard/health-care/financials'
    | '/dashboard/health-care/profile'
    | '/dashboard/health-care/user'
    | '/dashboard/customer'
    | '/dashboard/health-care'
    | '/dashboard/customer/chat/$chatId'
    | '/dashboard/health-care/chat/$chatId'
    | '/dashboard/health-care/customers/$customerId'
    | '/dashboard/health-care/customers'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/logout'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/dashboard/customer'
    | '/dashboard/health-care'
    | '/(auth)/_auth/login'
    | '/(auth)/_auth/sign-up'
    | '/dashboard/customer/pets'
    | '/dashboard/customer/profile'
    | '/dashboard/customer/providers'
    | '/dashboard/health-care/add-customer'
    | '/dashboard/health-care/financials'
    | '/dashboard/health-care/profile'
    | '/dashboard/health-care/user'
    | '/dashboard/customer/'
    | '/dashboard/health-care/'
    | '/dashboard/customer/chat/$chatId'
    | '/dashboard/health-care/chat/$chatId'
    | '/dashboard/health-care/customers/$customerId'
    | '/dashboard/health-care/customers/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  LogoutRoute: typeof LogoutRoute
  authRoute: typeof authRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
  LogoutRoute: LogoutRoute,
  authRoute: authRouteWithChildren,
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
        "/dashboard",
        "/logout",
        "/(auth)"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/customer",
        "/dashboard/health-care"
      ]
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
      "filePath": "dashboard/customer.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/customer/pets",
        "/dashboard/customer/profile",
        "/dashboard/customer/providers",
        "/dashboard/customer/",
        "/dashboard/customer/chat/$chatId"
      ]
    },
    "/dashboard/health-care": {
      "filePath": "dashboard/health-care.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/health-care/add-customer",
        "/dashboard/health-care/financials",
        "/dashboard/health-care/profile",
        "/dashboard/health-care/user",
        "/dashboard/health-care/",
        "/dashboard/health-care/chat/$chatId",
        "/dashboard/health-care/customers/$customerId",
        "/dashboard/health-care/customers/"
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
    "/dashboard/customer/pets": {
      "filePath": "dashboard/customer/pets.tsx",
      "parent": "/dashboard/customer"
    },
    "/dashboard/customer/profile": {
      "filePath": "dashboard/customer/profile.tsx",
      "parent": "/dashboard/customer"
    },
    "/dashboard/customer/providers": {
      "filePath": "dashboard/customer/providers.tsx",
      "parent": "/dashboard/customer"
    },
    "/dashboard/health-care/add-customer": {
      "filePath": "dashboard/health-care/add-customer.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/financials": {
      "filePath": "dashboard/health-care/financials.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/profile": {
      "filePath": "dashboard/health-care/profile.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/user": {
      "filePath": "dashboard/health-care/user.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/customer/": {
      "filePath": "dashboard/customer/index.tsx",
      "parent": "/dashboard/customer"
    },
    "/dashboard/health-care/": {
      "filePath": "dashboard/health-care/index.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/customer/chat/$chatId": {
      "filePath": "dashboard/customer/chat.$chatId.tsx",
      "parent": "/dashboard/customer"
    },
    "/dashboard/health-care/chat/$chatId": {
      "filePath": "dashboard/health-care/chat.$chatId.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/customers/$customerId": {
      "filePath": "dashboard/health-care/customers.$customerId.tsx",
      "parent": "/dashboard/health-care"
    },
    "/dashboard/health-care/customers/": {
      "filePath": "dashboard/health-care/customers.index.tsx",
      "parent": "/dashboard/health-care"
    }
  }
}
ROUTE_MANIFEST_END */
