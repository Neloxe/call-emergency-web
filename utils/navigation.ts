import { HomeIcon } from "@/assets/icons";

export const NAV_DATA = [
  {
    label: "DONNÉES",
    items: [
      {
        title: "Prédictions",
        url: "/",
        icon: HomeIcon,
        items: [],
      },
      {
        title: "Ajouts",
        url: "/add",
        icon: HomeIcon,
        items: [],
      },
    ],
  },
  {
    label: "PARAMÈTRES",
    items: [
      {
        title: "Suppression",
        url: "/delete",
        icon: HomeIcon,
        items: [],
      },
      {
        title: "Informations",
        url: "/info",
        icon: HomeIcon,
        items: [],
      },
    ],
  },
];
