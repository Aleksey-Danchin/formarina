import { FC, useContext, useMemo, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { ListItemData, NestedContext } from "./Context";
import { NestedList } from "./NestedList";

import {
	ListItemButton,
	ListItemText,
	Collapse,
	ListItemIcon,
	IconButton,
	ListItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { CustomChecbox } from "./CustomChecbox";
import { QuestionSolution } from "../QuestionSolution";
import { useAppSelector } from "../../redux";

export type NestedListItemProps = {
	item: ListItemData;
	level?: number;
};

export const NestedListItem: FC<NestedListItemProps> = ({
	item,
	level = 0,
}) => {
	const { items, onSelect } = useContext(NestedContext);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const subitems = useMemo(
		() => items.filter((x) => x.parent === item.id),
		[item.id, items]
	);

	const sx = level ? { pl: 2 } : {};

	const [show, setShow] = useState(false);

	const problems = useAppSelector((state) => state.questionsSlice.problems);
	const problem = useMemo(() => {
		return problems.find((problem) => problem.description === item.label);
	}, [item.label, problems]);

	if (subitems.length) {
		return (
			<>
				<ListItemButton sx={sx} onClick={handleClick}>
					<ListItemIcon>
						<CustomChecbox
							id={item.id}
							onClick={(e) => {
								e.stopPropagation();
								onSelect(item.id);
							}}
						/>
					</ListItemIcon>
					<ListItemText primary={item.label} id="flag3" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<NestedList parent={item.id} level={level + 1} />
				</Collapse>
			</>
		);
	}

	return (
		<>
			<ListItem
				sx={sx}
				secondaryAction={
					<IconButton onClick={() => setShow((x) => !x)}>
						{show ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				}
			>
				<ListItemButton onClick={() => onSelect(item.id)}>
					<ListItemIcon>
						<CustomChecbox id={item.id} />
					</ListItemIcon>
					<ListItemText primary={item.label} id={item.id} />
				</ListItemButton>
			</ListItem>

			{show && problem && (
				<ListItem sx={{ ...sx, ml: 10 }} key={item.id}>
					<QuestionSolution problem={problem} margin={false} />
				</ListItem>
			)}
		</>
	);
};
