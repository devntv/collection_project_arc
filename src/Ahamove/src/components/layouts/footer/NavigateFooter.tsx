import { footerData } from '../footerData';
import ListLink from './ListLink';

export default function NavigateFooter() {
  return (
    <div className="desktop:mt-6 desktop:grid-cols-6 grid grid-cols-2 gap-6">
      {footerData.map((item) => (
        <ListLink items={item.items} title={item.title} key={item.id} />
      ))}
    </div>
  );
}
