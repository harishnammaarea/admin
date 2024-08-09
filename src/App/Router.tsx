import Layout from "layout"
import LandingPage from "pages/LandingPage"
import Login from "pages/Login"
import { Suspense, lazy } from "react"
import NotFound from "components/NotFound";
import { Route, Switch } from "react-router-dom"
import Loader from "./Loader";

const DashboardPage = lazy(() => import("pages/Overview"))
const RestaurantsPage = lazy(() => import("pages/Restaurants"))
const EditResturantBasicDetailsPage = lazy(() => import("pages/EditRestaurantBasicDetails"))
const ViewRestaurantPage = lazy(() => import("pages/ViewRestuarant"))
const OnBoardingPage = lazy(() => import("pages/Onboarding"))
const AddRestaurantLocationDetailsPage = lazy(() => import("pages/UpdateRestaurantLocationDetails"))
const StartApplicationProcessPage = lazy(() => import("pages/StartOnBoardingProcess"))
const MenuExtrasPage = lazy(() => import("pages/UpdateMenuExtras"))

const WrapperdRoutes = () => (
  <Layout>
    <Switch>
      <Route exact path="/overview" component={DashboardPage} />
      <Route exact path="/restaurants" component={RestaurantsPage} />
      <Route exact path="/onboarding/start-onboarding-process/:stage" component={StartApplicationProcessPage} />
      <Route exact path="/application-hub/add-restaurant-location-details" component={AddRestaurantLocationDetailsPage} />
      <Route exact path="/admin/restaurants/edit-restaurant-basic-details/:id" component={EditResturantBasicDetailsPage} />
      <Route exact path="/admin/restaurants/view-restaurant/:id" component={ViewRestaurantPage} />
      <Route exact path="/admin/restaurants/update-menu-extras/:id" component={MenuExtrasPage} />
      <Route exact path="/onboarding" component={OnBoardingPage} />
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