import clsx from "clsx"
import { Field } from "redux-form"
import { Col, Grid, Row } from "rsuite"
import CommonCard from "shared/components/CommonCard"
import InputWithLabel from "shared/components/redux-form/InputWithLabel"
import { GoogleMap, Marker } from "@react-google-maps/api";
import { TextArea } from "shared/components/redux-form/TextArea"
import InputPickerWithLable from "shared/components/redux-form/InputPicker"
import { SelectOptions } from "core/models/Options"
import Button from "shared/components/Button"
import { ChangeEvent, useState } from "react"

export type Location = {
  lat: number,
  lng: number
}
interface AddRestaurantLocationDetailsFieldsProps {
  className?: string,
  isLoaded: boolean
  location: Location
  areas: SelectOptions[]
  onConfirmAddress(address: string): void
}

export default function AddRestaurantLocationDetailsFields({
  className,
  isLoaded,
  location,
  areas,
  onConfirmAddress }: AddRestaurantLocationDetailsFieldsProps) {
  const [buildingNo, setBuildNo] = useState < string | ChangeEvent < HTMLInputElement >> ("")
  const [addressLineOne, setAddressLineOne] = useState < string | ChangeEvent < HTMLInputElement >> ("")
  const [area, setArea] = useState < string | ChangeEvent < HTMLSelectElement >> ("")
  const [pincode, setPincode] = useState < string | ChangeEvent < HTMLInputElement >> ("")

  function confirmHandleAddress() {
    if (buildingNo && addressLineOne && area && pincode) {
      const address = `${buildingNo},${addressLineOne},${area},Bengaluru,Karnataka,${pincode}`
      onConfirmAddress(address)
    }
  }

  return (
    <CommonCard
      className={clsx("add-restaurant-location-details-fields-main-container", className)}>
      {isLoaded &&
        <GoogleMap
          center={location}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '20rem', borderRadius: "1rem" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={location} />

        </GoogleMap>
      }
      <Grid fluid className="add-restaurant-location-details-fields-grid">
        <Row className="add-restaurant-location-details-fields-row" >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              onChange={(number: ChangeEvent<HTMLInputElement>) => { setBuildNo(number) }}
              name="buildingNo"
              component={InputWithLabel}
              label="Building number"
              placeholder="Building number"
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
        </Row>
        <Row className="add-restaurant-location-details-fields-row" >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="addressLineOne"
              onChange={(number: ChangeEvent<HTMLInputElement>) => { setAddressLineOne(number) }}
              component={TextArea}
              rows={5}
              label="Address Line(street,localities,landmarks)"
              placeholder="Street,locality and others"
              formControlLabelClassname="add-restaurant-location-details-fields-control-label"
            />
          </Col>
        </Row>
      </Grid>
      <Grid fluid
        className="add-restaurant-location-details-fields-grid">
        <Row gutter={10}
          className="add-restaurant-location-details-fields-row">
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="area"
              component={InputPickerWithLable}
              data={areas}
              placeholder="Area"
              label="Area"
              onChange={(number: ChangeEvent<HTMLSelectElement>) => { setArea(number) }}
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="city"
              component={InputPickerWithLable}
              data={[{ label: "bengaluru", value: "bengaluru" }]}
              placeholder="Bengaluru"
              label="City"
              readOnly={true}
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="pincode"
              component={InputWithLabel}
              label="pincode"
              onChange={(address: ChangeEvent<HTMLInputElement>) => { setPincode(address) }}
              placeholder="Pincode"
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="state"
              component={InputPickerWithLable}
              data={areas}
              placeholder="Karnataka"
              readOnly={true}
              label="State"
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
        </Row>
        <Row gutter={10} className="add-restaurant-location-details-fields-row">
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="lat"
              component={InputWithLabel}
              placeholder="Latitude"
              defaultValue={location.lat}
              readOnly={true}
              label="Latitude"
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}
            className="add-restaurant-location-details-fields-row-col">
            <Field
              name="lng"
              component={InputWithLabel}
              defaultValue={location.lng}
              placeholder="Longitude"
              readOnly={true}
              label="Longitude"
              formControlLabelClassName="add-restaurant-location-details-fields-control-label"
            />
          </Col>
        </Row>
      </Grid>
      <div className="add-restaurant-location-details-fields-update-coors-btn-container">
        <Button
          label="Update Coordinates"
          onClick={confirmHandleAddress}
          className="add-restaurant-location-details-fields-update-coords-btn" />
      </div>
    </CommonCard>)
}