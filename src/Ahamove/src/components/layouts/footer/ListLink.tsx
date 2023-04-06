import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Item = {
  id: string;
  name: string;
  href: string;
  external: boolean;
};

type Props = {
  title: string;
  items: Array<Item>;
};

export default function ListLink({ title, items }: Props) {
  const { locale } = useRouter();
  return (
    <div className="desktop:space-y-6 space-y-4 pr-2">
      <h3 className="text-body16 text-neutral-90 desktop:text-subtitle20 text-left font-bold">
        {title}
      </h3>
      <ul className="text-body14 text-neutral-90 desktop:space-y-4 desktop:text-body16 space-y-3 text-left">
        {items.map((item, idx) => (
          <li key={idx}>
            <Link href={item.href} rel="noreferrer" passHref locale={locale}>
              <a
                title={item.name}
                className="hover:text-neutral-70"
                target={item.external ? '_blank' : '_self'}
              >
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
