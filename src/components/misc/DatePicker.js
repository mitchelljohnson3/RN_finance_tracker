import * as React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

const DatePicker = ({ date, setDate, header, theme }) => {
  const { colors } = theme;

  return (
    <DatePickerInput
      label={header}
      locale="en"
      value={date}
      onChange={(date) => setDate(date)}
      inputMode="end"
      style={{
        backgroundColor: colors.primary,
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginBottom: -20,
      }}
      theme={{
        colors: {
          primary: colors.text_color,
          placeholder: colors.text_color,
          text: colors.text_color,
          disabled: "#0000000000",
        },
      }}
    />
  );
};

export default withTheme(DatePicker);
