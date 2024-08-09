import clsx from "clsx"
import { AddMenuSectionReduxForm } from "components/AddMenuSectionsForm"
import { AddOpeningHoursReduxFormProps } from "components/AddOpeningHoursForm"
import { BankDetailsReducFormProps } from "components/AddRestaurantBankDetailsForm"
import { ModifiedAddRestaurantBasicDetailsFormValues } from "components/AddRestaurantBasicDetailsForm"
import { AddLocationReduxFormProps } from "components/AddRestaurantLocationDetailsForm"
import { CombinedOwnerDetails } from "components/AddRestaurantOwnerDetailsForm"
import CommonCard from "shared/components/CommonCard"
import NammaAreaDivider from "shared/components/NammaAreaDivider"
import TickIcon from "shared/icons/TickIcon"

interface StartOnBoardingProcessProgressIndicatorProps {
  className?: string,
  basicDetails: ModifiedAddRestaurantBasicDetailsFormValues | null
  openingHours: AddOpeningHoursReduxFormProps | null
  locationDetails: AddLocationReduxFormProps | null
  ownerDetails: CombinedOwnerDetails | null
  coverPhotos: number
  bankDetails: BankDetailsReducFormProps | null
  menuSections?: AddMenuSectionReduxForm | null
  nextExtras:boolean
}

export default function StartOnBoardingProcessProgressIndicator({ className,
  basicDetails,
  openingHours,
  locationDetails,
  ownerDetails,
  menuSections,
  coverPhotos,
  bankDetails,
  nextExtras
}: StartOnBoardingProcessProgressIndicatorProps) {
  return (
    <CommonCard
      className={clsx("start-on-boarding-process-progress-indicator-main-container", className)}>
      <div className={clsx("start-on-boarding-process-progress-indicator-status-container")} >
        {basicDetails ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            1
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Basic Details</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {openingHours ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            2
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Opening Hours</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {locationDetails ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            3
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Location</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {ownerDetails ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            4
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Owner Details</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {bankDetails ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            5
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Bank Details</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {coverPhotos > 0 ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            6
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Cover Photos</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {menuSections ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            7
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Menu Sections</p>
      </div>
      <NammaAreaDivider className="start-on-boarding-process-progress-indicator-divider" />
      <div className="start-on-boarding-process-progress-indicator-status-container">
        {nextExtras ? <p className="start-on-boarding-process-progress-indicator-status-tick-icon">
          <TickIcon color="#ffffff" />
        </p> :
          <p className={clsx("start-on-boarding-process-progress-indicator-status",
          )}>
            8
          </p>
        }
        <p className="start-on-boarding-process-progress-indicator-status-title">Menu Extras</p>
      </div>
    </CommonCard>)
}