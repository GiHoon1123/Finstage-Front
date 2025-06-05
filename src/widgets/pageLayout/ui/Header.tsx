"use client";

import Link from "next/link";
import { SymbolSearchInput } from "@/features/symbolSearch";

export default function Header() {
  return (
    <header className="header-bar">
      <div className="header-content">
        {/* 로고 */}
        <div className="logo">
          <Link href="/">📊 Salesmgmt</Link>
        </div>

        {/* 내비게이션 메뉴 */}
        <nav className="nav-menu">
          <Link href="/">홈</Link>
          <Link href="/news">뉴스</Link>
          <Link href="/request">추가 요청하기</Link>
          <Link href="/analytics">분석</Link>
          <SymbolSearchInput />
        </nav>

        {/* 로그인 버튼 */}
        <div className="user-actions">
          <button className="login-btn">
            <Link href="/login">로그인</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
