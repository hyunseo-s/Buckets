import { Flex, Stack, Title, Text, Button } from "@mantine/core";
import { NestedCheckbox } from '../components/NestedCheckbox';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Calendar = () => {
    return (
        <Flex direction='column' align='flex-start' m='7%' gap='xl'>
            <Title size="h1" style={{fontWeight: "400"}} mb='4rem'>Available Times</Title>
            <Text>Select an available time</Text>
            <Flex direction='row' w='100%' justify='space-between'>
                {days.map((d, i) => {
                    return (
                        <Stack>
                            <NestedCheckbox key={i} day={d}/>
                        </Stack>
                    );
                })}
            </Flex>
            <Flex direction='row' w='100%' justify='center'>
                <Button>Submit</Button>
            </Flex>
        </Flex>
    )
}

export default Calendar