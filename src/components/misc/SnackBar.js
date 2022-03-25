import { View } from "react-native";
import { Snackbar } from "react-native-paper";
const SnackBar = (props) => {
  const { visible, setVisible, color, text } = props;
  return (
    <View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={() => setVisible(0)}
        style={{ backgroundColor: color }}
      >
        {text}
      </Snackbar>
    </View>
  );
};

export default SnackBar;
