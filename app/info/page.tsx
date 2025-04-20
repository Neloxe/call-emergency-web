"use client";

import { useEffect } from "react";

import { EmailIcon } from "@/assets/icons";

import { Text } from "@/components/text";

export default function InfoPage() {
  useEffect(() => {
    document.title = "Merlain - Informations";
  }, []);

  return (
    <div className="z-0 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <Text
        title="À quoi ça sert ?"
        className="xl:col-span- col-span-4"
        body={
          <p>
            Ce site a pour objectif de fournir des prédictions précises sur le
            nombre d'appels attendus sur une période de 7 jours, répartis par
            tranches horaires.
          </p>
        }
      />
      <Text
        title="Comment l'utiliser ?"
        className="xl:col-span- col-span-8"
        body={
          <ul className="list-disc pl-5">
            <li>
              Dans la page{" "}
              <span className="font-medium text-dark dark:text-white">
                Prédictions
              </span>{" "}
              se trouvent les prédictions estimées. Il est possible de grouper
              ces données selon les besoins ainsi que de choisir la période à
              afficher, enfin il est aussi possible de changer le modèle de
              prédiction en choisissant en haut à droite afin d'avoir plusieurs
              estimations.
            </li>
            <li>
              Dans la page{" "}
              <span className="font-medium text-dark dark:text-white">
                Ajouts
              </span>{" "}
              il est possible d'ajouter les données du nombre d'appels
              enregistrés.
            </li>
            <li>
              La page{" "}
              <span className="font-medium text-dark dark:text-white">
                Suppression
              </span>{" "}
              permet de supprimer les données du nombre d'appels.
            </li>
          </ul>
        }
      />

      <Text
        title="Je rencontre un problème"
        className="xl:col-span- col-span-8"
        body={
          <>
            <p>
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-medium text-dark dark:text-white">
                    Erreurs dans l'ajout des données :
                  </span>{" "}
                  Assurez-vous que le fichier Excel (xlsx) respecte le format
                  attendu. Si une erreur survient, vérifiez les données du
                  fichier ou contactez un administrateur pour assistance.
                </li>
              </ul>
            </p>
            <div className="mt-4 flex items-center gap-2">
              Si l'erreur persiste, vous pouvez contacter l'administrateur :
            </div>
            <div className="mt-4 flex w-full items-center justify-center">
              <a
                href="mailto:email@domaine.ext"
                className="flex w-fit items-center gap-2 rounded-lg border-0 bg-orange-500 bg-opacity-75 p-4 text-dark dark:text-white"
              >
                <EmailIcon /> email@domaine.ext
              </a>
            </div>
          </>
        }
      />
      <Text
        title="Comment ajouter des données ?"
        className="xl:col-span- col-span-4"
        body={
          <p>
            Pour ajouter des données du nombre d'appels il suffit de déposer
            dans la page{" "}
            <span className="font-medium text-dark dark:text-white">
              Ajouts
            </span>{" "}
            le fichier{" "}
            <span className="font-medium text-dark dark:text-white">Excel</span>{" "}
            (xlsx) contenant les données.
          </p>
        }
      />
    </div>
  );
}
