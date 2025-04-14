"use client";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { useState } from "react";

export default function DeletePage() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);

    try {
      const response = await fetch("/api/delete-file", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete file: ${response.statusText}`);
      }

      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <Text
      title="Suppression des données"
      body={
        <div className="relative">
          Cliquer sur le bouton ci-dessous pour supprimer les données
          enregistrées.
          <div className="mt-8 flex justify-center">
            <Button
              label="Suppression"
              variant={"delete"}
              shape={"rounded"}
              onClick={handleDeleteClick}
            />
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded border bg-white p-6 shadow-lg">
                <p>Êtes-vous sûr de vouloir supprimer les données ?</p>
                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    label="Confirmer"
                    variant={"confirm"}
                    shape={"rounded"}
                    onClick={handleConfirm}
                  />
                  <Button
                    label="Annuler"
                    variant={"cancel"}
                    shape={"rounded"}
                    onClick={handleCancel}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
