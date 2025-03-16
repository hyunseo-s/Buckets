import { useListState, randomId } from '@mantine/hooks';
import { Checkbox } from '@mantine/core';

const initialValues = [
  { label: '9am-12pm', checked: false, key: randomId() },
  { label: '3pm-4pm', checked: false, key: randomId() },
  { label: '8pm-12am', checked: false, key: randomId() },
];

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

interface DateObjectProps {
  index: number,
  dateObjects: DateObject[]
  setDateObjects: React.Dispatch<DateObject[]>

}

export function NestedCheckbox( { dateObjects, setDateObjects, index } : DateObjectProps) {
  console.log(dateObjects[index],index, "hello")

  // const allChecked = dateObjects[index].freeAt.every((value) => value.checked);
  // const indeterminate = dateObjects[index].freeAt.some((value) => value.checked) && !allChecked;

  return (
    <>
      <Checkbox
        key={`${dateObjects[index].date}`}
        // checked={allChecked}
        // indeterminate={indeterminate}
        label={`${new Date(dateObjects[index].date).toDateString().slice(0, -4)}`}
        onChange={(e) => {
          const newDateObjects = [...dateObjects];
          const newDateObject: DateObject = { ...newDateObjects[index] };
          newDateObject.checked = e.target.checked;
          newDateObjects[index] = newDateObject;
          setDateObjects(newDateObjects);
        }
        }
      />
      {dateObjects[index].freeAt.length > 0 &&  dateObjects[index].freeAt.map((value, i) => (
      <Checkbox
        mt="xs"
        ml={33}
        label={`${new Date(value.start).toLocaleTimeString().slice(0, -3)} - ${new Date(value.end).toLocaleTimeString().slice(0, -3)}`}
        key={`${value.start} - ${value.end} (${i})`}
        checked={value.checked}
        onChange={(e) => {
          const newDateObjects = [...dateObjects];
          const newDateObject = { ...newDateObjects[index] };
          const newFreeAt = [...newDateObject.freeAt];
          newFreeAt[i].checked = e.target.checked;
          newDateObject.freeAt = newFreeAt;
          newDateObjects[index] = newDateObject;
          setDateObjects(newDateObjects);
        }}
      />
    ))}
    </>
  );
}