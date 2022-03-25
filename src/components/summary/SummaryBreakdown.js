import * as React from "react";
import { View } from "react-native";
import { withTheme, Title, Divider, Text } from "react-native-paper";

const SummaryBreakdown = ({ breakdown, theme }) => {
  const { colors } = theme;
  const { suppliesSum, insuranceSum, taxSum, etsySum, marketSum } = breakdown;
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 5,
        flexDirection: "row",
        padding: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title style={{ color: colors.text_color }}>Expenses</Title>
        <Divider />
        <Text
          style={{ color: colors.text_color }}
        >{`Supplies: ${suppliesSum}`}</Text>
        <Text
          style={{ color: colors.text_color }}
        >{`Insurance: ${insuranceSum}`}</Text>
        <Text style={{ color: colors.text_color }}>{`Tax: ${taxSum}`}</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Title style={{ color: colors.text_color }}>Income</Title>
        <Divider />
        <Text style={{ color: colors.text_color }}>{`Etsy: ${etsySum}`}</Text>
        <Text
          style={{ color: colors.text_color }}
        >{`Market: ${marketSum}`}</Text>
      </View>
    </View>
  );
};

export default withTheme(SummaryBreakdown);
