import { useStoreActions } from "../../global-store";
import { getFromSecureStore } from "../../utils";
import moment from "moment";

export const useRehydrateAuth = () => {
  const { setAuth } = useStoreActions((actions) => actions);

  const rehydrateToken = async () => {
    // get values from secure store. If they exist and are valid, set to global auth state, else return
    try {
      const existingToken = await getFromSecureStore("JWT");
      if (!existingToken) return;
      const { token, tokenExpires } = existingToken;

      const now = moment();
      const tokenValid = moment(tokenExpires) > now;

      if (tokenValid) {
        setAuth({
          token,
          tokenExpires,
        });
      }
      return;
    } catch (err) {
      console.log("rehydrateToken:", err);
    }
  };

  return {
    rehydrateToken,
  };
};
