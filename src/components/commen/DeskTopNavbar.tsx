import React from "react";
import * as SC from "../css";
import * as Hooks from "../../hooks";

export const DeskTopNavbar: React.FC = () => {
	const { sideBarNav, authNav, onNavigate, pathname } = Hooks.useMainHeader({});
	const { sub, onLogout } = Hooks.useLogout();
	console.log("getChatRoom", pathname.split('/')[1])
	const headerState = pathname.split('/')[2] === "order" ? "order" : pathname.split('/')[1]

	return (
		<SC.DeskTopNav>
			<SC.CustomUl>
				{sideBarNav.map((nav: string[]) => (
					<SC.CustomLi key={nav[0]} children={<>
						{nav[0]}
						{nav[2] === headerState && <SC.HeaderStateLine />}
					</>} onClick={onNavigate({ url: nav[1] })} />)
				)}
			</SC.CustomUl>
			<SC.CustomUl>
				{!!!sub
					? authNav.noPermission.map((nav: string[], idx: number) =>
						idx === 0 ? (
							<SC.CustomLi
								key={nav[1]}
								children={nav[1]}
								onClick={onNavigate({
									url: nav[2],
									opts: { state: pathname },
								})}
							/>
						) : (
							<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onNavigate({ url: nav[1] })} />
						)
					)
					: sub === "E002"
						? authNav.users.map((nav: string[], idx: number) =>
							idx === 0 ? (
								<SC.CustomLi key={nav[1]} 
								children={<>
									{nav[0]}
									{nav[2] === headerState && <SC.HeaderStateLine />}
								</>}
								onClick={onNavigate({ url: nav[2] })} />
							) : (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onLogout} />
							)
						)
						: authNav.admin.map((nav: string[], idx: number) =>
							idx === 0 ? (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onNavigate({ url: nav[2] })} />
							) : (
								<SC.CustomLi key={nav[1]} children={nav[1]} onClick={onLogout} />
							)
						)}
			</SC.CustomUl>
		</SC.DeskTopNav>
	);
};
