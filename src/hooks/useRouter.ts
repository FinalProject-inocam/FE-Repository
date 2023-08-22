import { useParams, useNavigate } from "react-router-dom";
import * as Type from "../types";

export const useRouter = (): Type.UseRouter => {
  const { id } = useParams();
  const getId: number | undefined = id ? +id : undefined;
  const navigate = useNavigate();
  const onNavigate =
    ({ url, opts }: Type.Native) =>
    () => {
      navigate(url, opts);
    };
  return { getId, onNavigate };
};
