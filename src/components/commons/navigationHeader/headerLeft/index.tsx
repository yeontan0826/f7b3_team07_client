import { Ionicons } from "@expo/vector-icons";
import * as R from "react-native";
import { Platform } from "react-native";
import TitleText from "../../text/TitleText";

export default function NavigationHeaderLeft(
   { navigation },
   target,
   title,
   color
) {
   return (
      <>
         <Ionicons
            name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
            size={Platform.OS === "ios" ? 35 : 24}
            color={color}
            style={{
               fontSize: 32,
               width: 25,
            }}
            onPress={
               target
                  ? () => {
                       navigation.navigate(target);
                    }
                  : () => {
                       navigation.goBack();
                    }
            }
         />
         <R.Text
            style={{
               fontSize: 20,
               color: color,
               // fontFamily: "Regular",
               marginLeft: 20,
               fontWeight: "500",
            }}
         >
            {title}
         </R.Text>
      </>
   );
}
