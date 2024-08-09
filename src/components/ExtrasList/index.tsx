import CommonLogo from "assets/illus/common.jpg";
import Button from "shared/components/Button";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import CommonModal from "shared/components/CommonModal";
import CommonCard from "shared/components/CommonCard";
import AddExtra, { ExtraFormProps } from "components/AddExtra";
import { RowDataType } from "rsuite/esm/Table";
import { Extras, RestaurantType } from "core/models/restaurants";
import { SelectOptions } from "core/models/Options";
import clsx from "clsx";
import { MENU_TYPES, RESTAURANT_TYPES } from "core/constants/options";
import ExtrasListTable from "components/ExtrasListTable";

type ExtraId = {
  id: number;
};

export type CombinedMenuExtrasProps = ExtraFormProps & ExtraId;

interface ExtrasListProps {
  className?: string
  category: RestaurantType
  extras: Extras[]
  onAddMenuExtras(extra: Extras): void
  onInitilizeAddExtraForm(extra: Extras): void
  addExtraModal: boolean
  onOpenAddExtraModal(): void
  onCloseAddExtraModal(): void
  extraDetails: Extras | null
  editExtraDetails?: boolean
}

export default function ExtrasList({ className,
  category,
  onAddMenuExtras,
  extras,
  onOpenAddExtraModal,
  onCloseAddExtraModal,
  onInitilizeAddExtraForm,
  extraDetails,
  editExtraDetails,
  addExtraModal }: ExtrasListProps) {

  function handleSaveExtra(extraDetails: Extras) {
    onAddMenuExtras(extraDetails)
  }

  function handleUpdateExtradetails(extraDetails: RowDataType<Extras>) {
    const extras: Extras = {
      id: extraDetails.id,
      name: extraDetails.name,
      price: extraDetails.price,
      quantity: extraDetails.quantity,
      category: extraDetails.category
    }

    onInitilizeAddExtraForm(extras)
  }

  function handleRemoveExtra(extraDetails: RowDataType<Extras>) {

  }

  function handleUpdateExtraDetails(values: CombinedMenuExtrasProps) {

  }

  function handleGetCategory() {
    const options: SelectOptions[] = []
    if (category === "Both") {
      RESTAURANT_TYPES.forEach(type => {
        if (type.value !== MENU_TYPES.both) {
          options.push(type)
        }
      })
    }
    return options
  }

  return (
    <>
      <CommonModal
        size="lg"
        title="Add Extra"
        open={addExtraModal}
        onClose={onCloseAddExtraModal}
      >
        <AddExtra
          categories={handleGetCategory()}
          onAddExtraDetails={handleSaveExtra}
          extraDetails={extraDetails}
          edit={editExtraDetails}
        />
      </CommonModal>
      <div className={clsx("extras-list", className)}>
        {extras.length > 0 ? (
          <>
            <div className="extras-list-header">
              <Button
                label="Add Extra"
                iconPosition="end"
                onClick={onOpenAddExtraModal}
                icon={<AddIconCircularIcon color="#ffffff" fontSize="2rem" />}
              />
            </div>
            <ExtrasListTable
              className="extras-list-extras-list-table"
              data={extras}
              onRemoveExtra={handleRemoveExtra}
              onUpdateExtraDetails={handleUpdateExtradetails}
            />
          </>
        ) : (
          <CommonCard className="extras-list-add-extra-card">
            <img src={CommonLogo} alt="" width={150} height={150} />
            <h4 className="extras-list-add-extra-card-helper">
              Click on the button below to add extra on order for this menu item
            </h4>
            <Button
              label="Add New Extra"
              iconPosition="end"
              onClick={onOpenAddExtraModal}
              icon={<AddIconCircularIcon color="#ffffff" fontSize="2rem" />}
            />
          </CommonCard>
        )}
      </div>
    </>
  )
}