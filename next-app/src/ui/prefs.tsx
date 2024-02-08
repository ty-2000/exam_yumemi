import { PrefectureWithPopulationState } from '@/lib/definitions';
import { Checkbox, Heading, Box } from '@chakra-ui/react';
export default function Prefs({
  prefPopuState: prefPopuState,
  handlePrefSelected,
}: {
  prefPopuState: PrefectureWithPopulationState[];
  handlePrefSelected: (prefCode: number, isSelected: boolean) => void;
}) {
  return (
    <Box>
      <Heading padding={10} display='flex' justifyContent='center' alignItems='center'>
        都道府県一覧
      </Heading>
      <Box padding={5}>
        {prefPopuState.map((prefDetail) => (
          <Box padding={2} key={prefDetail.prefCode} display='inline-block' w={120}>
            <Checkbox
              isChecked={prefDetail.isSelected}
              id={`pref-${prefDetail.prefCode}`}
            >
              {prefDetail.prefName}
            </Checkbox>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
