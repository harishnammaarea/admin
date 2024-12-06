import clsx from "clsx";
import UploadMultiplePhotosWithPreview from "components/UploadMultiplePhotos";
import { RESTAURANTS_CATEGORIES } from "core/constants/restuarant";
import { MenuItem, MenuItemsCustomizer, MenuSection } from "core/models/menu";
import { Cuisine } from "core/models/restaurants";
import { useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { Col, Form, Grid, Row } from "rsuite";
import Button from "shared/components/Button";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import NumberInputWithLabel from "shared/components/redux-form/NumberInputWithLable";
import SelectWithlabel from "shared/components/redux-form/SelectwithLabel";
import TagPickerWithlabel from "shared/components/redux-form/TagPicker";
import { TextAreaWithLabel } from "shared/components/redux-form/TextAreaWithLabel";
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon";
import { menuItemvalidations } from "../validations";
import { RowDataType } from "rsuite/esm/Table";
import CheckRadioIcon from "shared/icons/CheckedRadioIcon";
import UncheckRadioIcon from "shared/icons/UncheckRadioIcon";
import IconButton from "shared/components/IconButton";
import { COLORS } from "core/constants/color";
import EditIcon from "shared/icons/Edit";

export interface CreateMenuDetailsFormProps {
  name: string
  price: number
  quantity: string
  category: string
  cuisine: string
  cookingRequest: boolean
  description: string
  custimozers: string[]
}

interface CreateMenuFormProps {
  className?: string;
  cuisines: Cuisine[]
  menuSections: MenuSection
  customizers: MenuItemsCustomizer[]
  isUpdate?: boolean
  selectedMenuItemToUpdate?: RowDataType<MenuItem> | null | MenuItem
  onCreateMenuItem(data: CreateMenuDetailsFormProps, images: File[], existsingImages?: string[]): void
}

export default function CreateMenuItemForm({ className,
  cuisines,
  customizers,
  selectedMenuItemToUpdate,
  onCreateMenuItem }: CreateMenuFormProps) {
  const [initialValues, setInitialValues] = useState<CreateMenuDetailsFormProps>({ name: "", cookingRequest: false, price: 1, quantity: "", cuisine: "", description: "", category: RESTAURANTS_CATEGORIES.veg, custimozers: [] })
  const [images, setImages] = useState<File[]>([])
  const [photosToRemove, setPhotosToRemove] = useState<number[]>([])

  useEffect(() => {
    if (selectedMenuItemToUpdate) {
      setInitialValues({
        name: selectedMenuItemToUpdate.name,
        cookingRequest: selectedMenuItemToUpdate.cookingRequest,
        price: selectedMenuItemToUpdate.price,
        cuisine: selectedMenuItemToUpdate.cuisine,
        description: selectedMenuItemToUpdate.description,
        category: selectedMenuItemToUpdate.category,
        custimozers: selectedMenuItemToUpdate.custimozers,
        quantity: selectedMenuItemToUpdate.quantity
      })
    }
  }, [selectedMenuItemToUpdate])

  function handleFormSubmit(values: CreateMenuDetailsFormProps) {
    const currentPhotos: string[] = selectedMenuItemToUpdate ? selectedMenuItemToUpdate.photos : []
    if (photosToRemove.length) {
      for (let index = 0; index < photosToRemove.length; index++) {
        currentPhotos.splice(photosToRemove[index], 1)
      }
    }

    onCreateMenuItem({ ...values, price: Number(values.price) }, images, currentPhotos)
  }

  function handleOnMenuPhotosSelect(photos: File[]) {
    setImages(photos)
  }

  function handleRemoveMenuItemPhoto(index: number) {
    const tempArray = [...photosToRemove]
    if (tempArray.includes(index)) {
      const matchedIndex = tempArray.findIndex(val => val === index)
      if (matchedIndex >= 0) {
        tempArray.splice(matchedIndex, 1)
      }
    } else {
      tempArray.push(index)
    }

    setPhotosToRemove(tempArray)
  }

  return (
    <>
      <h1 className="create-menu-item-main-title">
        {selectedMenuItemToUpdate ? "Update Menu Item" : "Create Menu Item"}
      </h1>
      {selectedMenuItemToUpdate && (
        <>
          {selectedMenuItemToUpdate.photos.length > 0 &&
            <>
              <h3>Remove Existing Uploaded Photos</h3>
              <div className="create-menu-item-update-mode-upload-photos-container">
                {selectedMenuItemToUpdate.photos.map((url: string, index: number) => (
                  <div key={index} className="create-menu-item-update-mode-single-photo-container">
                    <img src={url} alt="" width={150} height={150} className="create-menu-item-update-mode-img" />
                    <IconButton
                      classname="create-menu-item-update-mode-upload-mode-selected-to-remove"
                      onClick={() => { handleRemoveMenuItemPhoto(index) }}
                      icon={photosToRemove.includes(index) ?
                        <CheckRadioIcon fontSize="2rem" color={COLORS.PRIMARY_COLOR} /> :
                        <UncheckRadioIcon fontSize="2rem" color={COLORS.PRIMARY_COLOR} />} />
                  </div>))}
              </div>
            </>
          }
        </>
      )
      }
      <UploadMultiplePhotosWithPreview
        max={5}
        title="Menu Items Cover Photos"
        className={"create-menu-item-form-menu-photos"}
        onImagesToUpload={handleOnMenuPhotosSelect}
      />
      <FinalForm
        validate={menuItemvalidations}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, dirty }) => {
          return (
            <Form
              className={clsx("create-menu-item-form", className)}
              fluid onSubmit={() => { handleSubmit() }}>
              <Grid fluid>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="name"
                      component={InputWithLabel}
                      placeholder="Name"
                      label="Name"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="price"
                      component={NumberInputWithLabel}
                      placeholder="price"
                      min={1}
                      max={100}
                      label="Price"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="cookingRequest"
                      component={SelectWithlabel}
                      placeholder="Select"
                      label="Cooking Request"
                      options={[{ label: "True", value: true }, { label: "False", value: false }]}
                    />
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="category"
                      component={SelectWithlabel}
                      placeholder="Select"
                      options={Object.values(RESTAURANTS_CATEGORIES).filter(val => val !== RESTAURANTS_CATEGORIES.both).map(val => ({ label: val, value: val }))}
                      label="Category"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="cuisine"
                      component={SelectWithlabel}
                      placeholder="Select"
                      options={cuisines.map(value => ({ label: value.name, value: value._id }))}
                      label="Cuisine"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="custimozers"
                      component={TagPickerWithlabel}
                      placeholder="Select"
                      options={customizers.map(value => ({ label: value.title, value: value._id }))}
                      label="Custimozers"
                    />
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Field
                      name="quantity"
                      component={InputWithLabel}
                      placeholder="Enter quantity"
                      label="Quantity"
                    />
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Field
                      name="ingredients"
                      rows={6}
                      component={TextAreaWithLabel}
                      placeholder="Type here..."
                      label="Ingredients"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Field
                      name="description"
                      rows={6}
                      component={TextAreaWithLabel}
                      placeholder="Type here..."
                      label="Description"
                    />
                  </Col>
                </Row>
              </Grid>
              <div className="create-menu-item-form-save-btn-container">
                <Button
                  disabled={selectedMenuItemToUpdate ? !(dirty || photosToRemove.length || images.length) : !dirty}
                  label={selectedMenuItemToUpdate ? "Update" : "Next"}
                  type="submit"
                  icon={!selectedMenuItemToUpdate ?
                    <ArrowWithLineIcon rotate={180} color="#ffffff" fontSize="1.6rem" /> :
                    <EditIcon color="#ffffff" fontSize="1.4rem" />}
                  iconPosition="end"
                />
              </div>
            </Form>
          )
        }}
      >
      </FinalForm>
    </>
  );
}
