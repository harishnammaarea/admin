import clsx from "clsx"
import UseIsMobile from "core/hooks/IsMobile";
import dayjs from "dayjs";
import CommonCard from "shared/components/CommonCard";
import BusinessIcon from "shared/icons/Business";
import CalenderIcon from "shared/icons/Calender";
import CategoryIcon from "shared/icons/Category";
import EarthIcon from "shared/icons/Earth";
import MobileIcon from "shared/icons/Mobile";
import DefaultLogo from "assets/icons/logo-default.png";
import Button from "shared/components/Button";
import EditIcon from "shared/icons/Edit";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import { Link } from "react-router-dom";

interface RestaurantHeaderProps {
  className?: String
  name: string
  logo: string
  createdAt: string
  mobileNumber: string
  email: string
  category: string
  cuisines: { _id: string, name: string }[]
  businessModal: string
}

export default function RestaurantInfoCard({
  className,
  name,
  logo,
  category,
  createdAt,
  cuisines,
  businessModal,
  mobileNumber }: RestaurantHeaderProps) {
  const isMobile = UseIsMobile()

  function getDate() {
    const date = dayjs(createdAt)
    const day = date.format("DD")
    const month = date.format("MM")
    const year = date.format("YYYY")

    return `${year}-${month}-${day}`
  }

  function getLogo() {
    return (
      <div className="restaurant-info-card-logo-container">
        <img src={logo || DefaultLogo} alt="" className="restaurant-info-card-logo" />
      </div>
    )
  }

  return (
    <CommonCard innerContainerClassName={clsx("restaurant-info-card-container", className)}>
      {isMobile && getLogo()}
      <div className="restaurant-info-card-basic-info-container">
        <h1>{name}</h1>
        <p className="restaurant-info-card-basic-info-other-details">
          <span className="restaurant-info-card-basic-info-span">
            <CalenderIcon color="#5449f0" className="restaurant-info-card-basic-info-timestage-icon"
              fontSize="2rem" />
            &nbsp;{getDate()}
            <span className="restaurant-info-card-basic-info-star"> * </span>
            <MobileIcon color="#5449f0" fontSize="1.3rem" />&nbsp;+91-{mobileNumber}
            <span className="restaurant-info-card-basic-info-star"> * </span>
            <CategoryIcon color="#5449f0" fontSize="1.3rem" />&nbsp;{category}
            <span className="restaurant-info-card-basic-info-star"> * </span>
            <EarthIcon color="#5449f0" fontSize="1.4rem" />&nbsp;
            {cuisines.map((cuisine, index) => {
              if (index === cuisines.length - 1)
                return cuisine.name
              else
                return `${cuisine.name},`

            })}
            <span className="restaurant-info-card-basic-info-star"> * </span>
            <BusinessIcon color="#5449f0" />&nbsp;{businessModal}
          </span>
        </p>
        <div className="restaurant-info-card-basic-info-btns-container">
          <Link to="">
            <Button
              iconPosition="end"
              icon={<EditIcon fontSize="1.2rem" color="#ffffff" />}
              label="Update" />
          </Link>
          <Link to="">
            <Button
              iconPosition="end"
              icon={<AddIconCircularIcon color="#ffffff" />}
              label="Add Outlet" />
          </Link>
        </div>
      </div>
      {!isMobile && getLogo()}
    </CommonCard>)
}
