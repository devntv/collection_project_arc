import { getData } from 'clients/Clients';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingLocal = ({ name, initData, fetchData }) =>
  create(
    persist(
      (set, get) => ({
        data: initData() || [],
        isLoading: false,
        fetch: async () => {
          set({ isLoading: true });
          const result = await fetchData();
          set({ data: getData(result), isLoading: false, log: result });
        },
        getData: async () => {
          const { data } = get();
          if (data?.length > 1) {
            return data;
          }
          await fetch();
          return get().data;
        },
      }),
      {
        name,
      },
    ),
  );

export default useSettingLocal;
