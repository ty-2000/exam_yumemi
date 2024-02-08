'use client';

import usePrefectureState from '@/state/state';
import Prefs from '@/ui/prefs';
import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
  const [prefectureState, handlePrefectureSelected] = usePrefectureState();
  return (
    <ChakraProvider>
      <main>
        <Prefs prefPopuState={prefectureState} handlePrefSelected={handlePrefectureSelected} />
    </main>
    </ChakraProvider>
  );
}
