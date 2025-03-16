import { Button } from "@mantine/core";
import { Bucket } from "../types";
import { get, post } from "../utils/apiClient";
import { useGroups } from "../context/GroupsProvider";
import { IconSparkles } from "@tabler/icons-react";
import { handleError } from "../utils/handlers";

export const AIButton = ({bucket}: { bucket: Bucket | null}) => {
	const { refreshItemsOfBucket } = useGroups();
	const handleClick = async () => {
		console.log(bucket)
		if (bucket == null) return;
		const res = await get(`/buckets/${bucket.bucketId}/recommendations`);
		if (res.error) {
			handleError(res.error);
			return;
		}


		if (res) {

			await Promise.all(res.map(item => {
				const params = { 
					itemName: item.itemName, 
					itemDesc: item.itemDesc, 
					itemUrl: '',  
					images: item.images,  // Converted Data URLs
					bucketIds: [ bucket.bucketId ], 
				};
				return post("/item/add", params);
			}))
			
			refreshItemsOfBucket(bucket.bucketId);

		}
	}

	return (
		<Button variant="gradient" onClick={handleClick} disabled={bucket === null} rightSection={<IconSparkles size={14} />}>
			AI Suggest
		</Button>
	)
}