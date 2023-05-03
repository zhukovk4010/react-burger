//Типизированные хуки useSelector и useDispatch
import { AppThunk } from "../types/types";
import { AppStateType, DispatchType } from "./../services/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type DispatchFunc = () => DispatchType | AppThunk;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
