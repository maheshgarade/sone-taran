import ExpandableCards from '../../../shared/components/expandable-card/ExpandableCard-Kalam/ExpandableCard';
import { KalamProps } from '../models/KalamProps';

export default function KalamCard(props: KalamProps) {
  const { data } = props;
  console.log('data ', data);

  return (
    <div>
      {data.map((kalamItem, index) => (
        <ExpandableCards key={index} kalam={kalamItem} />
      ))}
    </div>
  );
}
