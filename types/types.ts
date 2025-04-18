import type { Dispatch, SetStateAction, SVGProps } from "react";

export type DataProps = {
  predictions: {
    "date": string;
    "value": number;
  }[];
  reals: {
    "date": string;
    "value": number;
  }[];
  futures:{
    "date": string;
    "value": number;
  }[];
};

export type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  items: NavItem[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export type SubNavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  items: SubNavItem[];
};

export type SetStateActionType<T> = Dispatch<SetStateAction<T>>;

export type SVGPropsType = SVGProps<SVGSVGElement>;

export type themeType = "light" | "dark";