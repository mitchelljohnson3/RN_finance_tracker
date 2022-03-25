import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { withTheme } from "react-native-paper";
import SummaryGraph from "../../components/summary/SummaryGraph";
import SummaryBreakdown from "../../components/summary/SummaryBreakdown";
import SummaryRange from "../../components/summary/SummaryRange";
import SummaryHeader from "../../components/summary/SummaryHeader";
import { fetchSummary } from "../../server/db_access";
import { defaultSummaryData } from "../../data/Options";

const SummaryScreen = ({ theme }) => {
  // holds data currently being displayed
  const [data, setData] = React.useState(defaultSummaryData);
  // holds date range start and end
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const fetch = async () => {
    if (!dateStart || !dateEnd) return;
    const obj = { dateStart: dateStart, dateEnd: dateEnd };
    setData(await fetchSummary(obj));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        scrollEnabled={false}
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background_color,
        }}
      >
        <View style={styles.header}>
          <SummaryHeader
            fetch={fetch}
            totalLoss={data.totalLoss}
            totalGain={data.totalGain}
          />
        </View>
        <View style={styles.graph}>
          <SummaryGraph incomeData={data.income} expenseData={data.expense} />
        </View>
        <View style={styles.range}>
          <SummaryRange
            dateStart={dateStart}
            dateEnd={dateEnd}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
            fetch={fetch}
          />
        </View>
        <View style={styles.breakdown}>
          <SummaryBreakdown breakdown={data.breakdown} />
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  header: {
    flex: 1,
    padding: 5,
    marginBottom: "-10%",
  },
  graph: {
    flex: 5,
  },
  range: {
    flex: 1,
    padding: 5,
    marginTop: "-5%",
  },
  breakdown: {
    flex: 2,
  },
});

export default withTheme(SummaryScreen);
