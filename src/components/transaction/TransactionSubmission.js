import * as React from "react";
import { Button, withTheme, ActivityIndicator } from "react-native-paper";
import { submitTransaction } from "../../server/db_access";

const TransactionSubmission = (props) => {
  // toggles activity indicator
  const [activity, setAcvitity] = React.useState(0);
  const formComplete = () => {
    return props.type && props.category && props.amount;
  };
  // submits a new transaction to the server
  const submit = async () => {
    // if not all required fields have been filled out, show a pop-up saying to finish form
    if (!formComplete()) {
      props.toggleSnackbar(false, "All required fields must be filled!");
      return;
    }
    if (isNaN(props.amount)) {
      props.toggleSnackbar(false, "Amount is not a number!");
      return;
    }
    // package json data
    const data = {
      typeid: props.type[0],
      categoryid: props.category[0],
      amount: props.amount,
      date: props.date,
      description: props.description,
    };
    setAcvitity(1); // display spinning wheel
    const success = await submitTransaction(data); // await response from server
    if (success) {
      props.clearForm(); // clear the input form
      props.toggleSnackbar(true, "Success!"); // show success snackbar
    } else {
      props.toggleSnackbar(false, "Server Error!"); // show fail snackbar
    }
    props.setFilter({ test: 0, ...props.filter }); // this triggers a rerender of the history page
    setAcvitity(0); // close spinning wheel
  };
  return (
    <Button
      mode="contained"
      labelStyle={{ fontSize: 33, color: props.theme.colors.text_color }}
      onPress={() => submit()}
    >
      {activity ? (
        <ActivityIndicator animating={activity} size="large" color="black" />
      ) : (
        "Submit"
      )}
    </Button>
  );
};

export default withTheme(TransactionSubmission);
