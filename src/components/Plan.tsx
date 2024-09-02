import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript, Libraries } from '@react-google-maps/api';
import { FaTrash } from 'react-icons/fa';  // react-icons에서 FaTrash 임포트
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';  // react-beautiful-dnd에서 필요한 컴포넌트 임포트
import NoImage from '../images/NoImages.svg';
import CloseSchedulesIcon from '../images/CloseSchedules.svg';
import OpenSchedulesIcon from '../images/OpenSchedules.svg';
import {
  StyledContainer,
  TopPanel,
  LocationName,
  DateRange,
  MainContent,
  SidePanel,
  SearchInputWrapper,
  SearchInput,
  SearchResultsWrapper,
  PlaceItem,
  PlaceImage,
  PlaceInfo,
  PlaceName,
  PlaceAddress,
  AddButtonContainer,
  AddButton,
  SchedulePanel,
  GoogleMapContainer,
  ViewToggleContainer,
  ViewToggleButton,
  DeleteButtonContainer,
  DateHeading,
  DeleteButton,
  IconContainer,
  IconCircle,
} from './plan_styles';


const libraries: Libraries = ['places'];

const center: google.maps.LatLngLiteral = {
  lat: 37.7749,
  lng: -122.4194,
};

const dayColors = [
  '#6482AD', '#7FA1C3', '#E2DAD6', '#F5EDED', '#987D9A',
  '#987D9A', '#694F8E', '#B692C2', '#E3A5C7', '#FFDFD6',
];

interface LocationState {
  selectedLocation?: {
    lat: number;
    lng: number;
    name: string;
  };
  startDate?: Date;
  endDate?: Date;
}

interface PlanItem {
  date: string;
  place: google.maps.places.PlaceResult;
}

