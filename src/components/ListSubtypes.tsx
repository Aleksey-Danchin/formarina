import { FC } from "react";
import {
	Checkbox,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

type ListSubtypesProps = {
	open: boolean;
	subtypes: Array<{ name: string; selected: boolean }>;
	onSelect: (data: { subtype: string; selected: boolean }) => void;
};

export const ListSubtypes: FC<ListSubtypesProps> = ({
	open,
	subtypes,
	onSelect,
}) => {
	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{subtypes.map(({ name, selected }) => {
					return (
						<ListItemButton
							key={name}
							sx={{ pl: 4 }}
							onClick={() =>
								onSelect({ subtype: name, selected: !selected })
							}
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={selected}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": name }}
								/>
							</ListItemIcon>
							<ListItemText id={name} primary={name} />
						</ListItemButton>
					);
				})}
			</List>
		</Collapse>
	);
};
