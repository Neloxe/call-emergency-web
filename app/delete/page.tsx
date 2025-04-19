"use client";

import { useState, useEffect } from "react";

import { usePopup } from "@/context/popup-context";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { MessageToast } from "@/components/message-toast";

export default function DeletePage() {
  useEffect(() => {
    document.title = "Merlain - Suppression";
  }, []);

  const { showPopup, hidePopup } = usePopup();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const handleDeleteClick = () => {
    showPopup(
      <>
        <p>Êtes-vous sûr de vouloir supprimer les données ?</p>
        <div className="mt-4 flex justify-center gap-4">
          <Button label="Confirmer" variant="delete" onClick={handleConfirm} />
          <Button
            label="Annuler"
            variant="cancel"
            onClick={() => hidePopup()}
          />
        </div>
      </>,
    );
  };

  const handleConfirm = async () => {
    hidePopup();

    try {
      const response = await fetch("/api/delete-file", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete file: ${response.statusText}`);
      }

      setToastMessage("Fichier supprimé avec succès");
      setToastType("success");
      console.log("File deleted successfully");
    } catch (error) {
      setToastMessage("Erreur lors de la suppression du fichier");
      setToastType("error");
      console.error("Error deleting file:", error);
    }
  };

  return (
    <>
      {toastMessage && (
        <MessageToast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
      <Text
        title="Suppression des données"
        body={
          <div className="relative">
            <p>
              Cliquer sur le bouton ci-dessous pour supprimer les données
              enregistrées.
            </p>
            <ul className="list-disc pl-5">
              <li>Assurez-vous d'avoir sauvegardé vos données.</li>
              <li>Cette action est irréversible.</li>
            </ul>
            <div className="mt-8 flex justify-center">
              <Button
                label="Suppression"
                variant={"delete"}
                shape={"rounded"}
                onClick={handleDeleteClick}
              />
            </div>
          </div>
        }
      />
    </>
  );
}
