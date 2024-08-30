import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const Plan: React.FC = () => {
  const location = useLocation();
  const selectedLocation = location.state?.selectedLocation;
  const startDate = location.state?.startDate ? new Date(location.state.startDate) : null;
  const endDate = location.state?.endDate ? new Date(location.state.endDate) : null;

  const [plans, setPlans] = useState<{ date: string; plan: string }[]>([]);
  const [newPlan, setNewPlan] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleAddPlan = () => {
    if (newPlan.trim() && selectedDate) {
      setPlans([...plans, { date: selectedDate, plan: newPlan }]);
      setNewPlan(''); // 입력 필드를 비웁니다.
    }
  };

  const dates = startDate && endDate ? generateDates(startDate, endDate) : [];

  function generateDates(start: Date, end: Date): string[] {
    const dateArray = [];
    let currentDate = moment(start);
    while (currentDate <= moment(end)) {
      dateArray.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'days');
    }
    return dateArray;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>일정을 추가하세요</h2>
        {dates.length > 0 && (
          <div>
            <label>날짜 선택: </label>
            <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate || ''}>
              <option value="" disabled>
                날짜를 선택하세요
              </option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        )}
        <input
          type="text"
          value={newPlan}
          onChange={(e) => setNewPlan(e.target.value)}
          placeholder="새로운 일정 추가"
        />
        <button onClick={handleAddPlan}>추가</button>
        <ul>
          {plans.map((plan, index) => (
            <li key={index}>
              <strong>{plan.date}: </strong>
              {plan.plan}
            </li>
          ))}
        </ul>
      </div>

      {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
        <div style={{ flex: 2 }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&center=${selectedLocation.lat},${selectedLocation.lng}&zoom=12`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Plan;
