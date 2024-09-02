import styled from 'styled-components';
import CloseSchedulesIcon from '../images/CloseSchedules.svg';
import OpenSchedulesIcon from '../images/OpenSchedules.svg';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const TopPanel = styled.div`
  width: 100%;
  height: 80px;
  margin-left: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const LocationName = styled.p`
  font-size: 20px;
  color: black; 
  font-weight: bold;
`;

export const DateRange = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: black;
`;

export const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

export const SidePanel = styled.div`
  width: 23%;
  height: 100%;
  padding-left: 40px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0px 15px -4px rgba(0, 0, 0, 0.1);
`;

export const SearchInputWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;  
  padding-bottom: 5px;
  padding-top: 5px; 
  padding-right: 20px; 
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 13px;
  border-radius: 10px;
  border: solid 1px lightgray;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  outline: none;
`;

export const SearchResultsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 20px; 
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 10px;
    border: 7px solid transparent; 
    background-clip: padding-box; 
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

export const PlaceItem = styled.li`
  display: flex;
  margin-bottom: 30px;
  align-items: flex-start;
`;

export const PlaceImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  cursor: pointer;
`;

export const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  margin-left: 15px;
  height: 80px; 
`;

export const PlaceName = styled.strong`
  font-size: 14px;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin: 0; 
  padding: 0; 
  cursor: pointer;
`;

export const PlaceAddress = styled.p`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AddButtonContainer = styled.div`
  display: flex;
  margin-top: 5px;
  overflow-x: scroll;  
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none; 
  }

  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;

export const AddButton = styled.button`
  background-color: #E0E0E0;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: lightgray;
  }
`;

export const ToggleButton = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  background-image: url(${({ isOpen }) => (isOpen ? CloseSchedulesIcon : OpenSchedulesIcon)});
  background-size: cover;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: translateY(-50%);
  z-index: 1000;

  ${({ isOpen }) =>
    isOpen
      ? `
          /* 스케줄 패널이 열려 있을 때 (CloseSchedulesIcon) */
          right: -35px; /* 스케줄 패널의 오른쪽에 위치 */
        `
      : `
          /* 스케줄 패널이 닫혀 있을 때 (OpenSchedulesIcon) */
          left: calc(100% + 5px); /* 사이드 패널의 왼쪽에 위치 */
        `}
`;

export const GoogleMapContainer = styled.div<{ isScheduleOpen: boolean }>`
  width: ${({ isScheduleOpen }) => (isScheduleOpen ? '58%' : '78%')};
  transition: width 0.3s ease;
  height: 100%;
`;

export const SchedulePanel = styled.div<{ isOpen: boolean }>`
  height: 100%;
  overflow-y: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: width 0.3s ease;
  width: ${({ isOpen }) => (isOpen ? '23%' : '0')}; 
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 30px;
  padding-right: 30px;
  scrollbar-width: none; 
  -ms-overflow-style: none;  
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

export const ViewToggleButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? 'darkgray' : '#E0E0E0')};
  border: none;
  border-radius: 5px;
  color: black;
  padding: 5px 5px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 5px;
  min-width: 40px;
  text-align: center;

  &:hover {
    background-color: ${({ active }) => (active ? 'darkgray' : 'darkgray')};
  }
`;

export const DateHeading = styled.h4`
  font-size: 16px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 30px; /* 오른쪽으로 30px 띄우기 */
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #E0E0E0;
  font-size: 13px;
  margin-left: 10px; /* 아이콘 간의 간격 조절 */
  
  &:hover {
    color: black;
  }
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
`;
export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #E0E0E0;
  font-size: 13px;
  padding-right: 30px;

  &:hover {
    color: black;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const IconCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;
