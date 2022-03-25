import * as React from "react";
import { withTheme } from "react-native-paper";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native";
import ThemePicker from "../../components/settings/ThemePicker";
import SnackBar from "../../components/misc/SnackBar";

const SettingsScreen = ({ saveTheme, theme }) => {
  // snackbar  state variables
  const [snackbarColor, setSnackbarColor] = React.useState(10);
  const [snackbarText, setSnackbarText] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(0);
  // displays a custom snackbar message
  const toggleSnackbar = (type, text) => {
    setSnackbarColor(type ? "green" : "red");
    setSnackbarText(text);
    setShowSnackbar(1);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
        <KeyboardAwareScrollView
          keyboardOpeningTime={0}
          scrollEnabled={false}
          style={{
            flex: 1,
            padding: 10,
            height: "100%",
          }}
        >
          <ThemePicker toggleSnackbar={toggleSnackbar} saveTheme={saveTheme} />
          <SnackBar
            visible={showSnackbar}
            setVisible={setShowSnackbar}
            text={snackbarText}
            color={snackbarColor}
          />
        </KeyboardAwareScrollView>
      </PaperProvider>
    </TouchableWithoutFeedback>
  );
};

export default withTheme(SettingsScreen);
