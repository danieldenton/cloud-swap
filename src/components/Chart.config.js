export const options = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Reserve History",
    align: "left",
    style: {
      color: "#DC3445",
    },
  },
  markers: {
    color: "#DC3445",
  },
  colors: ["#DC3445"],
  xaxis: {
    labels: {
      style: {
        colors: [
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
          "#DC3445",
        ],
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ["#DC3445"],
      },
    },
  },
};

export const series = [{ data: [30, 40, 45, 50, 49, 60, 70, 91] }];
