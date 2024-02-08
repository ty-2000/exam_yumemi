'use client';

import usePrefectureState from '@/state/state';
import Graph from '@/ui/graph';
import Prefs from '@/ui/prefs';
import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
  const [prefectureState, handlePrefectureSelected] = usePrefectureState();
  return (
    <ChakraProvider>
      <main>
        <Prefs prefPopuState={prefectureState} handlePrefSelected={handlePrefectureSelected} />
        <Graph prefPopuState={prefectureState} />
      </main>
    </ChakraProvider>
  );
}
