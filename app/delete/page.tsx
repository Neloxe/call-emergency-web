import { Text } from "@/components/text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suppression",
  description: "Suppression de données",
};

export default function DeletePage() {
  return (
    <Text
      title="Suppression des données"
      body={
        <p>
          Là on va mettre en place une possibilité de supprimer toutes les
          données.
        </p>
      }
    />
  );
}
