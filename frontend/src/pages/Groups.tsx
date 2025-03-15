import { Flex } from '@mantine/core';
import { SearchBar, GroupCard } from '../components';
import { useEffect, useState } from 'react';
import { get } from '../utils/apiClient';

interface Groups {
  groupId: string;
  groupName: string,
  members: string[],
  buckets: string[],
}

const Groups = () => {
  const [groups, setGroups] = useState<Groups[]>([]);

  const fetchGroups = async () => {
    let v;
    const raw = await get(`/users/groups`, v);
    const res: Groups[] = JSON.parse(raw);
    setGroups(res);
  }

  useEffect(() => {
    fetchGroups()
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
          {groups.map((group, index) => (
            <GroupCard key={index} {...group}/>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default Groups;
