import { DefaultTheme } from "react-native-paper";

const getTheme = (colors) => {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
  };
  return theme;
};

export default getTheme;
