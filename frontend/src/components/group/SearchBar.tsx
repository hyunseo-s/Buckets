import { Autocomplete } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { Group } from "../../types";

interface SearchBarProps {
	data: Group[];
}

export const SearchBar = ({ data, query, setQuery }: SearchBarProps) => {
	const AutocompleteStyle = {
		width: "100%",
		margin: "auto",
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
			data={data.map(group => group.groupName)}
			rightSection={<IconSearch size="16pt" stroke="2pt" style={{ marginRight: "6pt", color: "#1794FA"}} />}
		/>
	);
}