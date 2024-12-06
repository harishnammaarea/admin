import StepProgressBar from "components/StepProgressBar";

export default function AddAreaAdmin() {
  return (
    <div className="add-area-admin">
      <StepProgressBar totalSteps={[{ title: "General" }, { title: "Bank" }]} active={1} />
    </div>
  )
}