import { FileUpload } from "@/components/fileUpload";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajout",
  description: "Ajout de données",
};

export default function AddPage() {
  return <FileUpload />;
}
