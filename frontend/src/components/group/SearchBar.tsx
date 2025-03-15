import { Autocomplete } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { Group } from "../../types";
import { useGroups } from "../../context/GroupsProvider";

interface SearchBarProps {
	query: string;
}

export const SearchBar = ({ query, setQuery }: SearchBarProps) => {
	const { groups } = useGroups();

	const AutocompleteStyle = {
		width: "100%",
		marginX: "auto",
		marginTop: "2rem",
		height: "fit-content",
		border: "none"
	}

	return (
		<Autocomplete
			value={query}
			style={AutocompleteStyle}
			onChange={setQuery}
			size="md"
			radius="xl"
			placeholder="Search for a group"
			data={groups.map(group => group.groupName)}
			rightSection={<IconSearch size="16pt" stroke="2pt" style={{ marginRight: "6pt", color: "#1794FA"}} />}
		/>
	);
}