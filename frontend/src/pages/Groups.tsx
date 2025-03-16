import { Flex } from '@mantine/core';
import { SearchBar, GroupCard } from '../components';
import { useEffect, useState } from 'react';
import { get } from '../utils/apiClient';
import { handleError } from '../utils/handlers';
import { Group } from '../types';
import { useGroups } from '../context/GroupsProvider';

const Groups = () => {
	const [query, setQuery] = useState<string>('');
	const { groups } = useGroups();

  return (
    <Flex dir="column" justify="space-between" style={{ height: "80vh" }}>
      <div style={{ width: "60%", minWidth: "300px", margin: "2rem auto" }}>
        <SearchBar query={query} setQuery={setQuery}/>
        <Flex
					mt="4rem"
					mx={"auto"}
          justify="space-between"
					w={"98%"}

					gap={{ base: "2rem" }}
					wrap={{ base: "nowrap", sm: "wrap" }}
          direction={{ base: "column", sm: "row" }}
        >
          { groups.filter(group => group.groupName.includes(query)).length > 0 && groups.filter(group => group.groupName.includes(query)).map((group, index) => (
            <GroupCard key={index} group={group} />
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default Groups;
