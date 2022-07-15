import { gql } from "apollo-boost";

export const SEND_SMS = gql`
   mutation sendTokenToSMS($phone: String!) {
      sendTokenToSMS(phone: $phone)
   }
`;

export const CHECK_TOKEN = gql`
   mutation checkToken($token: String!) {
      checkToken(token: $token)
   }
`;
