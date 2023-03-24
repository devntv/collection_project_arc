import React from 'react';

const viewContext = React.createContext({});

export const ViewProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return <viewContext.Provider value={{ width, height }}>{children}</viewContext.Provider>;
};

export const useView = () => {
  const { width, height } = React.useContext(viewContext);
  return { width, height };
};
