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
                  <PrimaryButton text="Gestão de Risco" onClick={() => router.push('/paineis/gestaorisco')}/>
                  <PrimaryButton text="Pendências" onClick={() => router.push('/paineis/pendencias')}/>
              </li>
          </ul>
        </NavBar>
        <div className="content-body">
            {children}
        </div>
      </div>
    </>
  );
}
