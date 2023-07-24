"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/pokemon", label: "Home", exact: true, isLink: true },
  { href: "/pokemon", label: "Pokemon", isLink: false },
];

export function Heading() {
  const path = usePathname();

  return (
    <header className="p-6 bg-white shadow-md">
      <nav className="flex items-center gap-4 flex-wrap text-slate-700">
        {menu.map(({ href, label, exact, isLink }) =>
          isLink ? (
            <Link
              href={href}
              key={href}
              className={
                ((exact ? path === href : path.startsWith(href)) &&
                  "font-bold") ||
                ""
              }
            >
              {label}
            </Link>
          ) : (
            <span key={href}>{label}</span>
          )
        )}
      </nav>
    </header>
  );
}
