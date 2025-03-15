import { Button, Modal, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils/handlers";
import { get, post } from "../utils/apiClient";
import { Group } from "../types";

export const BucketModal = ({
  openedAddBucket,
  closeAddBucket,
}: {
  openedAddBucket: boolean;
  closeAddBucket: () => void;
}) => {
  
  const [bucketName, setBucketName] = useState<string>('');
  const [selectedBucketGroupOption, setBucketSelectedGroupOption] = useState<string | null>(null);

  const [userGroups, setUserGroups] = useState<Group[]>([])
  
  useEffect(() => {
    const generateUserGroups = async () => {
      const res = await get('/users/groups');
      if (res.error) {
        handleError(res.error);
        return;
      }
      setUserGroups(res);
    }

    generateUserGroups();
  }, []);

  const groupNameToId = (groupName: string) => {
		const foundUsers = userGroups.filter(group => group.groupName === groupName);
		if (foundUsers.length == 0) return null;
		return foundUsers[0].groupId ?? null;
	}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const groupId = groupNameToId(selectedBucketGroupOption ?? "")

    const params = {
      bucketName: bucketName,
      groupId: groupId
    }
    const res = await post("/buckets", params);
    if (res.error) {
      handleError(res.error);
      return;
    }
    handleSuccess(res.message ?? "Success!");
    closeAddBucket();
  };	

  return (
    <Modal opened={openedAddBucket} onClose={closeAddBucket} title="Add Bucket" centered>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Bucket Name"
          placeholder="Enter bucket name"
          value={bucketName}
          onChange={(event) => setBucketName(event.currentTarget.value)}
          required
        />
        <Select
          label="Add to group"
          placeholder="Select group"
          data={userGroups.map(group => group.groupName)}
          value={selectedBucketGroupOption}
          onChange={(value) => setBucketSelectedGroupOption(value)}
          required
        />
        <Button type="submit" fullWidth mt="md" color={"rgba(23, 148, 250, 1)"}>
          Add Bucket!
        </Button>
      </form>
    </Modal>
  );
}