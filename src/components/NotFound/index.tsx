import Icon from "assets/illus/404.png";

export default function NotFound() {
  return (
    <div className="not-found-main-container">
      <div>
        <img src={Icon} width={250} height={250} alt="" />
        <h1>Page Not Found</h1>
      </div>
    </div>)
}