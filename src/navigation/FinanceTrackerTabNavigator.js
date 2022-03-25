import * as React from "react";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import TransactionScreen from "../screens/finance_tracker/TransactionScreen";
import HistoryScreen from "../screens/finance_tracker/HistoryScreen";
import SummaryScreen from "../screens/finance_tracker/SummaryScreen";
import { Provider as PaperProvider, withTheme } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { defaultFilter } from "../data/Options";

const FinanceTrackerTabNavigator = ({ theme }) => {
  // holds the current search filter
  const [filter, setFilter] = React.useState(defaultFilter);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
      <PaperProvider theme={theme}>
        <Tabs showTextLabel={false}>
          <TabScreen label="Transaction" icon="currency-usd">
            <TransactionScreen filter={filter} setFilter={setFilter} />
          </TabScreen>
          <TabScreen label="History" icon="history">
            <HistoryScreen filter={filter} setFilter={setFilter} />
          </TabScreen>
          <TabScreen label="Summary" icon="chart-areaspline-variant">
            <SummaryScreen />
          </TabScreen>
        </Tabs>
      </PaperProvider>
    </>
  );
};

export default withTheme(FinanceTrackerTabNavigator);
