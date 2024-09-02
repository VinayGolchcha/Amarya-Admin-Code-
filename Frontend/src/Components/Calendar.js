import React, { useState } from "react";
import './Calendar.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Calendar = ({ attendance, holidays }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateYearOptions = () => {
    const startYear = 2020; // Adjust this range as needed
    const endYear = new Date().getFullYear() + 5;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const isHoliday = (day) => {
    return holidays?.some(
      (holiday) =>
        holiday.year === selectedYear &&
        holiday.month === selectedMonth &&
        holiday.day === day
    );
  };

  const isAttendanceDay = (day) => {
    return attendance?.some(
      (att) =>
        att.year === selectedYear &&
        att.month === selectedMonth &&
        att.day === day
    );
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    // Adjust for Monday start: convert Sunday (0) to 6 and others
    const adjustedStartDay = (firstDayOfMonth + 6) % 7;
    const calendarDays = [];

    // Add empty cells for days before the start of the month
    for (let i = 0; i < adjustedStartDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayOfWeek = date.getDay();

      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHolidayMarked = isHoliday(day);
      const isPresent = isAttendanceDay(day);

      calendarDays.push(
        <div
          key={day}
          className={`day ${isWeekend || isHolidayMarked ? "weekend" : ""} ${isPresent ? "present" : ""
            }`}
          onClick={() => onDaySelect(date)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const onDaySelect = (day) => {
    console.log("day?>>>>>>>>>>>>>>>>>", day);
    handleOpen()

  }

  const getDayNames = () => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return dayNames.map((dayName, index) => (
      <div key={index} className="day-name">
        {dayName}
      </div>
    ));
  };

  return (
    <Box sx={{ margin: "20px 0", gap: "2rem", alignItems: 'stretch' }} className="flex-to-display">
      <div className="calender-box">
        <div className="calendar-controls">
          <div>
            <select value={selectedMonth} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (v, k) => (
                <option key={k} value={k}>
                  {new Date(0, k).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <select value={selectedYear} onChange={handleYearChange}>
              {generateYearOptions()}
            </select>
          </div>
          <div className="display-flex">
            <ArrowBackIosIcon onClick={handlePreviousMonth} />
            <ArrowForwardIosIcon onClick={handleNextMonth} />
          </div>
        </div>
        <div className="calendar">
          <div className="day-names">{getDayNames()}</div>
          <div className="calendar-days">{generateCalendar()}</div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
      <Box style={{
        width: "100%",
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}>
        <div className="flex-center">
          <div className="color-indicator present"></div>
          <div className="ml-15">Present</div>
        </div>
        <div className="flex-center">
          <div className="color-indicator abscent"></div>
          <div className="ml-15">Abscent</div>
        </div>
        <div className="flex-center">
          <div className="color-indicator wfh"></div>
          <div className="ml-15">WFH</div>
        </div>
        <div className="flex-center">
          <div className="color-indicator leaves"></div>
          <div className="ml-15">Leaves</div>
        </div>
        <div className="flex-center">
          <div className="color-indicator weekend"></div>
          <div className="ml-15">Weekends</div>
        </div>
        <div className="flex-center">
          <div className="color-indicator holiday"></div>
          <div className="ml-15">Holiday</div>
        </div>
      </Box>
    </Box>
  );
};

export default Calendar;
