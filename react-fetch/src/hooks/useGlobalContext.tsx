import { useContext } from "react";
import { MyGlobalContext } from "../context/Context";

export const useGlobalContext = () => {
	return useContext(MyGlobalContext);
};
