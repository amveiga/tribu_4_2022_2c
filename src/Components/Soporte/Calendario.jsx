import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./../Styles/Soporte/Calendario.module.css";

function Calendario() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dateVerify = (date) => {
    return (
      date.getFullYear() > startDate.getFullYear() ||
      date.getMonth() > startDate.getMonth() ||
      (date.getMonth() === startDate.getMonth() &&
        date.getDate() >= startDate.getDate())
    );
  };

  return (
    <div className={styles.calendario}>
      Entre
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        className={styles.input}
        calendarClassName={styles.calendarioContainer}
        dayClassName={(date) => styles.day}
        wrapperClassName={styles.wrapper}
      />
      Y
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
        className={styles.input}
        calendarClassName={styles.calendarioContainer}
        dayClassName={(date) =>
          dateVerify(date) ? styles.day : styles.disabledDay
        }
        wrapperClassName={styles.wrapper}
      />
    </div>
  );
}

export default Calendario;
