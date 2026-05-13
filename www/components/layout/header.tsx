"use client";

import HeaderV1 from "@/components/layout/header-v1";
import HeaderV2 from "@/components/layout/header-v2";

export default function Header() {
  const variant = process.env.NEXT_PUBLIC_HEADER_VARIANT;

  if (variant === "v2") {
    return <HeaderV2 />;
  }

  return <HeaderV1 />;
}
