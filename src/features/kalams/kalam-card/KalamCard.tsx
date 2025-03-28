import ExpandableCard from '../../../shared/components/expandable-card/ExpandableCard';
import { KalamProps } from '../models/KalamProps';

export default function KalamCard(props: KalamProps) {
  const { data } = props;
  console.log('data ', data);
  return <ExpandableCard />;
}
