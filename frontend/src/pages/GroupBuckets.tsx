import { Avatar, ActionIcon } from "@mantine/core"
import BucketView from "../components/BucketView"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const GroupBuckets = () => {
  return (
    <div>
        <BucketView title={'Group 1'}>
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