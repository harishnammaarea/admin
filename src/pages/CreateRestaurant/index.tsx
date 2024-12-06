import { NotifierContext } from "App/Notifier";
import { useTypedDispatch, useTypedSelector } from "App/Store";
import CreateRestaurantForm, { CreateRestaurantFormProps } from "components/CreateRestaurant";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import { uploadfilesApi } from "core/services/core";
import { createRestaurantApi } from "core/services/restaurants";
import { useContext, useEffect, useState } from "react";
import { FormProps } from "react-final-form";
import { getCuisinesThunk } from "redux-slices/getAllCuisinesSlice";

export default function CreateRestaurant() {
  const [mainCoverPhoto, setMainCoverPhoto] = useState<null | File>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [coverPhotos, setCoverPhotos] = useState<File[]>([])
  const { showNotification } = useContext(NotifierContext)
  const { cuisines } = useTypedSelector(state => state.cuisines)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(getCuisinesThunk())
  }, [dispatch])

  function handleOnUploadMainCoverPhoto(photo: File) {
    setMainCoverPhoto(photo)
  }

  function handleOnUploadLogo(photo: File) {
    setLogo(photo)
  }

  function handleOnUploadCoverPhotos(photos: File[]) {
    setCoverPhotos(photos)
  }

  async function handleOnCreateRestaurant(values: FormProps<CreateRestaurantFormProps>) {
    let mainainPhotoUrl = ""
    let logoUrl = ""
    let coverPhotoUrls: string[] = []
    const mainCoverPhotoFormData = new FormData()
    const logoFormData = new FormData()
    const coverPhotoFormData = new FormData()

    if (!mainCoverPhoto) {
      showNotification({ message: "Atleast one cover photo is required", type: "error", title: "Main cover photo is required" })
      return
    }

    mainCoverPhotoFormData.append("files", mainCoverPhoto)
    const mainPhotoResponse = await uploadfilesApi(mainCoverPhotoFormData)

    if (mainPhotoResponse.data && mainPhotoResponse.status) {
      mainainPhotoUrl = mainPhotoResponse.data.urls[0]
    }
    else {
      showNotification({
        message: mainPhotoResponse.message || DEFAULT_API_ERROR,
        type: "error",
        title: "Failed to upload Main Photo photo"
      })
      return
    }

    if (logo) {
      logoFormData.append("files", logo)
      const logoResponse = await uploadfilesApi(logoFormData)
      if (logoResponse.data && logoResponse.status) {
        logoUrl = logoResponse.data.urls[0]
      }
      else {
        showNotification({ message: logoResponse.message || DEFAULT_API_ERROR, type: "error", title: "Failed to upload restaurant logo" })
        return
      }
    }

    if (coverPhotos.length > 0) {
      coverPhotos.forEach(photo => {
        coverPhotoFormData.append("files", photo)
      });

      const coverPhotoResponse = await uploadfilesApi(coverPhotoFormData)
      if (coverPhotoResponse.data && coverPhotoResponse.status) {
        coverPhotoUrls = [...coverPhotoResponse.data.urls]
      }
      else {
        showNotification({ message: coverPhotoResponse.message || DEFAULT_API_ERROR, type: "error", title: "Failed to upload cover photos" })
      }
    }

    let data = {
      ...values,
      logo: logoUrl,
      mainCoverPhoto: mainainPhotoUrl,
      coverPhotos: coverPhotoUrls
    }

    const response = await createRestaurantApi(data)
    if (response.data && response.status) {
      showNotification({ message: "Successfully created a restaurant", type: "success", title: "Sucecess" })
    } else {
      showNotification({ message: response.message || DEFAULT_API_ERROR, type: "error", title: "Failed to create restaurant" })
    } 
  }

  return (
    <div className="create-restaurant-page">
      <CreateRestaurantForm
        onUploadCoverPhoto={handleOnUploadCoverPhotos}
        onCreateRestaurant={handleOnCreateRestaurant}
        cuisines={cuisines}
        onUploadMainCoverPhoto={handleOnUploadMainCoverPhoto}
        onUploadLogo={handleOnUploadLogo}
      />
    </div>)
}