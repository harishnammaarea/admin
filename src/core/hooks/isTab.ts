import { useEffect, useState } from "react";

export default function UseIsTab() {
  const [screenWidth, setWidth] = useState(600);

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

  return screenWidth >= 600 && screenWidth <= 1023;
}
