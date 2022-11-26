import { VictoryLabel, VictoryPie } from "victory";
import styles from "./../../Styles/Soporte/Reportes.module.css";

function PieChart({ label, data, labels }) {
  return (
    <div className={styles.chart}>
      <VictoryPie
        data={data}
        colorScale={["tomato", "orange", "gold", "springgreen", "cyan"]}
        labels={labels}
        radius={180}
        innerRadius={100}
        width={800}
        height={500}
        labelRadius={225}
        labelPlacement={"vertical"}
        labelComponent={
          <VictoryLabel
            textAnchor={"middle"}
            style={{
              fontFamily: "sans-serif, Manrope",
              fontSize: 16,
              fontWeight: 500,
              fill: "rgba(0,53,108,1)",
            }}
          />
        }
      />
      <div className={styles.chartTitle}>Tickets por {label}</div>
    </div>
  );
}

export default PieChart;
