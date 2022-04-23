import './App.css';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [formatValue, setFormatValue] = useState('');
  const [email, setEmail] = useState('');
  const [schedule, setSchedule] = useState({});
  const [status, setStatus] = useState(0);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeFormat = (event) => {
    setFormatValue(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeStatus = (status) => {
    setStatus(status);
  };

const handleChangeSchedule = () => {
  setSchedule(schedule)
}

  const handleReset = () => {
    setName('');
    setFormatValue();
    setEmail('');
    setSchedule('');
  };

  const displayScheduleOptions = () => {
    if (status === 1) {
      return (
        <div className="optionContent">
          <span>Date</span>
          <input type="date" onChange={handleChangeSchedule}/>
          <span>at</span>
          <input type="text" placeholder="13:00" onChange={handleChangeSchedule}/>
        </div>
      );
    }
    if (status === 2) {
      return (
        <div className="optionContent">
          <span>Everyday at</span>
          <input type="text" placeholder="13:00" onChange={handleChangeSchedule}/>
        </div>
      );
    }
    if (status === 3) {
      return (
        <div className="optionContent"  onChange={handleChangeSchedule}>
          <span>Every</span>
          <select name="day" id="day-select">
            <option value="">--Please choose an option--</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>{' '}
          <span>at</span>
          <input type="text" placeholder="13:00" />
        </div>
      );
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        format: formatValue,
        email: email,
        schedule: schedule,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('response: ' + JSON.stringify(json));
      });
  };
  return (
    <form onSubmit={formSubmit} className="form">
      <div className="topLabel">
        <label>
          <span>Export Report</span>
        </label>
      </div>
      <div className="text">
        <label>
          <span>Report name</span>
          <input
            type="text"
            value={name}
            onChange={handleChangeName}
            placeholder="Shareable Report"
          />
        </label>
      </div>
      <div className="radio">
        <label>
          <span>Format</span>
          <input
            type="radio"
            value={'CSV'}
            onChange={handleChangeFormat}
            name="format"
          />{' '}
          CSV
          <input
            type="radio"
            value={'excel'}
            onChange={handleChangeFormat}
            name="format"
          />{' '}
          Excel
        </label>
      </div>
      <div className="text">
        <label>
          <span>E-mail to</span>
          <input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="client@company.com"
          />
        </label>
      </div>
      <div className="radio">
        <label className="options">
          <span>Schedule</span>
          <input
            type="radio"
            value={'No Repeat'}
            onChange={handleChangeStatus}
            name="schedule"
          />{' '}
          No Repeat
          <input
            type="radio"
            value={'Specific date'}
            onChange={(e) => handleChangeStatus(1)}
            name="schedule"
            checked={status === 1}
          />{' '}
          Specific date
          <input
            type="radio"
            value={'Daily'}
            onChange={(e) => handleChangeStatus(2)}
            name="schedule"
            checked={status === 2}
          />{' '}
          Daily
          <input
            type="radio"
            value={'Weekly'}
            onChange={(e) => handleChangeStatus(3)}
            checked={status === 3}
          />{' '}
          Weekly
        </label>
        {displayScheduleOptions()}
      </div>
      <div className="buttons">
        <button className="reset" type="reset" onClick={handleReset}>
          Cancel
        </button>
        <button className="submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default App;
