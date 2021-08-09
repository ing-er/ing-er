import { useSelector, useDispatch } from 'react-redux';
import { increase } from '../modules/timer';
import Room from '../components/Webrtc';

const TimerContainer = ({ children }) => {
  const timer = useSelector(state => state.timer);
  const dispatch = useDispatch();

  const onIncrease = () => {
    return dispatch(increase())
  }

  return (
    <Room 
      timer={timer}
      onIncrease={onIncrease}
    />
  )
}

export default TimerContainer;