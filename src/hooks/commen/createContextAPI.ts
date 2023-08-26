import { createContext } from "react";
import * as Type from "../../types";

export const WrappingDetailContext = createContext<Type.WrappingShopDetail | undefined | null>(null);
