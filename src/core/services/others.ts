import axios from "axios";

export async function getAddress(lat: string | number, long: string | number) {
  const key = process.env.REACT_APP_GOOGLE_KEY;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`
  );

  return response;
}

export async function locateAddressApi(address:string) {
   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_KEY || ""}`)
   return response
}