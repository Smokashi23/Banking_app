
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

