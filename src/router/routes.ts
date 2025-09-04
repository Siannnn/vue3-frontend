export const constantRoute = [
  {
    path: "/login",
    component: () => import("@/components/view/login/index.vue"),
    name: "Login",
    meta: {
      title: "登录",
      hidden: true, //不在菜单栏显示
      icon: "Promotion",
    },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    redirect: "/home",
    meta: { title: "", hidden: false, icon: "HomeFilled" },
    children: [
      {
        path: "/home",
        component: () => import("@/components/view/home/index.vue"),
        name: "Home",
        meta: { title: "首页", hidden: false, icon: "HomeFilled" },
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/components/view/screen/index.vue"),
    name: "Screen",
    meta: { title: "数据大屏", hidden: false, icon: "Platform" },
  },
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    redirect: "/acl/user",
    meta: { title: "权限管理", hidden: false, icon: "Lock" },
    children: [
      {
        path: "/acl/user",
        component: () => import("@/components/view/acl/user/index.vue"),
        name: "Aclr",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/components/view/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/components/view/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "More",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    redirect: "/product/trademark",
    meta: { title: "商品管理", hidden: false, icon: "Goods" },
    children: [
      {
        path: "/product/trademark",
        component: () =>
          import("@/components/view/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "ShoppingCartFull",
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/components/view/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "ChromeFilled",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/components/view/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/components/view/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "Orange",
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/components/view/404/index.vue"),
    name: "NotFound",
    meta: { hidden: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "all",
    meta: { hidden: true },
  },
];
