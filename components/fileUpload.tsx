"use client";
import { useState } from "react";
import { validateFile } from "@/services/fileService";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (uploadedFile: File) => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const validationResult = validateFile(uploadedFile);
    if (!validationResult.valid) {
      setError(validationResult.error);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/api/format-file", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Une erreur est survenue.");
        return;
      }

      setSuccessMessage(`Fichier traité avec succès`);
      setFile(uploadedFile);
    } catch (err) {
      setError("Impossible de traiter le fichier.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileUpload(e.dataTransfer.files[0]);
            }
          }}
          className="mx-auto flex aspect-square max-w-2xl flex-col items-center justify-center border-2 border-dashed bg-white dark:border-gray-600 dark:bg-gray-800"
        >
          <label
            htmlFor="file"
            className="flex h-full flex-col justify-center text-center text-gray-700 dark:text-gray-300"
          >
            Cliquer ou déposer le fichier des appels ici
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          {error && (
            <p className="mt-2 text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Fichier téléchargé : {file.name}
          </p>
          {successMessage && (
            <p className="mt-2 text-green-500 dark:text-green-400">
              {successMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
