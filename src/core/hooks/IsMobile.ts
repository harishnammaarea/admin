import { useEffect, useState } from "react";

export default function UseIsMobile() {
  const [screenWidth, setWidth] = useState(360);

  function handleWindowSizeChange() {
    setWidth(
      window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );
  }

  useEffect(() => {
    setWidth(
      window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [screenWidth]);

  return screenWidth >= 360 && screenWidth <= 599;
}
