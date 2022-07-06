import {
   ApolloClient,
   ApolloLink,
   ApolloProvider,
   InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
   accessTokenState,
   restoreAccessTokenLodable,
} from "../../../commons/store";
import getAccessToken from "../../../commons/utilities/getAccessToken";
import { REACT_APP_GRAPHQL_URL } from "@env";

export default function ApolloSetting(props) {
   const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
   const aaa = useRecoilValueLoadable(restoreAccessTokenLodable);

   useEffect(() => {
      aaa.toPromise().then((newAccessToken) => {
         setAccessToken(newAccessToken);
      });
   }, []);

   const errorLink = onError(({ graphQLErrors, operation, forward }) => {
      if (graphQLErrors) {
         for (const err of graphQLErrors) {
            if (err.extensions.code === "UNAUTHENTICATED") {
               getAccessToken().then((newAccessToken) => {
                  setAccessToken(newAccessToken);

                  operation.setContext({
                     headers: {
                        ...operation.getContext().headers,
                        Authorization: `Bearer ${newAccessToken}`,
                     },
                  });
                  return forward(operation);
               });
            }
         }
      }
   });
   const uploadLink = createUploadLink({
      uri: REACT_APP_GRAPHQL_URL,
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include",
   });

   const client = new ApolloClient({
      link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
      cache: new InMemoryCache(),
   });
   console.log("this is accessToken", accessToken);
   return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}