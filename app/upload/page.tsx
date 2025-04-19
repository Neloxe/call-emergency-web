"use client";

import { useEffect } from "react";

import Dropzone from "@/components/dropzone";

export default function AddPage() {
  useEffect(() => {
    document.title = "Merlain - Ajouts";
  }, []);
  return <Dropzone />;
}
