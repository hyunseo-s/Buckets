import { Button, Menu } from '@mantine/core'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export type DropdownDetails = {
  key: number,
  name: string,
  isFocused: boolean
  listener: (e: number) => void
}

const DropdownMenu = (props: DropdownDetails) => {
  const handleClick = () => {
    props.listener(props.key)
  }

  return (
    <Menu shadow="md" width={200}>
      <Button.Group>
        <Button variant={props.isFocused ? 'light' : 'subtle'} onClick={handleClick}>{props.name}</Button>

        {props.isFocused &&
          <Menu.Target>
            <Button variant='light' px='xs'><MoreHorizIcon /></Button>
          </Menu.Target>
        }
      </Button.Group>

      <Menu.Dropdown>
        <Menu.Item>
          Rename Bucket
        </Menu.Item>
        <Menu.Item>
          Edit Items
        </Menu.Item>
        <Menu.Item color="red">
          Delete Bucket
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default DropdownMenu