import { Text } from "@/components/text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informations",
  description: "Informations",
};

export default function InfoPage() {
  return (
    <Text
      title="Informations"
      body={
        <p>
          Là on va mettre des informations, par exemple comment l'utiliser, à
          quoi ça sert, qui contacter en cas de problème, etc.
        </p>
      }
    />
  );
}
