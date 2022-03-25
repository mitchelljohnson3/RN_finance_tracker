import * as React from "react";
import { View, Text } from "react-native";
import { TextInput, withTheme } from "react-native-paper";
const DescriptionPicker = ({ description, setDescription, header, theme }) => {
  const { colors } = theme;
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 20,
      }}
    >
      <TextInput
        value={description}
        right={
          <TextInput.Affix
            textStyle={{ color: colors.text_color }}
            text={`${description.length}/50`}
          />
        }
        label={header}
        maxLength={50}
        mode="outlined"
        onChangeText={(value) => setDescription(value)}
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
  );
};

export default withTheme(DescriptionPicker);
