import { createContext, useContext, useState, useEffect } from 'react';
import { get } from '../utils/apiClient';
import { handleError } from '../utils/handlers';
import { Group } from '../types';

const GroupsContext = createContext<{ groups: Group[], refreshGroups: () => void }>({
  groups: [],
  refreshGroups: () => {},
});

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    const res = await get('/users/groups');
    if (res.error) {
      handleError(res.error);
      return;
    }
    setGroups(res);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <GroupsContext.Provider value={{ groups, refreshGroups: fetchGroups }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => useContext(GroupsContext);