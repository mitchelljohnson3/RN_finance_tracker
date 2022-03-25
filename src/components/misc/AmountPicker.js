import { TextInput, withTheme } from "react-native-paper";
import { View, Text } from "react-native";

const AmountPicker = ({ amount, setAmount, header, theme }) => {
  const { colors } = theme;
  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          value={amount}
          mode="outlined"
          label={header}
          keyboardType="numeric" // opens the numeric keypad instead of default keyboard
          maxLength={7} //setting limit of input
          onChangeText={(amount) => setAmount(amount)}
          dense={true}
          selectionColor={colors.text_color}
          outlineColor={colors.primary}
          style={{ backgroundColor: colors.primary }}
          theme={{
            colors: {
              placeholder: colors.text_color,
              text: colors.text_color,
            },
          }}
        />
      </View>
    </>
  );
};

export default withTheme(AmountPicker);
