export const dynamic = "force-dynamic";

import React, { ReactNode } from "react";
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
    // <html>
    //   <body>
    <Providers>
      <PerygonContainer>
        <NavBar {...navBarProps} />
        {children}
      </PerygonContainer>
      <Footer />
    </Providers>
    //   </body>
    // </html>
  );
}
