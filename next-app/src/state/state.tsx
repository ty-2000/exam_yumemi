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

  async function handlePrefSelected(prefCode: number, isSelected: boolean) {
    const targetIndex = prefPopuState.findIndex((_) => _.prefCode === prefCode);
    if (targetIndex < 0) return;
    const targetPrefDetail = prefPopuState[targetIndex];
    console.log(`${targetPrefDetail?.prefName} turns to ${isSelected ? 'checked' : 'unchecked'}`);

    const needToFetch = isSelected && targetPrefDetail?.populationArr.length === 0;
    const newPopulationArr = needToFetch
      ? await fetchPopulationPerYearByPrefectue(prefCode)
      : targetPrefDetail?.populationArr;

    const newValue = [...prefPopuState];
    newValue[targetIndex] = {
      prefCode: targetPrefDetail.prefCode,
      prefName: targetPrefDetail.prefName,
      isSelected: isSelected,
      populationArr: newPopulationArr,
    };

    setPrefPopuState(newValue);
  }

  return [prefPopuState, handlePrefSelected];
}
