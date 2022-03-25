import * as React from "react";
import { withTheme, Portal } from "react-native-paper";
import { View } from "react-native";
import FilterBar from "../../components/history/FilterBar";
import ResultList from "../../components/history/ResultList";

const HistoryScreen = ({ filter, setFilter }) => {
  // toggles whether a delete button is shown on each transaction card
  const [showDelete, setShowDelete] = React.useState(false);
  // create an empty ref to our flatlist component, so we can set its scroll position
  const flatListRef = React.useRef();
  // holds all transaction data being shown
  const [data, setData] = React.useState([]);
  return (
    <View style={{ flex: 1 }}>
      <Portal.Host>
        <FilterBar
          flatListRef={flatListRef}
          filter={filter}
          setFilter={setFilter}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          data={data}
        />
        <ResultList
          flatListRef={flatListRef}
          filter={filter}
          showDelete={showDelete}
          data={data}
          setData={setData}
        />
      </Portal.Host>
    </View>
  );
};

export default withTheme(HistoryScreen);
