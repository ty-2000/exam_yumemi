'use client';

import { fetchPopulationPerYearByPrefectue, fetchPrefectures } from '@/api/resas';
import { PrefectureWithPopulationState } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function usePrefectureState(): [
  PrefectureWithPopulationState[],
  (prefCode: number, isSelected: boolean) => void,
] {
  const [prefPopuState, setPrefPopuState] = useState<PrefectureWithPopulationState[]>([]);
  useEffect(() => {
    async function fetch() {
      try {
        const prefs = await fetchPrefectures();
        const initPrefState = prefs.map((pref) => ({
          prefCode: pref.prefCode,
          prefName: pref.prefName,
          isSelected: false,
          populationArr: [],
        }));
        setPrefPopuState(initPrefState);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);
}
