import { FigureObjectFitImg } from "../atom";
import * as Type from "../../types";
import * as SC from "../../components/css";

export const DetailLeftMainBanner: React.FC<Type.WrappingDetailProps> = ({ data }) => {
	return (
		<div>
			<SC.DetailLeftBanner>
				<FigureObjectFitImg width={`467px`} height={`300px`} src={data.banner[0]} alt='SomeImg' />
			</SC.DetailLeftBanner>
		</div>
	);
};
