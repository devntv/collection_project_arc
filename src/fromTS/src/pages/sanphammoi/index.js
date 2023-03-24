/* eslint-disable no-nested-ternary */
import { Container } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { AddressClient, getData, isValid, MarketingClient } from 'clients';
import MockClient from 'clients/MockClient';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import Template from 'components/layout/Template';
import ExcelConvertToTable from 'components/organisms/ExcelConvertToTable';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services/SsrService';
import { REGION_MB } from 'sysconfig';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const title = getTitle('Sản phẩm mới');

export async function getServerSideProps(ctx) {
  const { isPreview = false } = ctx?.query;

  const regions = await AddressClient.getRegions(ctx);

  const mienBac = regions?.data?.find((item) => item.code === 'MIENBAC')?.provinceCodes || REGION_MB;

  return doWithServerSide(
    ctx,
    async (_, user) => ({
      props: {
        isMienBac: mienBac?.indexOf(`${user?.provinceCode}`) >= 0 || false,
        isPreview: isPreview === 'true',
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const Sanphammoi = ({ isMobile, isMienBac, isPreview }) => {
  const [data, setData] = useState([]);
  const [dataAlternative, setDataAlternative] = useState([]);
  const [dataPDF, setDataPDF] = useState('');

  useEffect(async () => {
    if (!data || data?.length === 0) {
      const newProductRes = await MarketingClient.getProductFiles({ q: { status: isPreview ? 'IN_PREVIEW' : 'IN_USE' }, isMienBac });

      const { dataProductFile, pdfProductFile } = newProductRes?.data;

      setData(JSON.parse(dataProductFile?.publicUrl || '[]') || []);
      setDataPDF(pdfProductFile?.publicUrl || '');
    }

    if (!dataAlternative || dataAlternative?.length === 0) {
      const newProductResult = await MockClient.loadDataAlternativeProducts({ isMienBac });

      if (isValid(newProductResult)) {
        setDataAlternative(getData(newProductResult));
      }
    }
  }, []);
  return (
    <Template pageTitle={title} isMobile={isMobile}>
      <Container>
        {/* <LinkComp
          href={isMienBac ? FILE_ALTERNATIVE_PRODUCT_MIEN_BAC : FILE_ALTERNATIVE_PRODUCT_MIEN_NAM}
          name="Tải xuống danh sách sản phẩm có sự thay đổi"
          target="_blank"
          className={styles.link}
        >
          <GetAppIcon />
        </LinkComp> */}

        {/* <PDFViewer FILE_NEW_PRODUCT={FILE_NEW_PRODUCT} /> */}
        {/* <ExcelAlternativeProductsConvertToTable rows={dataAlternative} />
        <LinkComp
          href={isMienBac ? FILE_ALTERNATIVE_PRODUCT_MIEN_BAC : FILE_ALTERNATIVE_PRODUCT_MIEN_NAM}
          name="Tải xuống danh sách sản phẩm có sự thay đổi"
          target="_blank"
          className={styles.link}
        >
          <GetAppIcon />
        </LinkComp>
        <br /> */}
        {dataPDF && (
          <LinkComp href={dataPDF} name="Tải xuống danh sách sản phẩm mới" target="_blank" className={styles.link}>
            <GetAppIcon />
          </LinkComp>
        )}
        <ExcelConvertToTable rows={data} />
        <Image src="/static/files/qr_code_sanphammoi.png" width={302} height={233} />

        {dataPDF && (
          <LinkComp href={dataPDF} name="Tải xuống danh sách sản phẩm mới" target="_blank" className={clsx(styles.link, styles.linkBottom)}>
            <GetAppIcon />
          </LinkComp>
        )}
      </Container>
    </Template>
  );
};
export default withLogin(Sanphammoi);
