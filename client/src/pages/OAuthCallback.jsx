import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {

    const token = searchParams.get('token');
    if(token){
      localStorage.setItem('accessToken',token);

      navigate('/');
    }else{
      navigate('/signup?error=Oauth');
    }

  }, [navigate,searchParams]);

  return (
    <div className="min-h-screen bg-[#FFF4DC] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#F47C26] mb-4">
          Completing Authentication...
        </h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F47C26] mx-auto"></div>
      </div>
    </div>
  );
};

export default OAuthCallback;
