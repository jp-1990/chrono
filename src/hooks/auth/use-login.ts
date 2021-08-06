import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  LoginMutation,
  LoginMutationArgs,
  LoginMutationRes,
} from "../../graphql/mutations";
import { useStoreActions } from "../../global-store";
import { setToSecureStore } from "../../utils";

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(false);

  const { setAuth } = useStoreActions((actions) => actions);

  const [requestLogin, { loading }] = useMutation<
    LoginMutationRes,
    LoginMutationArgs
  >(LoginMutation, {
    onError: (err) => {
      setErrorMessage(err.message);
    },
    onCompleted: (res) => {
      console.log("useLogin:", res);
      // set global auth state
      setAuth({
        token: res.signIn.token,
        tokenExpires: Number(res.signIn.tokenExpires),
      });
      // set to secure store
      setToSecureStore("JWT", {
        token: res.signIn.token,
        tokenExpires: Number(res.signIn.tokenExpires),
      });
      setComplete(true);
    },
  });

  const login = (email: string, password: string) => {
    requestLogin({
      variables: { email: email || "", password: password || "" },
    });
  };

  return {
    login,
    error: errorMessage,
    loading,
    complete,
  };
};
