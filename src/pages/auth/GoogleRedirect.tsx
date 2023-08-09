import React, { useEffect }  from "react"; 
import { useLocation } from "react-router-dom";
import { useRouter } from "../../hooks";
import { useLoginSNSGoogleRTKQuery } from "../../redux";

export const GoogleRedirect: React.FC = () => {
  const { search } = useLocation();
  console.log(search);
  
  const { onNavigate } = useRouter();
  const query = useLoginSNSGoogleRTKQuery(search);

  useEffect(() => {
    console.log(query);
    query.isSuccess && onNavigate("/")();
  }, [query, onNavigate]);
  return <div>GoogleRedirect</div>;
};

