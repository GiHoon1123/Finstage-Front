import { useEffect } from "react";

export function useFreezeBodyScroll(shouldFreeze: boolean) {
  useEffect(() => {
    if (shouldFreeze) {
      const scrollY = window.scrollY;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // 스크롤바 너비가 존재할 때만 적용
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.paddingRight = ""; // 초기화
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
    }
  }, [shouldFreeze]);
}
