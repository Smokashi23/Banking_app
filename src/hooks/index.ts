
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import { useMutation, useQuery } from 'react-query';
// import { updateUser } from '../redux/userSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// export function useGetUserQuery(userId) {
//   return useQuery(["user", userId], () => getUser(userId));
// }

// export function useUpdateUserMutation() {
//   return useMutation(updateUser);
// }
