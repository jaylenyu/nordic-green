import { useState, useEffect } from "react";

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return screenWidth;
}
