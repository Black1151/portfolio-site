import React, { ReactNode } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PerygonContainer } from "./layout/PerygonContainer";
import { Footer } from "./layout/Footer";
import { NavBar } from "./layout/NavBar";
import { Providers } from "./providers/Providers";

interface NavBarProps {
  userFirstName: string;
  userImageUrl: string;
  userRole: string;
  userCustomerId: string;
  logoImageUrl?: string;
}

export const dynamic = "force-dynamic";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navBarProps: NavBarProps = {
    userFirstName: "John",
    userImageUrl: "https://via.placeholder.com/150",
    userRole: "Admin",
    userCustomerId: "1234567890",
  };

  return (
    <html>
      <Providers>
        <body>
          <PerygonContainer>
            <NavBar {...navBarProps} />
            {children}
          </PerygonContainer>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
