"use client";

import { type ReactNode } from "react";

type ScrollRevealProviderProps = {
  children: ReactNode;
  refreshKey?: string;
};

export default function ScrollRevealProvider({ children }: ScrollRevealProviderProps) {
  return <>{children}</>;
}
