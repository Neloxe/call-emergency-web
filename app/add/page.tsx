import { Text } from "@/components/text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajout",
  description: "Ajout de données",
};

export default function AddPage() {
  return (
    <Text
      title="Ajout de données"
      body={
        <p>Là on va mettre en place une méthode pour ajouter des données.</p>
      }
    />
  );
}
