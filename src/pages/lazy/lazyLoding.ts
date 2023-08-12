import { lazy } from "react";

export const LazyInnoCar = lazy(() => import("../main/InnoCar").then(({ InnoCar }) => ({ default: InnoCar })));
export const LazyCommunity = lazy(() => import("../main/Community").then(({ Community }) => ({ default: Community })));
export const LazyWrapping = lazy(() => import("../main/Wrapping").then(({ Wrapping }) => ({ default: Wrapping })));
export const LazyThreejs = lazy(() => import("../Threejs").then(({ Threejs }) => ({ default: Threejs })));