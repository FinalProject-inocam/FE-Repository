import React from "react";
import * as SC from "../css";
import * as Hooks from "../../hooks";

export const DeskTopNavbar: React.FC = () => {
	const { sideBarNav, authNav, onNavigate } = Hooks.useMainHeader();
	const { sub, onLogout } = Hooks.useLogout();

	return (
		<SC.DeskTopNav>
			<SC.CustomUl>
				{sideBarNav.map((nav: string[]) => (
					<SC.CustomLi key={nav[0]} children={nav[0]} onClick={onNavigate(nav[1])} />
				))}
			</SC.CustomUl>
			<SC.CustomUl>
				{!!!sub
					? authNav.noPermission.map((nav: string[], idx: number) =>
							idx === 0 ? (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onNavigate(nav[2])} />
							) : (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onNavigate(nav[2])} />
							)
					  )
					: sub === "E002"
					? authNav.users.map((nav: string[], idx: number) =>
							idx === 0 ? (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onNavigate(nav[2])} />
							) : (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onLogout} />
							)
					  )
					: authNav.admin.map((nav: string[], idx: number) =>
							idx === 0 ? (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onNavigate(nav[2])} />
							) : (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onLogout} />
							)
					  )}
			</SC.CustomUl>
		</SC.DeskTopNav>
	);
};
