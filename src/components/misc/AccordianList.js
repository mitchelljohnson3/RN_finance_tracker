import * as React from "react";
import { View } from "react-native";
import { List, withTheme } from "react-native-paper";

const AccordianList = ({ value, onPress, options, title, theme, zIndex }) => {
  const { colors } = theme;
  // controls whether the list is expanded or not
  const [expanded, setExpanded] = React.useState(false);
  // closes accordian list, and calls
  const handlePress = (label) => {
    setExpanded(!expanded);
    if (label) onPress(label);
  };
  const getOptions = () => {
    return options.map(({ label, key, icon }) => {
      return (
        <List.Item
          left={() => <List.Icon color={colors.text_color} icon={icon} />}
          key={key}
          title={label}
          onPress={() => handlePress(label)}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 20,
          }}
          titleStyle={{ color: colors.text_color }}
        />
      );
    });
  };

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        borderRadius: 20,
        borderColor: colors.background_color,
        borderWidth: 1,
        zIndex: zIndex,
      }}
    >
      <List.Accordion
        onPress={handlePress}
        expanded={expanded}
        right={(props) => (
          <List.Icon
            style={{ height: 15 }}
            color={colors.text_color}
            icon={expanded ? "chevron-up" : "chevron-down"}
          />
        )}
        title={`${title} - ${value}`}
        titleStyle={{ color: colors.text_color }}
        style={{
          backgroundColor: colors.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: expanded ? 0 : 20,
          borderBottomLeftRadius: expanded ? 0 : 20,
        }}
        theme={{
          colors: {
            background: colors.background_color,
          },
        }}
      >
        {getOptions()}
      </List.Accordion>
    </View>
  );
};
export default withTheme(AccordianList);
