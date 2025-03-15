import { Button, FileInput, Flex, Group, Input, Modal, MultiSelect, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { post } from "../utils/apiClient";
import { handleError, handleSuccess } from "../utils/handlers";
import { ItemDropzone } from "./ItemDropzone";

interface ItemAllocation {
	groupName: string | null,
	bucketNames: string[]
}

export const ItemModal = ({ openedAddItem, closeAddItem }) => {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			itemName: '',
			itemUrl: '',
		},

		validate: {
			itemName: (value) => (value ? null : 'Invalid name'),
		},
	});


	const groups = [
    {
      groupId: "justin",
      groupName: "justin1"
    },
    {
      groupId: "edison",
      groupName: "edison1"
    },
    {
      groupId: "elizabeth",
      groupName: "elizabeth1"
    },
  ]

  const buckets = [
    {
      groupId: "justin",
      bucketName: "justinBucket",
      bucketId: "justinBBA"
    },
    {
      groupId: "justin",
      bucketName: "justinBucket2",
      bucketId: "justinBBB"
    },
    {
      groupId: "justin",
      bucketName: "justinBucket3",
      bucketId: "justinBBC"
    },
    {
      groupId: "elizabeth",
      bucketName: "elizabethBucket",
      bucketId: "elizabethBBA"
    },
    {
      groupId: "elizabeth",
      bucketName: "elizabethBucket2",
      bucketId: "elizabethBBB"
    },
    {
      groupId: "edison",
      bucketName: "edisonBucket2",
      bucketId: "edisonBBB"
    },
  ]

	const groupNameToId = (groupName: string) => {
		const foundGroups = groups.filter(group => group.groupName === groupName);
		if (foundGroups.length == 0) return null;
		return foundGroups[0].groupId ?? null;
	}

	const groupIdToName = (groupId: string) => {
		const foundGroups = groups.filter(group => group.groupId === groupId);
		if (foundGroups.length == 0) return null;
		return foundGroups[0].groupName ?? null;
	}

	const bucketNameToId = (groupName: string, bucketName: string) => {
		const foundBuckets = buckets.filter(bucket => bucket.bucketName === bucketName && bucket.groupId === groupIdToName(bucket.bucketId));
		if (foundBuckets.length == 0) return null;

		return foundBuckets[0].groupId ?? null;
	}

	const ButtonStyle = {
		width: "10rem",
		height: "2.5rem",
		margin: "auto"
	}

	const InputStyle = {
		margin: "1rem auto",
	}

	const [ itemAllocations, setItemAllocations] = useState<ItemAllocation[]>([ { groupName: null, bucketNames: [] }]);
	const [ files, setFiles ] = useState<File[]>([]);

	const handleSubmit = async (values) => {
		const bucketIds: string[] = [];
	
		itemAllocations.forEach(itemAllocation => itemAllocation.bucketNames.forEach(bucketName => {
			const bId = bucketNameToId(itemAllocation.groupName ?? "", bucketName ?? "");
			if (bId) bucketIds.push(bId);
		}));
	
		// Convert files to data URLs
		const filePromises = files.map(file => {
			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(file);
			});
		});
	
		try {
			const dataUrls = await Promise.all(filePromises);
	
			const params = { 
				itemName: values.itemName, 
				itemDesc: values.itemDesc, 
				itemUrl: values.itemUrl,  
				images: dataUrls,  // Converted Data URLs
				bucketId: bucketIds, 
			};
	
			console.log(params);
	
			const res = await post("/item/add", params);
	
			if (res.error) {
				handleError(res.error);
				return;
			}
	
			handleSuccess(res.message);
			closeAddItem();
		} catch (error) {
			console.error("Error converting files:", error);
			handleError("Failed to convert images.");
		}
	};	

    return (
        <Modal opened={openedAddItem} onClose={closeAddItem} title="Add Item" centered>
					<div style={{padding: "1rem" }}>
						<form onSubmit={form.onSubmit(handleSubmit)}>
							<TextInput
								style={InputStyle}
								withAsterisk
								label="Item Name"
								placeholder="Item Name"
								key={form.key('itemName')}
								{...form.getInputProps('itemName')}
							/>
							<TextInput
								style={InputStyle}
								label="Url"
								placeholder="Url"
								key={form.key('itemUrl')}
							/>
							<Textarea
								style={InputStyle}
								label="Description"
								key={form.key('itemDesc')}
								placeholder="Description"
							/>
							{ itemAllocations.map((itemAllocation, index) => {
								return (
									<Group justify="space-between" wrap="nowrap" my="xs" key={index}> 
										<Select
											style={{ maxWidth: "50%"}}
											label="Group"
											placeholder="Group"
											key={form.key(index + 'groupName')}
											data={groups.map(group => group.groupName)}
											value={itemAllocation.groupName}
											onChange={(value) => {
												const newItemAllocations = [...itemAllocations];
												newItemAllocations[index].groupName = value;
												newItemAllocations[index].bucketNames = [];
												setItemAllocations(newItemAllocations)
											}}
										/>
										<div style={{ marginTop: "20px", fontSize: "20px" }}>/</div>
										<MultiSelect
										 	className="bucket-multiselect"
											style={{ maxWidth: "50%"}}
											inputSize="md"
											label="Bucket"
											placeholder="Bucket"
											key={form.key(index + 'bucketName')}
											value={itemAllocation.bucketNames}
											onChange={(value) => {
												const newItemAllocations = [...itemAllocations];
												newItemAllocations[index].bucketNames = value;
												setItemAllocations(newItemAllocations)
											}}
											data={
												buckets.filter(bucket => bucket.groupId === groupNameToId(itemAllocation.groupName ?? ""))
													.map((group) => group.bucketName)
											}
										/>
									</Group>
								)
							})}
							<br/>
							<Flex direction="row-reverse" w="100%">
								<Button
									size="xs"
									radius="lg"
									onClick={() => {
										setItemAllocations(() => [...itemAllocations, { groupName: null, bucketNames: [] }])
									}}
								>
									Add Group
								</Button>

							</Flex>
							<FileInput
								style={InputStyle}
								label="Images"
								accept="image/png,image/jpeg"
								placeholder="Upload images"
								multiple
								value={files}
								onChange={setFiles}
							/>
							<Group justify="flex-end" mt="md">
								<Button 
									type="submit"
									variant="filled" 
									radius="lg"
									mt="1.5rem"
									style={ButtonStyle}
								>
									Add Item!
								</Button>
							</Group>
						</form>
					</div>
      </Modal>
    )
}