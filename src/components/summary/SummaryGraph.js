import * as React from "react";
import { withTheme } from "react-native-paper";
import { Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const SummaryGraph = ({ incomeData, expenseData, theme }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VictoryChart
        width={windowWidth * 1.1}
        height={windowHeight / 2}
        theme={VictoryTheme.material}
      >
        <VictoryLine
          style={{ data: { stroke: "green" } }}
          x="date"
          y="amount"
          interpolation="linear"
          data={incomeData}
        />
        <VictoryLine
          style={{ data: { stroke: "red" } }}
          x="date"
          y="amount"
          interpolation="linear"
          data={expenseData}
        />
      </VictoryChart>
    </TouchableWithoutFeedback>
  );
};

export default withTheme(SummaryGraph);
