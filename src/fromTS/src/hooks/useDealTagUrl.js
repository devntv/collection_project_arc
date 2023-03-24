import { useEffect, useState } from 'react';

function useDealTagUrl(datas) {
  const baseURL = '/khuyenmai';
  const [link, setLink] = useState('');
  const { campaign: dataDeal } = datas || {};
  const { campaignType, slug } = dataDeal?.campaign || {};
  useEffect(() => {
    function getLink() {
      if (campaignType !== 'DAILY_DEAL') {
        setLink(`${baseURL}/${slug}`);
      }
      // deal
      if (!dataDeal) setLink('/deals');
    }
    getLink();
    // console.log('counts render', link, `render ${link} lan`);
  }, [datas]);
  return [link];
}

export default useDealTagUrl;
