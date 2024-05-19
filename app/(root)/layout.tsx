import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // const loggedIn = {firstName: 'Sơn', lastName: "Trần"};
    const loggedIn = await getLoggedInUser();

    // always redirect people who r not logged in to sign in page
    if(!loggedIn){ 
      redirect('/dang-nhap');
    }
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