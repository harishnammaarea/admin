import WelcomeCard from "components/WelcomeCard";
import { getRole } from "core/helpers/storage";
import { Roles } from "core/models/Token";
import { Col, Grid, Row } from "rsuite";
import CommonCard from "shared/components/CommonCard";
import RestaurantIcon from "shared/icons/RestaurantIcon";

export default function Overview() {
  const role: Roles = getRole()

  return (

    <div className="overview-page">
      <WelcomeCard role={role} name="Harish" />
      <h1>Overview</h1>
      <div className="overview-analaytics-container">
        <Grid fluid>
          <Row gutter={10}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
              <CommonCard className="overview-analytics-total-card">
                <div className="overview-anyalytics-status-container">
                  <h2>Restaurants</h2>
                  <h1>0</h1>
                </div>
                <RestaurantIcon fontSize="4rem" />
              </CommonCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
              <CommonCard className="overview-analytics-total-card">
                <div className="overview-anyalytics-status-container">
                  <h2>Cuisies</h2>
                  <h1>0</h1>
                </div>
                <RestaurantIcon fontSize="4rem" />
              </CommonCard>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

