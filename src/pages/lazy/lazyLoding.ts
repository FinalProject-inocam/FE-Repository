import { lazy } from "react";

export const LazyInnoCar = lazy(() => import("../main/InnoCar").then(({ InnoCar }) => ({ default: InnoCar })));
export const LazyCommunity = lazy(() => import("../main/Community").then(({ Community }) => ({ default: Community })));
export const LazyWrapping = lazy(() => import("../main/Wrapping").then(({ Wrapping }) => ({ default: Wrapping })));
export const LazyAdmin = lazy(() => import("../AdminRouter").then(({ AdminRouter }) => ({ default: AdminRouter })));