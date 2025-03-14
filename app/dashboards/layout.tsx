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
                <PrimaryButton text="LPPs" onClick={() => router.push('/dashboards/lpps')}/>
            </li>
            <li>
                <PrimaryButton text="Hospitalizações" onClick={() => router.push('/dashboards/hospitalizacoes')}/>
            </li>
            <li>
                <PrimaryButton text="Dispositivos" onClick={() => router.push('/dashboards/dispositivos')}/>
            </li>
            <li>
                <PrimaryButton text="Movimentações" onClick={() => router.push('/dashboards/movimentacoes')}/>
            </li>
            <li>
                <PrimaryButton text="Infecções" onClick={() => router.push('/dashboards/infeccoes')}/>
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
