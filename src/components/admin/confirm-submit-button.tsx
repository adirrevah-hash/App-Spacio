"use client";

import type { ReactNode, MouseEvent } from "react";

export function ConfirmSubmitButton({
  confirmMessage,
  children,
  className,
}: {
  confirmMessage: string;
  children: ReactNode;
  className?: string;
}) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <button type="submit" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
