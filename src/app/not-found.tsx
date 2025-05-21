"use client";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-icon-wrapper">
          <div className="notfound-icon-circle">?</div>
        </div>
        <h2 className="notfound-title">페이지를 찾지 못했어요</h2>
        <p className="notfound-description">
          페이지 주소가 정확한지 확인해주세요
        </p>
        <button
          className="notfound-button"
          onClick={() => (window.location.href = "/")}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
