import React, { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Apollo,
} from "@apollo/client";

import { useStoreState } from "../global-store";

interface Props {
  children: ReactNode;
}
export const ApolloProvider: React.FC<Props> = ({ children }) => {
  const { token } = useStoreState((state) => state.auth);

  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: "http://192.168.0.17:4000/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: token || "",
    },
  });

  return <Apollo client={client}>{children}</Apollo>;
};
