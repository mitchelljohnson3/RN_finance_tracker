import * as React from "react";
import { withTheme } from "react-native-paper";
import { View } from "react-native";
import ColorPicker from "./ColorPicker";
import getTheme from "../../server/get_theme";

const ThemePicker = ({ toggleSnackbar, saveTheme, theme }) => {
  const { colors } = theme;
  const [primary, setPrimary] = React.useState(colors.primary);
  const [accent, setAccent] = React.useState(colors.accent);
  const [text, setText] = React.useState(colors.text_color);
  const [background, setBackground] = React.useState(colors.background_color);
  const [unselected, setUnselected] = React.useState(colors.unselected);
  // whenever a new color is selected, the theme is updated
  React.useEffect(() => {
    const newColors = {
      primary: primary,
      accent: accent,
      text_color: text,
      background_color: background,
      unselected: unselected,
    };
    toggleSnackbar(true, "Updated theme!");
    saveTheme(getTheme(newColors));
  }, [primary, accent, text, background, unselected]);
  return (
    <View>
      <ColorPicker
        label="Primary"
        color={colors.primary}
        setColor={setPrimary}
      />
      <ColorPicker label="Accent" color={colors.accent} setColor={setAccent} />
      <ColorPicker label="Text" color={colors.text_color} setColor={setText} />
      <ColorPicker
        label="Background"
        color={colors.background_color}
        setColor={setBackground}
      />
      <ColorPicker
        label="Unselected"
        color={colors.unselected}
        setColor={setUnselected}
      />
    </View>
  );
};

export default withTheme(ThemePicker);
