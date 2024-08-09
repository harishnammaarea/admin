import { useEffect, useState } from "react";

export default function useIsDesktop() {
  const [desktopScreenWidth, setWidth] = useState<number>(0);

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
  }, [desktopScreenWidth]);

  return desktopScreenWidth >= 1024;
}
