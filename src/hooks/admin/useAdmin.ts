import { useAdminType } from "../../types";
import { useRouter } from "../useRouter";

export const useAdmin = ():useAdminType => {
  const { onNavigate, pathname } = useRouter();
  const currentPage = pathname.split('/').length === 2 ? pathname.split('/')[1] : pathname.split('/')[2];
  const AdminNaList = [
    ["대시보드", "/admin", "admin"],
    ["출고관리", "deliverymanagement", "deliverymanagement"],
    ["민원관리", "civilcomplaintmanagement", "civilcomplaintmanagement"]
  ];
  return {currentPage, AdminNaList, onNavigate}
}