import cn from 'classnames';
import EmptyState from '@/components/EmptyState';
import type { DriverHandbookItemProp } from './driverData';
import DriverHandbookItem from './DriverHandbookItem';

type Props = {
  items: Array<DriverHandbookItemProp>;
  className?: string;
};

export default function DriverHandbookContent(props: Props) {
  return (
    <div
      className={cn(
        'max-w-8xl desktop:px-8 min-h-content mx-auto flex w-full grow flex-col px-4',
        props.className
      )}
    >
      {props.items.length > 0 ? (
        <div className="desktop:grid-cols-3 grid grid-cols-1 gap-x-6 gap-y-14">
          {props.items.map((item, idx) => (
            <DriverHandbookItem
              key={idx}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              items={item.items}
              href={item.href}
            />
          ))}
        </div>
      ) : (
        <EmptyState type="job" />
      )}
    </div>
  );
}
