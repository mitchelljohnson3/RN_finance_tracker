import * as React from "react";
import { View } from "react-native";
import { TextInput, withTheme, Button } from "react-native-paper";

const ColorPicker = ({ label, color, setColor }) => {
  const [current, setCurrent] = React.useState(color);
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 3 }}>
        <TextInput
          defaultValue={color}
          label={label}
          onChangeText={(text) => setCurrent(text)}
        />
      </View>

      <View style={{ flex: 1, backgroundColor: current }}>
        <Button
          labelStyle={{ color: "black" }}
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={() => setColor(current)}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default withTheme(ColorPicker);
