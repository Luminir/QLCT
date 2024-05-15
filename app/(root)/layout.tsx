import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const loggedIn = {firstName: 'Sơn', lastName: "Trần"};
    return (
      <main className="font-sans flex h-screen w-full">
        <SideBar user={loggedIn}/>

        {/* Sidebar for mobile devices */}
        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon"/>
            <div>
              <MobileNav user={loggedIn}/>
            </div>
          </div>
          {children}
        </div>
        {/* Sidebar for mobile devices */}
      </main>
    );
  }