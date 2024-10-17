import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh-60px);
`;

export const TopPanel = styled.div`  
  width: 23%;
  height: 80px;
  padding-top: 20px;  
  padding-left: 40px;
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
  height: calc(100vh - 140px);
`;

export const SidePanel = styled.div`
  width: 23%;
  min-width: 23%;
  height: calc(100vh - 140px);
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const SearchInputWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;  
  padding-bottom: 5px;
  padding-top: 5px; 
`;

export const SearchInput = styled.input`
  width: calc(100% - 10px);
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
  padding-right: 10px;
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

export const SchedulePanel =  styled.div`
  height: calc(100vh - 60px);  
  width: 25%; 
  overflow-y: auto;
  top: -80px;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  margin-top: 5px;
  padding-right: 20px;
  padding-bottom: 5px;
  overflow-x: scroll;  
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none; 
  }

  -ms-overflow-style: none; 
  scrollbar-width: none;
`;

export const ViewToggleButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? 'darkgray' : '#E0E0E0')};
  border: none;
  border-radius: 5px;
  color: black;
  padding: 5px 10px; 
  font-size: 12px;
  cursor: pointer;
  margin-right: 5px;
  flex-shrink: 0;  
  min-width: 60px; 
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    background-color: ${({ active }) => (active ? 'darkgray' : 'lightgray')};
  }
`;

export const ScheduleResult = styled.div`
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

export const DateHeading = styled.h4`
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #E0E0E0;
  font-size: 13px;
  margin-left: 10px;
  
  &:hover {
    color: black;
  }
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #E0E0E0;
  font-size: 13px;

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

export const IconCircle = styled.div<{ bgColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  background-color: ${({ bgColor }) => bgColor};  /* props로 받은 배경색 사용 */
`;

export const GoogleMapContainer = styled.div`
  width: 74%;
  top: -140px;
  transition: width 0.3s ease;
  height: calc(100% + 140px);
  position: relative;
`;

export const PlanItem = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 0;
position: relative; /* 아이콘을 PlanItem 내부에서 고정하기 위해 추가 */
`;

export const PlanItemText = styled.span`
  font-size: 14px;
  color: #333;
  flex: 1;
`;

