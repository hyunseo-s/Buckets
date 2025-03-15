import { Flex } from '@mantine/core';
import { SearchBar, GroupCard } from '../components';
import { useEffect, useState } from 'react';
import { get } from '../utils/apiClient';
import { handleError } from '../utils/handlers';
import { Group } from '../types';

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

	useEffect(() => {
		const getGroups = async () => {
			const res = await get('/users/groups');
			console.log(res)
			if (res.error) {
				handleError(res.error);
				return;
			}
			setGroups(res);
		}

		getGroups();
	}, [])


  return (
    <Flex dir="column" justify="space-between" style={{ height: "80vh" }}>
      <div style={{ width: "60%", minWidth: "300px", margin: "auto" }}>
        <SearchBar />
        <Flex
					mt="4rem"
          justify="space-between"
					gap={{ base: "2rem" }}
					wrap={{ base: "nowrap", sm: "wrap" }}
          direction={{ base: "column", sm: "row" }}
        >
          {groups.length > 0 && groups.map((group, index) => (
            <GroupCard key={index} group={group} />
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default Groups;
