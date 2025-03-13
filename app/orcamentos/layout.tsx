'use client';

import "@/app/globals.css";
import PrimaryButton from "../components/ui/buttons/PrimaryButton/component";
import { useRouter } from "next/navigation";
import NavBar from "../components/layout/NavBar/component";
import Sidebar from "../components/layout/Sidebar/component";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <>
    <Sidebar/>
      <div className="content">    
        <NavBar>
          <ul className="nav-links">
              <li>
                  {/* <PrimaryButton text="Gestão de Risco" onClick={() => router.push('/paineis/gestaorisco')}/> */}
              </li>
          </ul>
        </NavBar>
        <div style={{width: '100%', borderTopLeftRadius: '20px', zIndex:100000}}>
            {children}
        </div>
      </div>
    </>
  );
}
