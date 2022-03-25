import * as React from "react";
import {
  withTheme,
  Button,
  Title,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import { View, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  typeOptions,
  expenseOptions,
  incomeOptions,
  sortModeOptions,
} from "../../data/Options";
import { defaultFilter, sortOptions } from "../../data/Options";
import DatePicker from "../misc/DatePicker";
import AccordianList from "../misc/AccordianList";
import AmountPicker from "../misc/AmountPicker";
import DescriptionPicker from "../misc/DescriptionPicker";

const FilterModal = ({ visible, setVisible, submitFilter, theme }) => {
  const { colors } = theme;
  // state variables for filtering results
  const [type, setType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [amountOver, setAmountOver] = React.useState("");
  const [amountUnder, setAmountUnder] = React.useState("");
  const [descriptionContains, setDescriptionContains] = React.useState("");
  const [sortBy, setSortBy] = React.useState("Date");
  const [ascending, setAscending] = React.useState(false);
  // returns an equally spaced divider
  const divider = () => {
    return (
      <Divider
        style={{ backgroundColor: colors.background_color, height: "1%" }}
      />
    );
  };
  // hides the modal, and sets the new filter
  const hideModal = () => {
    setVisible(false);
    const newDateStart = new Date(dateStart);
    newDateStart.setDate(newDateStart.getDate() - 1);
    const newDateEnd = new Date(dateEnd);
    newDateEnd.setDate(newDateEnd.getDate() - 1);
    const newFilter = {
      type: type,
      dateStart: newDateStart,
      dateEnd: newDateEnd,
      amountOver: amountOver,
      amountUnder: amountUnder,
      descriptionContains: descriptionContains,
      category: category,
      sortBy: sortBy,
      ascending: ascending,
    };
    submitFilter(newFilter);
  };
  // clears filters
  const clearFilters = () => {
    setType(defaultFilter.type);
    setCategory(defaultFilter.category);
    setDateStart(defaultFilter.dateStart);
    setDateEnd(defaultFilter.dateEnd);
    setAmountOver(defaultFilter.amountOver);
    setAmountUnder(defaultFilter.amountUnder);
    setDescriptionContains(defaultFilter.descriptionContains);
    setSortBy(defaultFilter.sortBy);
    setAscending(defaultFilter.ascending);
  };
  // resets value of category on type change
  const updateType = (type) => {
    setType(type);
    setCategory("");
  };
  // handle sort mode update
  const handleSortModeUpdate = (mode) => {
    if (mode === "Ascending") setAscending(true);
    else setAscending(false);
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: colors.background_color,
          padding: 10,
          height: "100%",
          margin: 30,
          marginTop: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.unselected,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Title style={{ color: colors.primary }}>Filters</Title>
          </View>
          <Button onPress={clearFilters}>Clear</Button>
          <Button onPress={hideModal}>Save</Button>
        </View>
        {/* date range picker */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAwareScrollView keyboardOpeningTime={0} scrollEnabled={true}>
            <AccordianList
              title="Sort By"
              options={sortOptions}
              value={sortBy}
              onPress={setSortBy}
            />
            {divider()}
            <AccordianList
              title="Sort Mode"
              options={sortModeOptions}
              value={ascending ? "Ascending" : "Descending"}
              onPress={handleSortModeUpdate}
            />
            {divider()}
            <AccordianList
              title="Type"
              options={typeOptions}
              value={type}
              onPress={updateType}
            />
            {divider()}
            <AccordianList
              title="Category"
              options={type === "Expense" ? expenseOptions : incomeOptions}
              value={category}
              onPress={setCategory}
            />
            {divider()}
            <DatePicker
              date={dateStart}
              setDate={setDateStart}
              header="Date After"
            />
            {divider()}
            <DatePicker
              date={dateEnd}
              setDate={setDateEnd}
              header="Date Before"
            />
            {divider()}
            <AmountPicker
              amount={amountOver}
              setAmount={setAmountOver}
              header="Amount Above"
            />
            {divider()}
            <AmountPicker
              amount={amountUnder}
              setAmount={setAmountUnder}
              header="Amount Below"
            />
            {divider()}
            <DescriptionPicker
              header="Description Contains"
              description={descriptionContains}
              setDescription={setDescriptionContains}
            />
            <Button></Button>
            <Button></Button>
          </KeyboardAwareScrollView>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default withTheme(FilterModal);
