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
