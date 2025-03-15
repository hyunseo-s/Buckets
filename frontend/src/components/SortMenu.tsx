import { Button, Menu } from '@mantine/core'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

const SortMenu = () => {
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button variant='subtle' leftSection={<SwapVertRoundedIcon color="primary"/>}>Sort</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          A-Z
        </Menu.Item>
        <Menu.Item>
          Z-A
        </Menu.Item>
        <Menu.Item>
          Most Likes
        </Menu.Item>
        <Menu.Item>
          Least Likes
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default SortMenu