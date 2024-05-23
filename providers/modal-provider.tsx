"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/auth-modal";

const ModalProvider = () => {
    // Don't render modals on serverside; use this workaround to avoid hydration errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
        </>
    )
}

export default ModalProvider;