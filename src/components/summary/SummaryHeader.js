import * as React from "react";
import { View } from "react-native";
import { withTheme, Paragraph, Avatar, FAB } from "react-native-paper";

const SummaryHeader = ({ fetch, totalLoss, totalGain, theme }) => {
  const { colors } = theme;
  const net = totalLoss + totalGain;
  const [refreshing, setRefreshing] = React.useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await fetch();
    setRefreshing(false);
  };
  return (
    <View style={{ flex: 1, width: "100%", flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 5,
          justifyContent: "space-around",
          flexDirection: "row",
          flex: 6.5,
          height: "100%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon size={24} color={colors.text_color} icon="arrow-down" />
          <Paragraph style={{ color: colors.text_color }}>{`$${
            totalLoss * -1
          }`}</Paragraph>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon size={24} color={colors.text_color} icon="arrow-up" />
          <Paragraph
            style={{ color: colors.text_color }}
          >{`$${totalGain}`}</Paragraph>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon
            size={24}
            color={colors.text_color}
            icon={net > 0 ? "cash-plus" : "cash-minus"}
          />
          <Paragraph
            style={{ color: colors.text_color }}
          >{`$${net}`}</Paragraph>
        </View>
      </View>
      {/* <View style={{ flex: 1, paddingLeft: 5, borderWidth: 1 }}>
        <FAB
          style={{ backgroundColor: colors.primary }}
          color={colors.text_color}
          small
          icon="refresh"
          onPress={refresh}
          loading={refreshing}
        />
      </View> */}
    </View>
  );
};

export default withTheme(SummaryHeader);
