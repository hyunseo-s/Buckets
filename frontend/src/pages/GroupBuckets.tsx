import { Avatar, ActionIcon } from "@mantine/core"
import BucketView from "../components/BucketView"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from "react-router";
import { get } from "../utils/apiClient";
import { useEffect, useState } from "react";
import { handleError } from "../utils/handlers";

interface Buckets {
  bucketId: string;
  bucketName: string;
  gid: string;
  items: string[]
}

const GroupBuckets = () => {
  const { gid = '' } = useParams();
  const [buckets, setBuckets] = useState<Buckets[]>([]);
  const [title, setTitle] = useState<string>('');

  const fetchBuckets = async (gid: string) => {
    let v;
    const res = await get(`/groups/${gid}/buckets`, v);
    setBuckets(JSON.parse(res));
  }

  const fetchGroup = async (gid: string) => {
    let v;
    const res = await get(`/groups/${gid}`, v);
    if (res.error) {
      handleError(res.error);
      return;
    }

    setTitle(res.groupName);
  }

  useEffect(() => {
    fetchBuckets(gid)
    fetchGroup(gid)
  }, [gid])

  return (
    <div>
        <BucketView title={title} buckets={buckets}>
            <Avatar.Group>
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU-UtfA2fQ32wtc0GpcBQt7afnwIzLjbiIBg&s" />
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU-UtfA2fQ32wtc0GpcBQt7afnwIzLjbiIBg&s" />
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU-UtfA2fQ32wtc0GpcBQt7afnwIzLjbiIBg&s" />
                <Avatar>+5</Avatar>
            </Avatar.Group>
            <ActionIcon variant="light" color="gray" radius="xl" aria-label="Settings">
                <MoreHorizIcon />
            </ActionIcon>
        </BucketView>
    </div>
  )
}

export default GroupBuckets