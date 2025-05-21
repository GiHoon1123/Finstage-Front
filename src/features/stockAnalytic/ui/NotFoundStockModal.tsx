"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundStockModal() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="overlay">
      <div className="modal">
        <div className="title">
          지원하지 않거나
          <br />
          상장 폐지된 주식이에요.
        </div>
        <div className="desc">자세한 문의사항은 고객센터를 이용해주세요.</div>
        <button onClick={handleBack}>확인</button>
      </div>
    </div>
  );
}
