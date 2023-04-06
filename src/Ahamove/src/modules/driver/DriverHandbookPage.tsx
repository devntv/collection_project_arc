import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import Container from '@/components/layouts/Container';
import useDebounce from '@/lib/useDebounce';
import { driverConfig } from './driverConfig';
import { driverHandbookData } from './driverData';
import DriverHandbookContent from './DriverHandbookContent';

type Props = {
  // Declare DriverHandbookPage props
};

export const DriverHandbookPage: FC<Props> = () => {
  const { t } = useTranslation(driverConfig.i18nNamespaces);
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(driverHandbookData);
  const debouncedValue = useDebounce<string>(filterText, 500);

  useEffect(() => {
    setFilteredData(
      driverHandbookData.filter((item) =>
        item.title.toLowerCase().includes(filterText.toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterText(e.target.value);
  return (
    <Container title={t('driver:handbook.title')}>
      <main className="mt-header-mobile desktop:mt-header-desktop min-h-content relative flex w-full grow flex-col pb-20">
        <div className="w-full bg-[url(/static/images/driver/banner-handbook.webp)] pt-14 pb-36">
          <div className="max-w-content desktop:px-8 mx-auto px-4">
            <h1 className="desktop:text-title60 text-title42 text-center font-bold text-white">
              Cẩm nang tài xế
            </h1>
            <div className="group mt-6 mb-12 flex items-center justify-between rounded-lg bg-white p-4">
              <input
                className="text-body16 text-neutral-40 grow border-none font-normal focus:border-none focus:shadow-none focus:outline-none focus:ring-transparent focus-visible:outline-none"
                type="text"
                placeholder="Tìm kiếm cẩm nang..."
                onChange={inputHandler}
              />
              <div className="relative h-6 w-6 flex-none bg-transparent">
                <Image
                  src="/static/icons/driver/Search.svg"
                  alt=""
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
        <DriverHandbookContent items={filteredData} className="-mt-20" />
      </main>
    </Container>
  );
};
