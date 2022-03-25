import * as React from "react";
import {
  withTheme,
  Card,
  Paragraph,
  Title,
  Divider,
  Button,
} from "react-native-paper";
import { View } from "react-native";
import { deleteTransaction } from "../../server/db_access";

const TransactionCard = (props) => {
  const { colors } = props.theme;
  const { showDelete, removeItem } = props;
  const { id, type, amount, date, category, description } = props.data;
  const [loading, setLoading] = React.useState(false);
  const formatDate = (date) => {
    let d = Date.parse(date);
    d = new Date(d);
    return d.toLocaleDateString();
  };
  const deleteCard = async () => {
    const data = { id: id };
    setLoading(true);
    await deleteTransaction(data);
    removeItem(id);
  };
  return (
    <Card
      style={{
        margin: 5,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: colors.primary,
      }}
    >
      <View style={{ padding: 5 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Title style={{ color: colors.text_color }}>{type}</Title>
          </View>
          <Title style={{ color: colors.text_color }}>{formatDate(date)}</Title>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Paragraph style={{ color: colors.text_color }}>
              Amount: ${amount}
            </Paragraph>
          </View>
          <Paragraph style={{ color: colors.text_color }}>{category}</Paragraph>
        </View>
        <Divider />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Paragraph
              style={{ fontStyle: "italic", color: colors.text_color }}
            >
              {description}
            </Paragraph>
          </View>
          <Button
            disabled={!showDelete}
            loading={loading}
            onPress={deleteCard}
            color={showDelete ? colors.text_color : colors.unselected}
          >
            Delete
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default withTheme(TransactionCard);
