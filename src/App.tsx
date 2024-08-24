import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DateSelector from './components/DateSelector';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={<Home startDate={startDate} endDate={endDate} />} 
        />
        <Route 
          path="/select-dates" 
          element={
            <DateSelector 
              setStartDate={setStartDate} 
              setEndDate={setEndDate} 
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
