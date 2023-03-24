/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import { getData, getFirst } from 'clients';
import { TopManufacturer } from 'constants/manufacturer';
import MasterDataService from 'services/MasterDataService';
import { ENV } from 'sysconfig';
import create from 'zustand';
import { persist } from 'zustand/middleware';

// ttl 30p
const timeCache = 30 * 60 * 1000;
const defaultState = { map: {}, topManufacturer: [] };
const convertData = (data) => {
  const curTime = +new Date();

  return { ...data, ttl: curTime + timeCache, createdTime: curTime, lastUpdatedTime: null };
};
const useManufacturers = create(
  persist(
    (set, get) => ({
      ...defaultState,
      getTopManufacturer: async () => {
        if (get()?.topManufacturer?.length > 0) {
          return get()?.topManufacturer;
        }
        let result;
        switch (ENV) {
          case 'uat':
          case 'prd':
            result = await Promise.all(TopManufacturer.map((code) => get()?.getByCode({ code })));
            break;
          case 'stg':
          case 'dev':
          default:
            result = getData(await MasterDataService.getManufacturers({ offset: 0, limit: 20 }));
        }

        set({ topManufacturer: result });
        return result;
      },
      getByCode: async ({ code }) => {
        if (!code) {
          return null;
        }
        const mapInfo = get()?.map || {};
        let info = mapInfo[code];
        if (info) {
          if (info.ttl < +new Date()) get()?.revalidateByCode({ code });
          return info;
        }

        info = await get()?.revalidateByCode({ code });
        return info;
      },
      revalidateByCode: async ({ code }) => {
        const mapInfo = get()?.map || {};
        const res = await MasterDataService.getManufacturerInfo(code);
        const info = getFirst(res);
        if (info) {
          mapInfo[code] = convertData(info);
          set({ map: mapInfo });
        }
        return info || null;
      },
      reset: () => {
        useManufacturers.persist.clearStorage();
        set(defaultState);
      },
    }),
    {
      name: 'manufacturer_v2', // unique name
    },
  ),
);

export default useManufacturers;
