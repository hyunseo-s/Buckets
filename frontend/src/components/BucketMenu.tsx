import { Button, Menu } from '@mantine/core'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export type BucketMenuDetails = {
  index: number,
  name: string,
  isFocused: boolean
  buttonListener: (e: number) => void
  editListener: (e: boolean) => void
  renameListener: (e: boolean) => void
}

const BucketMenu = (props: BucketMenuDetails) => {
  const handleClick = () => {
    props.buttonListener(props.index)
  }

  return (
    <Menu shadow="md" width={200}>
      <Button.Group>
        <Button variant={props.isFocused ? 'light' : 'outline'} onClick={handleClick}>{props.name}</Button>
        {props.isFocused &&
          <Menu.Target>
            <Button variant='light' px='xs'><MoreHorizIcon /></Button>
          </Menu.Target>
        }
      </Button.Group>

      <Menu.Dropdown>
        <Menu.Item onClick={() => props.renameListener(true)}>
          Rename Bucket
        </Menu.Item>
        <Menu.Item onClick={() => props.editListener(true)}>
          Edit Items
        </Menu.Item>
        <Menu.Item color="red">
          Delete Bucket
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default BucketMenu