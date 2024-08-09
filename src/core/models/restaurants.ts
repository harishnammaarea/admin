export type RestaurantType = "Vegeterian" | "Non-vegeterian" | "Both"

export type ContactNumberType = "Mobile number" | "Landline number"

export interface RestaurantDetails {
  id: string | number,
  name: string,
  category: RestaurantType,
  contactNumber: string,
  contactNumberType: ContactNumberType,
  alternateContactNumber: string,
  alternateContactNumberType: ContactNumberType,
  email: string,
  openingTime: string,
  closingTime: string,
  closedOn: string,
  gstNo: string,
  cuisines: string,
  logo: string | null,
  verified: boolean,
  fssaiNumber: string,
  locationDetails: LocationDetails,
  ownerDetails: OwnerDetails,
  bankDetails: BankDetails,
  menuSections: MenuSections[],
  mainCourses: string,
  openingHours: OpeningHours[],
  coverPhotos: CoverPhotos[]
}

export interface BasicDetails {
  id?: string | number,
  name: string,
  category: RestaurantType,
  contactNumber: string,
  contactNumberType: ContactNumberType,
  alternateContactNumber: string,
  alternateContactNumberType: ContactNumberType,
  email: string,
  openingTime: string,
  closingTime: string,
  closedOn: string,
  gstNo: string,
  cuisines: string,
  logo: string | null,
  verified: boolean,
  fssaiNumber: string,
  city: string
  state: string
  mainCourses: string
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

export interface MenuSections {
  id: number | string,
  name: string,
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
  id:number
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

export type MenuCategory = Omit<RestaurantType, "Both">

export type MenuPhotoUrls = {
  id: number,
  url: string
}

export type MenuItemAvailabeHours = {
  id: number,
  startTime: string,
  endTime: string
}

export type MenuItemExtras = {
  id: number,
  name: string,
  price: number,
  quantity: string,
  category: MenuCategory
}

export interface Menus {
  id: number,
  name: string,
  category: MenuCategory,
  description: string,
  ingredients: string,
  price: number,
  cuisine: string | null,
  menuPhotoUrls: MenuPhotoUrls[],
  menuItemAvailabeHours: MenuItemAvailabeHours[],
  menuItemExtras: MenuItemExtras[]
}