const Plan: React.FC = () => {
  const location = useLocation() as { state: LocationState };
  const selectedLocation = location.state?.selectedLocation;
  const startDate = location.state?.startDate ? new Date(location.state.startDate) : null;
  const endDate = location.state?.endDate ? new Date(location.state.endDate) : null;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [highlightedPlace, setHighlightedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'all' | string>('all');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  useEffect(() => {
    if (selectedLocation && searchQuery.trim()) {
      fetchPlaces(selectedLocation.lat, selectedLocation.lng, searchQuery);
    }
  }, [selectedLocation, searchQuery]);

  const fetchPlaces = async (lat: number, lng: number, query: string) => {
    try {
      const service = new google.maps.places.PlacesService(document.createElement('div'));

      const exactMatchRequest: google.maps.places.TextSearchRequest = {
        query: query,
        location: new google.maps.LatLng(lat, lng),
        radius: 2000,
      };

      const exactMatchResults = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
        service.textSearch(exactMatchRequest, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            reject(status);
          }
        });
      }).catch(() => []);

      if (exactMatchResults.length === 0) {
        const types = ['restaurant', 'cafe', 'tourist_attraction'];
        let allResults: google.maps.places.PlaceResult[] = [];

        for (const type of types) {
          const request: google.maps.places.PlaceSearchRequest = {
            location: new google.maps.LatLng(lat, lng),
            radius: 2000,
            type: type,
            keyword: query,
          };

          const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
            service.nearbySearch(request, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolve(results);
              } else {
                reject(status);
              }
            });
          });

          allResults = [...allResults, ...results];
        }

        setPlaces(allResults);
      } else {
        setPlaces(exactMatchResults);
      }
    } catch (error) {
      console.error('Failed to fetch places:', error);
    }
  };

  const formatDateWithDay = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      weekday: 'short' 
    }).format(date);

    return formattedDate.replace(/\s/g, '').replace(/\.(?=\()/g, '');
  };

  const generateDates = (start: Date, end: Date): string[] => {
    const dateArray = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const availableDates = startDate && endDate ? generateDates(startDate, endDate) : [];

  const handleAddToPlan = (place: google.maps.places.PlaceResult, date: string) => {
    const updatedPlans = [...plans, { date, place }];
    setPlans(updatedPlans);
  };

  const getPhotoUrl = (place: google.maps.places.PlaceResult) => {
    if (place.photos && place.photos.length > 0) {
      return place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });
    }
    return NoImage;
  };

  const handlePlaceClick = (place: google.maps.places.PlaceResult) => {
    setHighlightedPlace(place);
    setSelectedPlaceId(place.place_id || null);
  };

  const openGoogleMaps = (placeId: string) => {
    const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    window.open(url, '_blank');
  };

  const toggleSchedulePanel = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedPlans = [...plans];
    const [reorderedItem] = updatedPlans.splice(result.source.index, 1);
    updatedPlans.splice(result.destination.index, 0, reorderedItem);
    setPlans(updatedPlans);
  };

  const handleDeletePlan = (index: number) => {
    const updatedPlans = [...plans];
    updatedPlans.splice(index, 1);
    setPlans(updatedPlans);
    setSelectedPlaceId(null);
  };

  const getDayColor = (date: string) => {
    const dateIndex = availableDates.indexOf(date);
    return dayColors[dateIndex % dayColors.length];
  };

  const getFormattedDay = (date: string, index: number) => {
    const dateObj = new Date(date);
    return `DAY${index + 1} (${dateObj.getMonth() + 1}/${dateObj.getDate()})`;
  };

  const filteredPlans = viewMode === 'all' ? plans : plans.filter(plan => plan.date === viewMode);

  const getDayPlansWithIcons = (date: string) => {
    const dateIndex = availableDates.indexOf(date);
    return filteredPlans
      .filter(plan => plan.date === date)
      .map((plan, planIndex) => {
        const dayColor = getDayColor(date);
        return (
          <Draggable
            key={`${date}-${planIndex}`}
            draggableId={`${date}-${planIndex}`}
            index={planIndex}
          >
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 0',
                  paddingLeft: '30px',
                }}
              >
                <IconContainer>
                  <IconCircle style={{ backgroundColor: dayColor }}>
                    {planIndex + 1}
                  </IconCircle>
                </IconContainer>
                <span>{plan.place.name}</span>
                <DeleteButtonContainer>
                  <DeleteButton
                    onClick={() => handleDeletePlan(
                      plans.findIndex(
                        (p) =>
                          p.date === date &&
                          p.place.place_id === plan.place.place_id
                      )
                    )}
                  >
                    <FaTrash />
                  </DeleteButton>
                </DeleteButtonContainer>
              </li>
            )}
          </Draggable>
        );
      });
  };

  if (loadError) return <div>지도 로드에 실패했습니다.</div>;
  if (!isLoaded) return <div>지도 로드 중...</div>;

  return (
    <StyledContainer>
      <TopPanel>
        <LocationName>{selectedLocation?.name}</LocationName>
        <DateRange>
          {startDate && endDate
            ? `${formatDateWithDay(startDate)} - ${formatDateWithDay(endDate)}`
            : ''}
        </DateRange>
      </TopPanel>
      <MainContent>
        <SidePanel>
          <SearchInputWrapper>
            <SearchInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="어디를 찾고 계신가요?"
            />
          </SearchInputWrapper>
          <SearchResultsWrapper>
            <ul>
              {places.length > 0 ? (
                places.map((place, index) => (
                  <PlaceItem key={index} onClick={() => handlePlaceClick(place)}>
                    <PlaceImage
                      src={getPhotoUrl(place)}
                      alt={place.name || 'No Image Available'}
                      onClick={() => handlePlaceClick(place)} 
                    />
                    <PlaceInfo>
                      <PlaceName onClick={() => handlePlaceClick(place)}>{place.name}</PlaceName>
                      <PlaceAddress>{place.formatted_address}</PlaceAddress>
                      <AddButtonContainer>
                        {availableDates.map((date) => (
                          <AddButton
                            key={date}
                            onClick={() => handleAddToPlan(place, date)}
                          >
                            {new Date(date).getMonth() + 1}/
                            {new Date(date).getDate()}
                          </AddButton>
                        ))}
                      </AddButtonContainer>
                    </PlaceInfo>
                  </PlaceItem>
                ))
              ) : (
                <li>검색 결과가 없습니다.</li>
              )}
            </ul>
          </SearchResultsWrapper>
        </SidePanel>

        {/* 스케줄 패널이 열려 있을 때 닫기 아이콘 */}
        {isScheduleOpen && (
          <img
            src={CloseSchedulesIcon}
            onClick={toggleSchedulePanel}
            style={{
              position: 'absolute',
              top: '50%',
              left: 'calc(46% - 30px)',  // 스케줄 패널 오른쪽 바깥에 위치
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              zIndex: 1000,
              width: '30px',
              height: '30px',
            }}
            alt="Close Schedules"
          />
        )}

        {/* 스케줄 패널이 닫혀 있을 때 열기 아이콘 */}
        {!isScheduleOpen && (
          <img
            src={OpenSchedulesIcon}
            onClick={toggleSchedulePanel}
            style={{
              position: 'absolute',
              top: '50%',
              left: 'calc(23% - 8px)',  // 사이드 패널 오른쪽 바깥에 위치
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              zIndex: 1000,
              width: '30px',
              height: '30px',
            }}
            alt="Open Schedules"
          />
        )}

        {isScheduleOpen && (
          <SchedulePanel isOpen={isScheduleOpen}>
            <ViewToggleContainer>
              <ViewToggleButton active={viewMode === 'all'} onClick={() => setViewMode('all')}>
                전체
              </ViewToggleButton>
              {availableDates.map((date, index) => (
                <ViewToggleButton key={date} active={viewMode === date} onClick={() => setViewMode(date)}>
                  {getFormattedDay(date, index)}
                </ViewToggleButton>
              ))}
            </ViewToggleContainer>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="plans">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {viewMode === 'all'
                      ? availableDates.map((date, index) => (
                          <div key={date}>
                            <DateHeading>{getFormattedDay(date, index)}</DateHeading>
                            <ul>
                              {getDayPlansWithIcons(date)}
                              {provided.placeholder}
                            </ul>
                          </div>
                        ))
                      : (
                        <div>
                          <DateHeading>{getFormattedDay(viewMode, availableDates.indexOf(viewMode))}</DateHeading>
                          <ul>
                            {getDayPlansWithIcons(viewMode)}
                            {provided.placeholder}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </SchedulePanel>
        )}

        <GoogleMapContainer isScheduleOpen={isScheduleOpen}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={12}
            center={
              selectedPlaceId
                ? {
                    lat: places.find((place) => place.place_id === selectedPlaceId)?.geometry?.location?.lat()!,
                    lng: places.find((place) => place.place_id === selectedPlaceId)?.geometry?.location?.lng()!,
                  }
                : selectedLocation || center
            }
          >
            {highlightedPlace && (
              <Marker
                position={{
                  lat: highlightedPlace.geometry!.location!.lat(),
                  lng: highlightedPlace.geometry!.location!.lng(),
                }}
                icon={{
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                }}
                onClick={() => openGoogleMaps(highlightedPlace.place_id!)}
              />
            )}
            {filteredPlans.map((plan, index) => {
              const dayColor = getDayColor(plan.date);
              const dayPlans = filteredPlans.filter(p => p.date === plan.date);
              const dayIndex = dayPlans.indexOf(plan) + 1;
              return (
                <Marker
                  key={plan.place.place_id}
                  position={{
                    lat: plan.place.geometry!.location!.lat(),
                    lng: plan.place.geometry!.location!.lng(),
                  }}
                  label={{
                    text: dayIndex.toString(),
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 20,
                    fillColor: dayColor,
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: '#fff',
                  }}
                  onClick={() => openGoogleMaps(plan.place.place_id!)}
                />
              );
            })}
          </GoogleMap>
        </GoogleMapContainer>
      </MainContent>
    </StyledContainer>
  );
};

export default Plan;
