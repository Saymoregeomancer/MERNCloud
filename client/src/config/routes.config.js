export const routes = [
  {
    path: "/manager",
    element: "Manager",
    title: "Panel",
    icon: "RxDashboard",
  },
  {
    path: "/shared",
    element: "SharedContent",
    title: "Shared",
    icon: "RxShare1",
  },
  {
    path: "/settings",
    element: "Settings",
    title: "Settings",
    icon: "RxMixerVertical",
  },
];
export const routesAuth = [
  {
    path: "/*",
    element: "Authorization",
    title: "Panel",
    icon: "RxDashboard",
  },
];


