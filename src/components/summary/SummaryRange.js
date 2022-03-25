import * as React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import DatePicker from "../../components/misc/DatePicker";

const SummaryRange = ({
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
  fetch,
}) => {
  React.useEffect(() => {
    fetch();
  }, [dateStart, dateEnd]);
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View style={{ flex: 1 }}>
        <DatePicker date={dateStart} setDate={setDateStart} header="Start" />
      </View>
      <View style={{ flex: 0.05 }}></View>
      <View style={{ flex: 1 }}>
        <DatePicker date={dateEnd} setDate={setDateEnd} header="End" />
      </View>
      <View style={{ flex: 0.05 }}></View>
    </View>
  );
};

export default withTheme(SummaryRange);
