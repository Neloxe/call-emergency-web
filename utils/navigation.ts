import { DownloadIcon,TrendingUpIcon, TrashIcon, FourCircle } from "@/assets/icons";

export const NAV_DATA = [
  {
    label: "DONNÉES",
    items: [
      {
        title: "Prédictions",
        url: "/",
        icon: TrendingUpIcon,
        items: [],
      },
      {
        title: "Ajouts",
        url: "/upload",
        icon: DownloadIcon,
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
        icon: TrashIcon,
        items: [],
      },
      {
        title: "Informations",
        url: "/info",
        icon: FourCircle,
        items: [],
      },
    ],
  },
];
