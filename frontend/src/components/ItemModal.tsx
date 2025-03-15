import { Button, FileInput, Group, Modal, Select, TextInput } from "@mantine/core";

export const ItemModal = ({ openedAddItem, closeAddItem }) => {
    return (
        <Modal opened={openedAddItem} onClose={closeAddItem} title="Add Item" centered>
        <form onSubmit={(e) => {
          e.preventDefault();
          form.onSubmit(handleSubmit)
          closeAddItem();
        }}>
          <TextInput
            label="Item Name"
            placeholder="Enter item name"
            value={itemName}
            onChange={(event) => setItemName(event.currentTarget.value)}
            required
          />
          <TextInput
            label="Item URL"
            placeholder="Enter item URL"
            value={itemURL}
            onChange={(event) => setItemURL(event.currentTarget.value)}
          />
          <FileInput
            label="Upload Item Images"
            placeholder="Choose images"
            value={itemImage}
            onChange={setItemImage}
            accept="image/*"
            clearable
            multiple
          />
          {itemAllocations.map((itemAllocation, index) => {
            return (
              <Group
                wrap='nowrap'
              >
                <Select
                  label="Add to group"
                  placeholder="Select group"
                  data={groups.map(group => group.groupName)}
                  // value={groupIdToName(itemAllocation.groupId)}
                  // onChange={(value) => pass(value)}
                  required
                />
                <div
                  style={{
                    marginTop: '20px',
                    fontSize: '20px',
                    color: 'gray'
                  }}
                >
                  /
                </div>
                <Select
                  label="Add to bucket"
                  placeholder="Select bucket"
                  data={}
                  // value={groupIdToName}
                  // onChange={(value) => pass(value)}
                  required
                  disabled
                />
              </Group>
            )
          })}
          <Button
            onClick={() => {
              const newItemAllocations = [...itemAllocations, {bucketId: null, groupId: null}]
              setItemAllocations(newItemAllocations)
            }}
          >
            Add Group
          </Button>
          <Button type="submit" fullWidth mt="md" color={buttonColor}>
            Add Item!
          </Button>
        </form>
      </Modal>
    )
}