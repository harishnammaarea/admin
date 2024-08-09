import WelcomeCard from "components/WelcomeCard";
import { getName } from "core/helpers/storage";

export default function ApplicationHub() {
  const name = getName()
  return (
    <div className="application-hub-page">
      <WelcomeCard name={name} />
      <h1>Applications In PipeLine</h1>
    </div>)
}