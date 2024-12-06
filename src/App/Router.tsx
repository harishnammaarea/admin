import Layout from "layout"
import LandingPage from "pages/LandingPage"
import Login from "pages/Login"
import { Suspense, lazy } from "react"
import NotFound from "components/NotFound";
import { Route, Switch } from "react-router-dom"
import Loader from "./Loader";

const DashboardPage = lazy(() => import("pages/Overview"))
const AddAreaAdminPage = lazy(() => import("pages/AddAreaAdmin"))
const CreateRestaurantPage = lazy(() => import("pages/CreateRestaurant"))
const RestaurantsPage = lazy(() => import("pages/Restaurants"))
const ViewRestaurantPage = lazy(() => import("pages/ViewRestuarant"))
const UpdateRestaurantPage = lazy(() => import("pages/UpdateRestaurant"))
const MenuItemsPage = lazy(() => import("pages/MenuItems"))
const MainSectionsPage = lazy(() => import("pages/MenuSections"))
const ViewAllMenuItems = lazy(() => import("pages/ViewAllMenuItems"))
const CreateMenuItemsPage = lazy(() => import("pages/CreateMenuItem"))
const UpdateMenuItemBasicPage = lazy(() => import("pages/UpdateMenuItemBasicDetails"))
const CreateMenuSectionPage = lazy(() => import("pages/CreateMenuSection"))
const UpdateMenuSectionPage = lazy(() => import("pages/UpdateMenuSection"))

const WrapperdRoutes = () => (
  <Layout>
    <Switch>
      <Route exact path="/overview" component={DashboardPage} />
      <Route exact path="/restaurants/create-restaurant" component={CreateRestaurantPage} />
      <Route exact path="/restaurants/menu-items/:id" component={MenuItemsPage} />
      <Route exact path="/restaurants/update-restaurant/:id" component={UpdateRestaurantPage} />
      <Route exact path="/restaurants" component={RestaurantsPage} />
      <Route exact path="/restaurants/view-restaurants/:id" component={ViewRestaurantPage} />
      <Route exact path="/area-admin/add-area-admin" component={AddAreaAdminPage} />
      <Route exact path="/restaurants/menu-sections/:id" component={MainSectionsPage} />
      <Route exact path="/restaurants/menu-items/:id" component={MenuItemsPage} />
      <Route exact path="/restaurants/menu-items/view-all-menu-items/:id" component={ViewAllMenuItems} />
      <Route exact path="/restaurants/menu-item/create-menu-item/:id" component={CreateMenuItemsPage} />
      <Route exact path="/restaurants/menu-item/update-basic-details/:restaurantId/:id" component={UpdateMenuItemBasicPage} />
      <Route exact path="/restaurants/menu-section/create/:id" component={CreateMenuSectionPage} />
      <Route exact path="/restaurants/menu-section/update/:id" component={UpdateMenuSectionPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Layout>
)

const Router = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <WrapperdRoutes />
    </Switch>
  </Suspense>
)

export default Router 