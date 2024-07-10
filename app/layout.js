// layout.js
"use client";

import { AuthUserProvider } from "./Auth/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
