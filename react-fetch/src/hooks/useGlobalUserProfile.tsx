import { useContext } from "react";
import { GlobalUserProfile } from "../context/Context";

export const useGlobalUserProfile = () => {
	return useContext(GlobalUserProfile);
};
