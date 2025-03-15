import { Flex } from '@mantine/core';
import { SearchBar, GroupCard } from '../components';

const Groups = () => {
  const groups = [0, 1, 2, 3, 4];

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
            <GroupCard key={index} />
          ))}
        </Flex>
      </div>
    </Flex>
  );
};

export default Groups;
