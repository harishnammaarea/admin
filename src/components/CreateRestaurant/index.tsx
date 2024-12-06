import clsx from "clsx"
import UploadImageCard from "components/UploadImageCard"
import UploadMultiplePhotosWithPreview from "components/UploadMultiplePhotos"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Col, Form, Grid, Row } from "rsuite"
import Button from "shared/components/Button"
import IconButton from "shared/components/IconButton"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import CancelFilledIcon from "shared/icons/CancelFilledIcon"
import { Field, FormProps, Form as ReduxForm } from "react-final-form"
import CommonCard from "shared/components/CommonCard"
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel"
import { BUSINESS_MODEL, RESTAURANTS_CATEGORIES } from "core/constants/restuarant"
import CheckerSelectWithLabel from "shared/components/redux-form/CheckerSelectWithLabel"
import { createRestaurantValidations } from "./validations"
import { Cuisine, Restaurants } from "core/models/restaurants"
import PenIcon from "shared/icons/Pen"

interface CreateRestaurantProps {
  className?: string
  onUploadLogo(logo: File | null): void
  onUploadMainCoverPhoto(photo: File | null): void
  onUploadCoverPhoto(photos: File[]): void
  cuisines: Cuisine[]
  restaurantValues?: Restaurants | null
  isUpdate?: boolean
  onUpdateUploadedCoverPhotos?(photos: string[]): void
  onCreateRestaurant(values: FormProps<CreateRestaurantFormProps>): void
}

export interface CreateRestaurantFormProps {
  name: string
  mobileNumber: string
  businessModel: string
  cuisines: string[]
  email?: string
  category: string
}

