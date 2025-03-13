'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/ui/buttons/PrimaryButton/component";

export default function Mapa() {
    const router = useRouter();
    function handleLPP() {
        router.push('/mapa/produtosconvenio')
    }    

    return (
        <div className="flex flex-col items-center justify-center">
        </div>
    )
}