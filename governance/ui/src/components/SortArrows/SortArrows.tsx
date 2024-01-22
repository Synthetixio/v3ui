import { ChevronDown, ChevronUp } from '@snx-v3/icons';

export default function SortArrows({ up }: { up: boolean }) {
  return up ? <ChevronUp /> : <ChevronDown />;
}
