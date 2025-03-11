'use client';

import { useRouter } from "next/navigation";
import PrimaryButton from "../components/ui/buttons/PrimaryButton/component";

export default function Dashboard() {
    const router = useRouter();
    
    return (
        <div className="flex items-center justify-center space-x-4">
            <PrimaryButton text="LPPs" onClick={() => router.push('/dashboards/lpps')}/>
            <PrimaryButton text="Hospitalizações" onClick={() => router.push('/dashboards/hospitalizacoes')}/>
            <PrimaryButton text="Dispositivos" onClick={() => router.push('/dashboards/dispositivos')}/>
            <PrimaryButton text="Movimentações" onClick={() => router.push('/dashboards/movimentacoes')}/>
            <PrimaryButton text="Infecções" onClick={() => router.push('/dashboards/infeccoes')}/>
        </div>
    )
}