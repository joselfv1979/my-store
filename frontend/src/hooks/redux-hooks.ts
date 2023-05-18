import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;  