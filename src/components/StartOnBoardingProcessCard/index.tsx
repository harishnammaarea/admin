import CommonCard from "shared/components/CommonCard";
import startProcessIcon from "assets/illus/start-process.png";
import UseIsMobile from "core/hooks/IsMobile";

export default function StartOnboardingProcessCard() {
  const isMobile = UseIsMobile()
  return (
    <CommonCard className="start-on-boarding-process-card">
      <img src={startProcessIcon}
        width={isMobile ? 100 : 150}
        height={isMobile ? 100 : 150}
        alt="" />
    </CommonCard>)
}