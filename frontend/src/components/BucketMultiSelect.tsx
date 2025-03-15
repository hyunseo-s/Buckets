import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';

const MAX_DISPLAYED_VALUES = 2;

interface ItemAllocation {
	groupName: string | null,
	bucketNames: string[]
}

interface BucketMultiSelectProps {
	data: string[],
	itemAllocations: ItemAllocation[],
	setItemAllocations: React.Dispatch<React.SetStateAction<ItemAllocation[]>>
	index: number
}

export const BucketMultiSelect = ({ data, itemAllocations, setItemAllocations, index }: BucketMultiSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (value: string) => {
		const newItemAllocations = [...itemAllocations];
		const current = newItemAllocations[index].bucketNames;
		newItemAllocations[index].bucketNames = current.includes(value) ? current.filter((v) => v != value) : [...current, value]
		setItemAllocations(newItemAllocations)
	}

  const handleValueRemove = (value: string) => {
		const newItemAllocations = [...itemAllocations];
		const current = newItemAllocations[index].bucketNames;
		newItemAllocations[index].bucketNames = current.filter((v) => v !== value);
		setItemAllocations(newItemAllocations)
	}

  const newList = itemAllocations[index].bucketNames
    .slice(
      0,
      MAX_DISPLAYED_VALUES === itemAllocations[index].bucketNames.length ? MAX_DISPLAYED_VALUES : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const options = data.map((item) => (
    <Combobox.Option value={item} key={item} active={itemAllocations[index].bucketNames.includes(item)}>
      <Group gap="sm">
        {itemAllocations[index].bucketNames.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
          <Pill.Group>
            {itemAllocations[index].bucketNames.length > 0 ? (
              <>
                {newList}
                {itemAllocations[index].bucketNames.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{itemAllocations[index].bucketNames.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>Pick one or more newList</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                    handleValueRemove(itemAllocations[index].bucketNames[itemAllocations[index].bucketNames.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}