"use client";

import { useEffect } from "react";

import Dropzone from "@/components/dropzone";

export default function AddPage() {
  useEffect(() => {
    document.title = "Merlain - Ajouts";
  }, []);
  return (
    <div className="z-0">
      <Dropzone />;
    </div>
  );
}
