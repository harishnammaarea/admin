import { MenuItemsCustomizer, MenuSection } from "./menu"

export type RestaurantType = "Vegeterian" | "Non-vegeterian" | "Both"

export type ContactNumberType = "Mobile number" | "Landline number"

export interface RestaurantDetails {
  id: string | number,
  name: string,
  category: RestaurantType,
  contactNumber: string,
  logo: string
  email: string
}

export interface Restaurants {
  _id: string,
  name: string,
  category: RestaurantType,
  mobileNumber: string,
  logo: string
  email: string
  count: number,
  ouletCount: number
  mainCoverPhoto: string
  createdAt: string
  businessModel: string
  cuisines: Cuisine[] 
  coverPhotos: string[]
  menuCount: number
  menuSections:MenuSection
  customizers:MenuItemsCustomizer[]
}

export interface Cuisine {
  _id: string
  name: string
}

export interface CoverPhotos {
  url: string,
  id: number
}
export interface OpeningHours {
  id: number,
  openingTime: string,
  closingTime: string,
  appliedDays: string
}

export interface BankDetails {
  id: number,
  restaurantId: number,
  accountNumber: string,
  accountHolderName: string,
  bankName: string,
  branch: string,
  ifscCode: string,
  bankCity: string,
  bankState: string,
  pancard: string,
}

export interface LocationDetails {
  id: number,
  restaurantId: number,
  buildingNo: string,
  addressLineOne: string,
  area: string,
  city: string,
  state: string,
  pincode: string,
  country: string,
  lat: string,
  lng: string,
}

export interface OwnerDetails {
  id: number,
  restaurantId: number,
  ownerName: string,
  ownerContactNumber: string,
  adharCardNo: string,
  ownerEmail: string,
  ownerPhotoUrl: string,
}

export interface Extras {
  id: number
  name: string,
  price: number,
  quantity: string,
  category: RestaurantType
}


export interface MainCourses {
  name: string
  url: string
  id: number
}
