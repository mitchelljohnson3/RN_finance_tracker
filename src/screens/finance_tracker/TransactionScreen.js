import * as React from "react";
import { withTheme, Divider } from "react-native-paper";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import TransactionSubmission from "../../components/transaction/TransactionSubmission";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SnackBar from "../../components/misc/SnackBar";
import DatePicker from "../../components/misc/DatePicker";
import AmountPicker from "../../components/misc/AmountPicker";
import DescriptionPicker from "../../components/misc/DescriptionPicker";
import AccordianList from "../../components/misc/AccordianList";
import { typeOptions, expenseOptions, incomeOptions } from "../../data/Options";

const TransactionScreen = ({ filter, setFilter, theme }) => {
  // form state variables
  const [type, setType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [description, setDescription] = React.useState("");
  // snackbar  state variables
  const [snackbarColor, setSnackbarColor] = React.useState(10);
  const [snackbarText, setSnackbarText] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(0);
  // returns an equally spaced divider
  const divider = () => {
    return (
      <Divider
        style={{ backgroundColor: theme.colors.background_color, height: "2%" }}
      />
    );
  };
  // displays a custom snackbar message
  const toggleSnackbar = (type, text) => {
    setSnackbarColor(type ? "green" : "red");
    setSnackbarText(text);
    setShowSnackbar(1);
  };
  // clears all data from form
  const clearForm = () => {
    setType("");
    setCategory("");
    setAmount("");
    setDate(new Date());
    setDescription("");
  };
  // resets value of category on type change
  const updateType = (type) => {
    setType(type);
    setCategory("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        scrollEnabled={false}
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: theme.colors.background_color,
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 0.5,
            zIndex: 2,
          }}
        >
          <AccordianList
            title="Type"
            options={typeOptions}
            value={type}
            onPress={updateType}
          />
        </View>
        {divider()}
        <View style={{ flex: 0.5, zIndex: 1 }}>
          <AccordianList
            title="Category"
            options={type === "Expense" ? expenseOptions : incomeOptions}
            value={category}
            onPress={setCategory}
          />
        </View>
        {divider()}
        <View style={{ flex: 0.5 }}>
          <DatePicker date={date} setDate={setDate} header="Date" />
        </View>
        {divider()}
        <View style={{ flex: 0.5 }}>
          <AmountPicker amount={amount} setAmount={setAmount} header="Amount" />
        </View>
        {divider()}
        <View style={{ flex: 0.5 }}>
          <DescriptionPicker
            description={description}
            setDescription={setDescription}
            header="Optional Description"
          />
        </View>
        {divider()}
        <View style={{ flex: 0.5 }}>
          <TransactionSubmission
            type={type}
            category={category}
            amount={amount}
            date={date}
            description={description}
            clearForm={clearForm}
            toggleSnackbar={toggleSnackbar}
            filter={filter}
            setFilter={setFilter}
          />
        </View>
        <SnackBar
          visible={showSnackbar}
          setVisible={setShowSnackbar}
          text={snackbarText}
          color={snackbarColor}
        />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default withTheme(TransactionScreen);
