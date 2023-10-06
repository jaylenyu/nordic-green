import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Google() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const { data } = await axios.get(`/api/auth/sign-up`, {
                params: { credential: credentialResponse.credential },
              });
            } catch (error) {
              console.error(error);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
