import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CitySelector from './components/CitySelector';
import DateSelector from './components/DateSelector';
import Plan from './components/Plan';
import { styled } from 'styled-components';

const AppContainer = styled.div`
`;

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <AppContainer>
      <Header></Header>
    <Routes>
      <Route path="/" element={<Home startDate={startDate} endDate={endDate} />} />
      <Route path="/select-cities" element={<CitySelector />} />
      <Route
        path="/select-dates"
        element={<DateSelector setStartDate={setStartDate} setEndDate={setEndDate} />}
      />
      <Route path="/plan" element={<Plan />} /> {/* Plan 경로 추가 */}
    </Routes>
    </AppContainer>
  );
};

export default App;