export default function CreateRestaurantForm({
  cuisines,
  className,
  restaurantValues,
  isUpdate = false,
  onCreateRestaurant,
  onUploadMainCoverPhoto,
  onUpdateUploadedCoverPhotos,
  onUploadCoverPhoto,
  onUploadLogo }: CreateRestaurantProps) {
  const logoInputref = useRef<null | HTMLInputElement>(null)
  const mainCoverPhotoInputRef = useRef<null | HTMLInputElement>(null)
  const [tempLogoUrl, setLogoTempUrl] = useState<string>("")
  const [mainCoverPhotoTempUrl, setMainCoverPhotoTempUrl] = useState<string>("")
  const [uploadedCoverPhotos, setUploadedCoverPhotos] = useState<string[]>([])
  const [initialValues, setInitialsValues] = useState<Restaurants | CreateRestaurantFormProps>(
    { name: "", cuisines: [], mobileNumber: "", businessModel: "", category: "Both", email: "" }
  )

  useEffect(() => {
    if (restaurantValues) {
      setInitialsValues({
        name: restaurantValues.name,
        cuisines: restaurantValues.cuisines.map(cuisine => cuisine._id
        ),
        businessModel: restaurantValues.businessModel,
        category: restaurantValues.category,
        email: restaurantValues.email,
        mobileNumber: restaurantValues.mobileNumber
      })
      setLogoTempUrl(restaurantValues.logo)
      setMainCoverPhotoTempUrl(restaurantValues.mainCoverPhoto)
      setUploadedCoverPhotos(restaurantValues.coverPhotos)
    }
  }, [restaurantValues])

  function handleOnUploadImages(photos: File[]) {
    onUploadCoverPhoto(photos)
  }

  function handleLogoUploadClick() {
    if (logoInputref.current)
      logoInputref.current.click()
  }

  function handleOnClickUploadMainCoverPhoto() {
    if (mainCoverPhotoInputRef.current)
      mainCoverPhotoInputRef.current.click()
  }

  function handleOnUploadLogo(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setLogoTempUrl(URL.createObjectURL(event.target.files[0]))
      onUploadLogo(event.target.files[0])
    }
  }

  function handleOnMainCoverPhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setMainCoverPhotoTempUrl(URL.createObjectURL(event.target.files[0]))
      onUploadMainCoverPhoto(event.target.files[0])
    }
  }

  function handleRemoveSelectedLogo() {
    setLogoTempUrl("")
    onUploadLogo(null)
  }

  function handleRemoveMainCoverPhoto() {
    setMainCoverPhotoTempUrl("")
    onUploadMainCoverPhoto(null)
  }

  function handleFormSubmit(values: FormProps<CreateRestaurantFormProps>) {
    onCreateRestaurant(values)
  }

  function removeUploadCoverPhotos(index: number) {
    const tempUrls = [...uploadedCoverPhotos]
    tempUrls.splice(index, 1)
    setUploadedCoverPhotos(tempUrls)
    if (onUpdateUploadedCoverPhotos)
      onUpdateUploadedCoverPhotos(tempUrls)
  }

  function updateMainCoverPhotos() {
    if (mainCoverPhotoInputRef.current)
      mainCoverPhotoInputRef.current.click()
  }

  function getAddedCoverPhotos() {
    if (uploadedCoverPhotos.length > 0) {
      return (
        <div className="create-restaurant-form-added-cover-photos-container">
          {uploadedCoverPhotos.map((url, index) => (
            <div key={index} className="create-restaurant-form-added-cover-photos-container">
              <IconButton
                onClick={() => removeUploadCoverPhotos(0)}
                classname="create-restaurant-form-added-cover-photos-cancel"
                icon={<CancelFilledIcon />} />
              <img
                src={url}
                alt=""
                loading="lazy"
                className="create-restaurant-form-added-cover-photo" />
            </div>))
          }
        </div>)
    }
  }

  return (
    <CommonCard
      className={clsx("create-restaurant-form-card", className)}>
      <div className="create-restaurant-form-main-photos-section">
        <div className="create-restaurnat-form-upload-logo-and-main-cover-photo-container">
          <h3>Restaurant Logo</h3>
          {tempLogoUrl ?
            <div className="create-restaurnat-form-upload-logo-container">
              <IconButton
                onClick={handleRemoveSelectedLogo}
                classname="create-restaurant-form-upload-logo-remove-btn"
                icon={<CancelFilledIcon />} />
              <img
                src={tempLogoUrl}
                alt=""
                loading="lazy"
                className="create-restaurant-form-uploaded-logo" />
            </div>
            :
            <div className="create-restaurant-form-main-cover-photo-container">
              <UploadImageCard onClick={handleLogoUploadClick} />
            </div>
          }
          <input type="file"
            onChange={handleOnUploadLogo}
            ref={logoInputref}
            className="create-restaurant-form-upload-logo-input" />
        </div>
        <div className="create-restaurnat-form-upload-main-cover-photo-container">
          <h3>Main Cover Photo*</h3>
          {mainCoverPhotoTempUrl ?
            <div className="create-restaurant-form-upload-main-cover-photo-img-container">
              <IconButton
                onClick={() => { isUpdate ? updateMainCoverPhotos() : handleRemoveMainCoverPhoto() }}
                classname="create-restaurant-form-upload-main-cover-photo-remove-btn"
                icon={isUpdate ? <PenIcon /> : <CancelFilledIcon />} />
              <img
                src={mainCoverPhotoTempUrl}
                alt=""
                loading="lazy"
                className="create-restaurant-form-upload-main-cover-photo-img" />
            </div>
            :
            <UploadImageCard
              className="create-restaurant-form-main-cover-photo-upload-image-card"
              onClick={handleOnClickUploadMainCoverPhoto} />
          }
          <input
            type="file"
            onChange={(handleOnMainCoverPhotoUpload)}
            ref={mainCoverPhotoInputRef}
            className="create-restaurant-form-upload-main-cover-photo-input"
          />
        </div>
      </div>
      {(isUpdate && uploadedCoverPhotos.length > 0) &&
        <h3>Uploaded Cover Photos</h3>}
      {isUpdate &&
        getAddedCoverPhotos()
      }
      <UploadMultiplePhotosWithPreview
        title="Add Restaurant Cover Photos"
        className="create-restaurant-form-upload-cover-photos"
        max={10}
        onImagesToUpload={handleOnUploadImages} />
      <ReduxForm
        onSubmit={handleFormSubmit}
        validate={createRestaurantValidations}
        initialValues={{ ...initialValues }}
        render={({ handleSubmit, form }) => (
          <Form
            onSubmit={() => handleSubmit()}
            className={clsx("create-restaurant-form-container")}
          >
            <h3>Basic Details</h3>
            <Grid fluid>
              <Row gutter={10}
                className="create-restaurant-grid-row">
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}
                  className="create-restaurant-form-grid-col"
                >
                  <Field
                    name="name"
                    component={InputWithLabel}
                    placeholder="Restaurant Name"
                    label="Name*"
                  />

                </Col>
                <Col
                  className="create-restaurant-form-grid-col"
                  xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Field
                    name="mobileNumber"
                    component={InputWithLabel}
                    placeholder="Owner Contact Number"
                    label="Contact Number(Owners)*"
                  />
                </Col>
              </Row>
              <Row gutter={10} className="create-restaurant-grid-row">
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}
                  className="create-restaurant-form-grid-col"
                >
                  <Field
                    name="businessModel"
                    component={SelectWithlabel}
                    placeholder="Restaurant Business Modal"
                    options={Object.values(BUSINESS_MODEL).map(model => ({ label: model, value: model }))}
                    label="Business Modal*"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}
                  className="create-restaurant-form-grid-col"
                >
                  <Field
                    name="cuisines"
                    component={CheckerSelectWithLabel}
                    placeholder="Restaurant Cuisines"
                    options={cuisines.map(val => ({ label: val.name, value: val._id }))}
                    label="Cuisines*"
                  />
                </Col>
              </Row>
              <Row gutter={10} className="create-restaurant-grid-row">
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}
                  className="create-restaurant-form-grid-col"
                >
                  <Field
                    name="category"
                    component={SelectWithlabel}
                    options={Object.values(RESTAURANTS_CATEGORIES).map(category => ({ label: category, value: category }))}
                    placeholder="Category"
                    label="Category*"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}
                  className="create-restaurant-form-grid-col"
                >
                  <Field
                    name="email"
                    component={InputWithLabel}
                    options={Object.values(RESTAURANTS_CATEGORIES).map(category => ({ label: category, value: category }))}
                    placeholder="Owner Email"
                    label="Email(Owner/head office)"
                  />
                </Col>
              </Row>
            </Grid>
            <div className="create-restaurant-form-btns-container">
              {/* <Button type="button" label="Reset" onClick={form.reset} /> */}
              <Button type="submit" label={isUpdate ? "Update" : "Create"} />
            </div>
          </Form>
        )}
      />

    </CommonCard>
  )
}
