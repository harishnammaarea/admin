import { Cuisine, RestaurantType } from "./restaurants"

export interface MenuSection {
  createdAt: string
  _id: string
  sections: Section[]
}

export interface Section {
  sections: any
  _id: string
  name: string
  subSections: SubSection[]
  createdAt: string
}

export interface SubSection {
  _id: string
  createdAt: string
  name: string
}

export interface MenuItemsCustomizer {
  _id: string
  title: string
  isRequired: boolean
  canSelectUpTo: number
  createdAt: string
  canSelectUpto: number
  options: MenuItemsCustomizersOptions[]
}

export interface MenuItemsCustomizersOptions {
  _id: string
  item: string
  quantity: string
  price: number
  category: MenuCategory
  canSelectUpTo: number
  currentlyAvaliable: boolean
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
  items: MenuItem[]
  createdAt: string
  count: number
}

export interface MenuItem {
  _id: string
  name: string,
  category: MenuCategory,
  description: string,
  ingredients: string,
  price: number,
  cuisine: Cuisine,
  menuPhotoUrls: MenuPhotoUrls[],
  isSpicy: boolean
  cookingRequest:boolean
  custimozers:string[]
  quantity:string
  photos:string[]
  menuSections:MenuSection[]
}
