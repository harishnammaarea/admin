import history from "App/History";
import { NotifierContext } from "App/Notifier";
import { useTypedDispatch, useTypedSelector } from "App/Store";
import { ObjectId } from "bson";
import CreateRestaurantForm, { CreateRestaurantFormProps } from "components/CreateRestaurant";
import { DEFAULT_API_ERROR } from "core/constants/Defaults";
import { Restaurants } from "core/models/restaurants";
import { uploadfilesApi } from "core/services/core";
import { getRestaurantByIdApi, updateRestaurantByIdApi } from "core/services/restaurants";
import { useCallback, useContext, useEffect, useState } from "react";
import { FormProps } from "react-final-form";
import { useParams } from "react-router-dom";
import { getCuisinesThunk } from "redux-slices/getAllCuisinesSlice";

type Params = {
  id: string
}

export default function UpdateRestaurant() {
  const { id } = useParams<Params>()
  const [restaurant, setRestaurant] = useState<Restaurants | null>(null)
  const [logoToUpload, setLogoToUpload] = useState<File | null>(null)
  const [mainCoverPhoto, setMainCoverPhoto] = useState<File | null>(null)
  const [coverPhotos, setCoverPhotos] = useState<File[]>([])
  const [uploadedCoverPhotos, setUploadedCoverPhotos] = useState<string[]>()
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string>()
  const { cuisines } = useTypedSelector(state => state.cuisines)
  const dispatch = useTypedDispatch()
  const { showNotification } = useContext(NotifierContext)

  const handleGetRestaurantId = useCallback(async () => {
    const response = await getRestaurantByIdApi(id)
    if (response.data && response.status) {
      setRestaurant(response.data.restaurant)
    }
  }, [id])

  function handleOnLogoUpload(logo: File) {
    setLogoToUpload(logo)
    setCurrentLogoUrl("")
  }

  function handleOnUploadMainCoverPhoto(photo: File) {
    setMainCoverPhoto(photo)
  }

  function handleOnUploadCoverPhotos(photos: File[]) {
    setCoverPhotos(photos)
  }

  function handleUpdateUploadedCoverPhotos(urls: string[]) {
    setUploadedCoverPhotos(urls)
  }

  useEffect(() => {
    if (!id) history.push("/restaurants")
    if (!ObjectId.isValid(id)) history.push("/restaurants")
    handleGetRestaurantId()
  }, [handleGetRestaurantId, id])

  useEffect(() => {
    dispatch(getCuisinesThunk())
  }, [dispatch])

  useEffect(() => {
    if (restaurant) {
      setUploadedCoverPhotos(restaurant.coverPhotos)
      setCurrentLogoUrl(restaurant.logo)
    }
  }, [restaurant])


  async function handleOnUpateRestaurant(values: FormProps<CreateRestaurantFormProps>) {
    const mainCoverPhotoFormData = new FormData()
    const logoFormData = new FormData()
    const coverPhotosFormData = new FormData()
    let mainPhotoUrl = ""
    let uploadedLogourl = ""
    let coverPhotoUrls: string[] = []

    if (logoToUpload) {
      logoFormData.append("files", logoToUpload)
      const logoResponse = await uploadfilesApi(logoFormData)
      if (logoResponse.data && logoResponse.status) {
        uploadedLogourl = logoResponse.data.urls[0]
      } else {
        showNotification({ message: "Failed to update restaurant details", type: "error", title: "Something went wrong" })
        return
      }
    }

    if (mainCoverPhoto) {
      mainCoverPhotoFormData.append("files", mainCoverPhoto)
      const mainCoverPhotoResponse = await uploadfilesApi(mainCoverPhotoFormData)
      if (mainCoverPhotoResponse.data && mainCoverPhotoResponse.status) {
        mainPhotoUrl = mainCoverPhotoResponse.data.urls[0]
      } else {
        showNotification({ message: "Failed to update restaurant details", type: "error", title: "Something went wrong" })
        return
      }
    }

    if (coverPhotos.length > 0) {
      coverPhotos.forEach(photo => {
        coverPhotosFormData.append("files", photo)
      })

      const coverPhotoResponse = await uploadfilesApi(coverPhotosFormData)
      if (coverPhotoResponse.data && coverPhotoResponse.status) {
        coverPhotoUrls = coverPhotoResponse.data.urls
      } else {
        showNotification({ message: "Failed to update restaurant details", type: "error", title: "Something went wrong" })
        return
      }
    }

    if(!coverPhotoUrls.length && !uploadedCoverPhotos?.length ) {
      showNotification({message:"Atleast one cover photo is required",type:"error",title:"Failed"})
      return
     }

    const detailsToUpdate = {
      ...values,
      logo: logoToUpload ? uploadedLogourl : currentLogoUrl,
      mainCoverPhoto: mainPhotoUrl || restaurant?.mainCoverPhoto,
      coverPhotos: uploadedCoverPhotos ? [...uploadedCoverPhotos, ...coverPhotoUrls] : uploadedCoverPhotos
    }

    const response = await updateRestaurantByIdApi(id, detailsToUpdate)
    if (response.data && response.status) {
      showNotification({ message: "Successfully updated restaurant details", type: "success", title: "Success" })
      history.push("/restaurants")
    } else {
      showNotification({ message: response.message || DEFAULT_API_ERROR, type: "error", title: "Failed" })
    }
  }

  return (
    <div className="update-restaurant-page-wrapper">
      <h1>Update Restaurant</h1>
      <CreateRestaurantForm
        cuisines={cuisines}
        onCreateRestaurant={handleOnUpateRestaurant}
        onUpdateUploadedCoverPhotos={handleUpdateUploadedCoverPhotos}
        onUploadLogo={handleOnLogoUpload}
        onUploadCoverPhoto={handleOnUploadCoverPhotos}
        onUploadMainCoverPhoto={handleOnUploadMainCoverPhoto}
        restaurantValues={restaurant}
        isUpdate={true}
      />
    </div>
  )
}
