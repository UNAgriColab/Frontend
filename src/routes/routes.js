import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import BuyProduct from "../pages/BuyProduct";
import OfferProduct from "@/pages/OfferProduct.vue";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ShoppingCar from "../pages/ShoppingCar";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "buyproduct",
        name: "BuyProduct",
        component: BuyProduct
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      },
      {
        path: "offerProduct",
        name: "OfferProduct",
        component: OfferProduct
      },
      {
        path: "shoppingCar",
        name: "Shopping Car",
        component: ShoppingCar
      }
    ]
  }
];

export default routes;