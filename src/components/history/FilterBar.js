import * as React from "react";
import { withTheme, FAB, Button } from "react-native-paper";
import { View } from "react-native";
import FilterModal from "./FilterModal";

const FilterBar = ({
  data,
  flatListRef,
  setFilter,
  showDelete,
  setShowDelete,
  theme,
}) => {
  const { colors } = theme;
  // updates our master filter object
  const submitFilter = (newFilter) => {
    setFilter(newFilter);
  };
  // toggles our show delete switch value
  const toggleShowDelete = () => {
    setShowDelete(!showDelete);
  };
  // scrolls back to top of list
  const scrollToTop = () => {
    if (data.length == 0) return;
    flatListRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0,
    });
  };
  // controls the visibility of the filter modal
  const [visible, setVisible] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background_color,
        padding: 3,
      }}
    >
      <View style={{ flex: 0.5 }}>
        <FAB
          style={{ backgroundColor: colors.primary }}
          color={showDelete ? colors.text_color : colors.unselected}
          small
          icon="pencil"
          onPress={toggleShowDelete}
        />
      </View>
      <View style={{ flex: 3 }}>
        <Button onPress={scrollToTop}>Back To Top</Button>
      </View>
      <View style={{ flex: 0.5 }}>
        <FAB
          style={{ backgroundColor: colors.primary }}
          color={visible ? colors.text_color : colors.unselected}
          small
          icon="menu"
          onPress={() => setVisible(true)}
        />
      </View>
      {/* <FilterBubbles filter={filter} /> */}
      <FilterModal
        visible={visible}
        setVisible={setVisible}
        submitFilter={submitFilter}
      />
    </View>
  );
};

export default withTheme(FilterBar);
