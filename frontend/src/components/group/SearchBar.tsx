import { Autocomplete } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';

export const SearchBar = () => {
	const AutocompleteStyle = {
		width: "100%",
		margin: "auto",
		height: "fit-content",
		border: "none"
	}

	return (
		<Autocomplete
			style={AutocompleteStyle}
			size="md"
			radius="xl"
			placeholder="Search for a group"
			data={['React', 'Angular', 'Vue', 'Svelte']}
			rightSection={<IconSearch size="16pt" stroke="2pt" style={{ marginRight: "6pt", color: "#1794FA"}} />}
		/>
	);
}