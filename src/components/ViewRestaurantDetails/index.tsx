import clsx from "clsx"
import { Restaurants } from "core/models/restaurants"
import CommonCard from "shared/components/CommonCard"

interface ViewRestaurantDetailsProps {
  className?: string
  restaurant: Restaurants
}

export default function ViewRestaurantBasicDetails({ className, restaurant }: ViewRestaurantDetailsProps) {

  return (
    <CommonCard
      innerContainerClassName="view-restaurant-basic-details-inner-main"
      className={clsx("view-restaurant-basic-details-main-container", className)}>
      <div className="view-restaurant-basic-details-logo-main-cover-photo-container">
        <div className="view-restaurant-basic-details-profile-logo-container">
          <img
            className="view-restaurant-basic-details-profile-logo-photo"
            src={restaurant.logo} alt="" width={100} height={100} />
        </div>
        <img src={restaurant.mainCoverPhoto} alt=""
          className="view-restaurant-basic-details-main-cover-photo" />
      </div>
      <div className="view-restaurant-basic-details-profile-container">
        <h1>{restaurant.name.toUpperCase()}</h1>
        <div>
          <p className="view-restaurant-basic-details-profile-bio-details">
            Contact Number
          </p>
          <h4>
            +91-8073508926
          </h4>
        </div>
      </div>
    </CommonCard>)
}