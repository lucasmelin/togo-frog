import React from "react";
import moment from "moment";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory";

function Chart({ data }) {
  const xAxisTicks = [...Array(data.length).keys()];
  const yAxisTicks = data.map((x) => moment(x.data.timestamp).fromNow());
  const anxietyData = data.map((x, index) => {
    return {
      x: index,
      y: x.data.anxiety,
    };
  });
  const depressionData = data.map((x, index) => {
    return {
      x: index,
      y: x.data.depression,
    };
  });
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${datum.y}`}
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />
          }
        />
      }
    >
      <VictoryLine
        style={{
          data: { stroke: "#5e2ca5" },
          parent: { border: "1px solid #ccc" },
        }}
        data={anxietyData}
      />
      <VictoryLine
        style={{
          data: { stroke: "#137752" },
          parent: { border: "1px solid #ccc" },
        }}
        data={depressionData}
      />
      <VictoryAxis
        tickValues={xAxisTicks}
        style={{ tickLabels: { angle: -20 } }}
        tickFormat={yAxisTicks}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  );
}

export default Chart;
