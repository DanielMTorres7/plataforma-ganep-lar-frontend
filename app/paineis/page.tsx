'use client';

import { useRouter } from "next/navigation";
import PrimaryButton from "../components/ui/buttons/PrimaryButton/component";

export default function Dashboard() {
    const router = useRouter();
    
    return (
        <div className="flex items-center justify-center space-x-4">
            <PrimaryButton text="Gestão de Risco" onClick={() => router.push('/paineis/gestaorisco')}/>
        </div>
    )
}