import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface HomeProps {
  startDate: Date | null;
  endDate: Date | null;
}

const Home: React.FC<HomeProps> = ({ startDate, endDate }) => {
  return (
    <div>
      <h1>메인 화면</h1>
      <p>시작 날짜: {startDate ? moment(startDate).format('YYYY-MM-DD') : '선택되지 않음'}</p>
      <p>종료 날짜: {endDate ? moment(endDate).format('YYYY-MM-DD') : '선택되지 않음'}</p>
      <Link to="/select-dates">
        <button>여행 날짜가 어떻게 되시나요?</button>
      </Link>
    </div>
  );
}

export default Home;
