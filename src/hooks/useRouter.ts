import { useParams, useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const {id} = useParams()
  const getId: number | undefined = id ? +id : undefined;
  const navigate = useNavigate()
  const onNavigate = (path: string | number) => () => {
    if (typeof path === 'string') {
      navigate(path);
    } else {
      navigate(path);
    }
  };
  return { getId , onNavigate }
}