import { Button, Modal, Select, TextInput } from "@mantine/core";

export const BucketModal = ({ openedAddBucket, closeAddBucket }) => {
  return (
    <Modal opened={openedAddBucket} onClose={closeAddBucket} title="Add Bucket" centered>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('Bucket Name:', bucketName, 'Selected Group:', selectedBucketGroupOption);
        closeAddBucket();
      }}>
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
          data={['Group 1', 'Group 2', 'Group 3']}
          value={selectedBucketGroupOption}
          onChange={(value) => setBucketSelectedGroupOption(value)}
          required
        />
        <Button type="submit" fullWidth mt="md" color={buttonColor}>
          Add Bucket!
        </Button>
      </form>
    </Modal>
  );
}