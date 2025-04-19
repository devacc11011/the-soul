'use client'
import {useState, useRef, useEffect, RefObject} from 'react';
import Link from 'next/link';
import Logo from "@/components/logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef:RefObject<HTMLDivElement | null> = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  // 메뉴가 렌더링된 후 스크롤 높이를 측정하여 menuHeight에 저장합니다.
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <nav className="shadow-md bg-base-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center">
            <Logo/>
          </div>
          {/* 데스크탑 네비게이션 링크 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/seed-searcher" className="px-3 py-2 rounded-md text-sm font-medium text-base-content">
              Seed Searcher
            </Link>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-base-content focus:outline-none transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle mobile menu</span>
              {isOpen ? (
                // 닫기(X) 아이콘
                <svg className="block h-6 w-6 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // 햄버거 아이콘
                <svg className="block h-6 w-6 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* 모바일 메뉴: max-height를 사용하여 토글 효과 적용 */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? menuHeight : 0 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/seed-searcher" className="block px-3 py-2 rounded-md text-base font-medium  text-base-content">
            Seed Searcher
          </Link>
        </div>
      </div>
    </nav>
  );
}
