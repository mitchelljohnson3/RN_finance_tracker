import * as React from "react";
import { withTheme, ActivityIndicator, Button } from "react-native-paper";
import { View, FlatList, RefreshControl } from "react-native";
import TransactionCard from "./TransactionCard";
import { fetchTransactions } from "../../server/db_access";
// return a maximum of 10 results in any single fetch request
const limit = 10;

const ResultList = ({
  data,
  setData,
  flatListRef,
  filter,
  showDelete,
  theme,
}) => {
  // controls whether our next page of data is loading
  const [pageLoading, setPageLoading] = React.useState(false);
  // current database query offset
  const [offset, setOffset] = React.useState(0);
  // controls whether our pull-to-refresh is currently refreshing
  const [refreshing, setRefreshing] = React.useState(false);
  // fetches data on pull-to-refresh
  const refresh = async () => {
    setOffset(0); // reset our offset
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  // get results from the server
  // if append, append new results to end of old
  // if not append, overwrite existing data
  const getData = async (append = false, newOffset = 0) => {
    // append limit and offset to filter object
    const newFilter = {
      ...filter,
      limit: limit,
      offset: newOffset,
    };
    const results = await fetchTransactions(newFilter);
    if (append) setData(data.concat(results));
    else {
      setData(results);
      if (flatListRef.current && results.length > 0) scrollToTop();
    }
  };
  // scrolls back to top of list
  const scrollToTop = () => {
    if (data.length == 0) return;
    flatListRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0,
    });
  };
  // removes a transaction item from the list with specified id
  const removeItem = (id) => {
    const newData = data.filter((item) => item.id != id);
    setData(newData);
  };
  // returns transaction cards holding results
  const renderTransactionCard = ({ item }) => {
    return (
      <TransactionCard
        removeItem={removeItem}
        showDelete={showDelete}
        data={item}
      />
    );
  };
  // component only fetches data when the filter is updated
  React.useEffect(() => {
    getData();
  }, [filter]);
  // called when user reaches end of list, fetches the next page of data
  const loadNextPage = async () => {
    if (data.length % 10 > 0) return;
    setOffset(offset + limit); // increment offset
    setPageLoading(true);
    await getData(true, offset + limit);
    setPageLoading(false);
  };
  return (
    <FlatList
      data={data}
      ref={flatListRef}
      renderItem={renderTransactionCard}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.primary}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      }
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <ActivityIndicator
          size="large"
          animating={pageLoading}
          color={theme.colors.primary}
        />
      }
      ListFooterComponentStyle={{
        paddingBottom: "13%",
      }}
      ListEmptyComponent={
        <View>
          <Button
            labelStyle={{ color: theme.colors.text_color }}
            disabled={true}
          >
            No Results!
          </Button>
        </View>
      }
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.2}
      style={{ backgroundColor: theme.colors.background_color }}
    />
  );
};

export default withTheme(ResultList);
