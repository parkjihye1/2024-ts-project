import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  StyledContainer, 
  CitySelectionButton,
  SelectionWrapper, 
  SelectedCityText,
  DateNavigationButton,
  DateInfoWrapper,
  DateText,
  PlanButton,
} from './home_styles';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface HomeProps {
  startDate: Date | null;
  endDate: Date | null;
}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (location.state?.selectedLocation) {
      setSelectedLocation(location.state.selectedLocation);
    } else {
      setSelectedLocation(null);  
    }

    if (location.state?.startDate) {
      setStartDate(new Date(location.state.startDate));
    } else {
      setStartDate(null); 
    }

    if (location.state?.endDate) {
      setEndDate(new Date(location.state.endDate));
    } else {
      setEndDate(null);  
    }
  }, [location.state]);

  const handleCitySelection = () => {
    navigate('/select-cities');
  };

  const handleDateNavigation = () => {
    if (selectedLocation) {
      navigate('/select-dates', {
        state: {
          selectedLocation: selectedLocation,
        },
      });
    }
  };

  const handlePlanNavigation = () => {
    navigate('/plan', {
      state: {
        selectedLocation: selectedLocation,
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  const formatDate = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    }).format(date);

    return formattedDate.replace(/\s/g, '').replace(/\.(?=\()/g, '');
  };

  return (
    <StyledContainer>
      <CitySelectionButton onClick={handleCitySelection}>어디로 여행 가시나요?</CitySelectionButton>

      {selectedLocation && (
        <SelectionWrapper>
          <SelectedCityText>{selectedLocation.name}</SelectedCityText>
          <DateNavigationButton onClick={handleDateNavigation}>
            여행 날짜가 어떻게 되시나요?
          </DateNavigationButton>
        </SelectionWrapper>
      )}

      {startDate && endDate && (
        <DateInfoWrapper>
          <DateText>
            {`${formatDate(startDate)} - ${formatDate(endDate)}`}
          </DateText>
        </DateInfoWrapper>
      )}

      {selectedLocation && startDate && endDate && (
        <PlanButton onClick={handlePlanNavigation}>트립 플랜 설정</PlanButton>
      )}
    </StyledContainer>
  );
};

export default Home;
