import { View } from "react-native";
import { RadioButton, Text, withTheme } from "react-native-paper";
const HorizontalButtonList = (props) => {
  // value -> state variable, onPress -> change state function, options -> options to display
  const { value, onPress, options } = props;
  const { colors } = props.theme;
  const getOptions = () => {
    return options.map(({ label, key }) => {
      return (
        <>
          <View style={{ flex: 1 }}>
            <RadioButton.Android
              label={label}
              status={value === label ? "checked" : "unchecked"}
              onPress={() => onPress(label)}
              color={colors.primary}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text style={{ paddingLeft: "10%" }}>{label}</Text>
          </View>
        </>
      );
    });
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {getOptions()}
    </View>
  );
};

export default withTheme(HorizontalButtonList);
