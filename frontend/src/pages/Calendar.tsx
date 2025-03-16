import { Flex, Stack, Title, Text, Button } from "@mantine/core";
import { NestedCheckbox } from '../components/NestedCheckbox';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { get } from "../utils/apiClient";
import { useForm } from '@mantine/form';

// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface DateObject {
    date: string,
    checked: boolean,
    freeAt: DateRange[]
}

interface DateRange {
    start: string,
    end: string,
    checked: boolean,
}

const Calendar = () => {
    const { id }= useParams();
    const [dateObjects, setDateObjects] = useState<DateObject[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await get(`/calendar?itemId=${id}`)
            console.log(res)
            const newDateObjects = res.availability.map((a) => ({
                date: a.date, freeAt: a.free_at.map(f => ({ ...f, checked:false})), checked: false
            }))
            console.log("IVAN", newDateObjects);
            setDateObjects(newDateObjects);
        }

        fetchData()
    }, [id])

    const handleSubmit = () => {
        console.log(dateObjects)
    }

    return (
        <Flex direction='column' align='flex-start' m='7%' gap='xl'>

            <Title size="h1" style={{fontWeight: "400"}} mb='4rem'>Available Times</Title>
            <Text>Select an available time</Text>
            <Flex direction='row' w='100%' justify='space-between'>
                {dateObjects && dateObjects.length > 0 && dateObjects.map((d, i) => {
                    return (
                        <Stack key={i} >
                            <NestedCheckbox dateObjects={dateObjects} index={i} setDateObjects={setDateObjects}/>
                        </Stack>
                    );
                })}
            </Flex>
            <Flex direction='row' w='100%' justify='center'>
                <Button onClick={handleSubmit}>Submit</Button>
            </Flex>
        </Flex>
    )
}

export default Calendar