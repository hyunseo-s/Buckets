import { Button, Modal, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils/handlers";
import { post } from "../utils/apiClient";
import { useGroups } from "../context/GroupsProvider";

export const BucketModal = ({
  openedAddBucket,
  closeAddBucket,
}: {
  openedAddBucket: boolean;
  closeAddBucket: () => void;
}) => {
  
  const [bucketName, setBucketName] = useState<string>('');
  const [selectedBucketGroupOption, setBucketSelectedGroupOption] = useState<string | null>(null);
	const { groups, refreshGroups, refreshBucketsOfGroup } = useGroups();

  const groupNameToId = (groupName: string) => {
		const foundUsers = groups.filter(group => group.groupName === groupName);
		if (foundUsers.length == 0) return null;
		return foundUsers[0].groupId ?? null;
	}
	const InputStyle = {
		margin: "2rem auto",
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
		refreshGroups();
		if (groupId) refreshBucketsOfGroup(groupId);
  };	

  return (
    <Modal opened={openedAddBucket} onClose={closeAddBucket} title="Add Bucket" centered>
      <form onSubmit={handleSubmit}>
        <TextInput
					style={InputStyle}
          label="Bucket Name"
          placeholder="Enter bucket name"
          value={bucketName}
          onChange={(event) => setBucketName(event.currentTarget.value)}
          required
        />
        <Select
					style={InputStyle}
          label="Add to group"
          placeholder="Select group"
          data={groups.map(group => group.groupName)}
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