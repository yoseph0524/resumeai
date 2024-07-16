// layout.js
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { AuthUserProvider } from "./Auth/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import ProtectedRoute from "./Auth/ProtectedRoute";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AuthUserProvider>
          <CacheProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </CacheProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
