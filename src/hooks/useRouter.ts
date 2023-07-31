import { useParams, useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const {id} = useParams()
  const getId: number | undefined = id ? +id : undefined;
  const navigate = useNavigate()
  // 타입가드 : 매개변수의 타입에 따라서 들어오는 매개변수의 타입에 따른 분기처리를 해주었음
  const onNavigate = (path: string | number) => () => {
    if (typeof path === 'string') {
      navigate(path);
    } else {
      navigate(path);
    }
  };
  return { getId , onNavigate }
}