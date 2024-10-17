import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityList } from './cities';  
import {
    StyledContainer, 
    StyledHeader,
    StyledInputWrapper, 
    StyledInput,
    DropdownList,
    DropdownItem,
    CityName,
    CountryName,
} from './city_styles';

const CitySelector: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(cityList);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() === '') {
      setFilteredCities(cityList);
    } else {
      const filtered = cityList.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered.length > 0 ? filtered : [{ name: '검색 결과가 없습니다.', lat: 0, lng: 0, country: '' }]);
    }
    setShowDropdown(true);
  };

  const handleSelect = (city: any) => {
    if (city.name !== '검색 결과가 없습니다.') {
      navigate('/', { state: { selectedLocation: city } });
    }
    setShowDropdown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>이번엔 어디로 떠날 계획이신가요?</StyledHeader>
      <StyledInputWrapper ref={dropdownRef}>
        <StyledInput
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder="여행지를 검색해보세요."
        />
        {showDropdown && filteredCities.length > 0 && (
          <DropdownList>
            {filteredCities.map((city, index) => (
              <DropdownItem key={index} onClick={() => handleSelect(city)}>
                <CityName>{city.name}</CityName>
                <CountryName>{city.country}</CountryName>
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </StyledInputWrapper>
    </StyledContainer>
  );
};

export default CitySelector;
