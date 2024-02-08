export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PopulationWithYear = {
  year: number;
  value: number;
};

export type Population = {
  label: string;
  data: PopulationWithYear[];
};

export type PrefectureWithPopulationState = {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
  populationArr: Population[];
};
