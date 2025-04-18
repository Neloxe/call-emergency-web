"use client";

import { FileUpload } from "@/components/fileUpload";
import { useEffect } from "react";

export default function AddPage() {
  useEffect(() => {
    document.title = "Merlain - Ajouts";
  }, []);
  return <FileUpload />;
}
