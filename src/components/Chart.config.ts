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
    style: {
      color: "purple",
    },
  },
  title: {
    text: "Reserve History",
    align: "left",
    style: {
      color: "purple",
    },
  },
  markers: {
    color: "purple",
  },
  colors: ["purple"],
  xaxis: {
    labels: {
      style: {
        colors: [
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
          "purple",
        ],
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ["purple"],
      },
    },
  },
};

export const series = [{ data: [30, 40, 45, 50, 49, 60, 70, 91] }];
