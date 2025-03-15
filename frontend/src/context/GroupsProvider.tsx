import { createContext, useContext, useState, useEffect } from 'react';
import { get } from '../utils/apiClient';
import { handleError } from '../utils/handlers';
import { Group, Bucket, Item } from '../types';

const GroupsContext = createContext<{
  groups: Group[];
  refreshGroups: () => void;
  buckets: Record<string, Bucket[]>;  // Store buckets per group
  refreshBucketsOfGroup: (groupId: string) => void;
  items: Record<string, Item[]>;  // Store items per bucket
  refreshItemsOfBucket: (bucketId: string) => void;
}>({
  groups: [],
  refreshGroups: () => {},
  buckets: {},
  refreshBucketsOfGroup: () => {},
  items: {},
  refreshItemsOfBucket: () => {},
});

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [buckets, setBuckets] = useState<Record<string, Bucket[]>>({});
  const [items, setItems] = useState<Record<string, Item[]>>({});

  const fetchGroups = async () => {
    const res = await get('/users/groups');
    if (res.error) {
      handleError(res.error);
      return;
    }
    setGroups(res);
  };

  const refreshBucketsOfGroup = async (groupId: string) => {
    const res = await get(`/groups/${groupId}/buckets`);
    if (res) {
      setBuckets((prev) => ({ ...prev, [groupId]: res }));
      return;
    }
    
  };

  const refreshItemsOfBucket = async (bucketId: string) => {
    const res = await get(`/buckets/${bucketId}/items`);
    if (res) {
      setItems((prev) => ({ ...prev, [bucketId]: res }));
      return;
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <GroupsContext.Provider value={{ 
      groups, 
      refreshGroups: fetchGroups, 
      buckets, 
      refreshBucketsOfGroup, 
      items, 
      refreshItemsOfBucket 
    }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => useContext(GroupsContext);
