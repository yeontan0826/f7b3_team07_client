import { Dispatch, SetStateAction } from "react";

export interface ICarPickKeyUsingUIProps {
   data?: any;
   openDoor: boolean;
   closeDoor: boolean;
   setOpenDoor: Dispatch<SetStateAction<boolean>>;
   setCloseDoor: Dispatch<SetStateAction<boolean>>;
   onChangeOpenDoor: () => void;
   onChangeCloseDoor: () => void;
   onPressToMain: () => void;
   onPressUnlock: () => void;
   onPressLock: () => void;
   onPressReturn: () => void;
}
