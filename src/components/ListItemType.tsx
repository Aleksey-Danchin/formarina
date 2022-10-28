import { FC, useMemo, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Checkbox,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { ListSubtypes } from "./ListSubtypes";

type ListItemTypeProps = {
	title: string;
	subtypes: Array<{ name: string; selected: boolean }>;
	onSelect: (data: {
		type: string;
		subtype?: string;
		selected: boolean;
	}) => void;
};

export const ListItemType: FC<ListItemTypeProps> = ({
	title,
	subtypes,
	onSelect,
}) => {
	const [open, setOpen] = useState(false);

	const selected = useMemo(() => {
		return subtypes.every(({ selected }) => selected);
	}, [subtypes]);

	return (
		<>
			<ListItemButton onClick={() => setOpen((open) => !open)}>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={selected}
						tabIndex={-1}
						disableRipple
						inputProps={{ "aria-labelledby": title }}
						onClick={(e) => {
							e.stopPropagation();
							onSelect({ type: title, selected: !selected });
						}}
					/>
				</ListItemIcon>
				<ListItemText id={title} primary={title} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<ListSubtypes
				open={open}
				subtypes={subtypes}
				onSelect={(data) => onSelect({ type: title, ...data })}
			/>
		</>
	);
};
