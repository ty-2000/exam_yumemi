import axios from 'axios';
import { Prefecture, Population } from '@/lib/definitions';

type PrefecturesResponse = {
  message: null;
  result: Prefecture[];
};

type PopulationCompositionPerYearResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: Population[];
  };
};

/** RESAS APIから都道府県一覧を取得する関数 */
export async function fetchPrefectures(): Promise<Prefecture[]> {
  try {
    const response = await axios.get<PrefecturesResponse>(
      `${process.env.NEXT_PUBLIC_RESAS_API_ENDPOINT}/api/v1/prefectures`,
      {
        headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
      },
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch prefectures');
  }
}

/** RESAS APIから特定の都道府県の人口構成を取得する関数 */
export async function fetchPopulationPerYearByPrefectue(prefCode: number): Promise<Population[]> {
  try {
    const response = await axios.get<PopulationCompositionPerYearResponse>(
      `${process.env.NEXT_PUBLIC_RESAS_API_ENDPOINT}/api/v1/population/composition/perYear`,
      {
        headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
        params: { prefCode, cityCode: '-' },
      },
    );
    return response.data.result.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch population composition');
  }
}
