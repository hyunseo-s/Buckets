import { Group, Input, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export const ItemDropzone = (props: Partial<DropzoneProps>) => {

  return (
		<>
			<Input.Label required>Images</Input.Label>
			<Dropzone
				mt="4px"
				mx={"auto"}
				onDrop={(files) => console.log('accepted files', files)}
				onReject={(files) => console.log('rejected files', files)}
				maxSize={5 * 1024 ** 2}
				accept={IMAGE_MIME_TYPE}
				{...props}
			>
				<Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
					<Dropzone.Accept>
						<IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
					</Dropzone.Idle>
					<div>
						<Text size="sm" inline>
							Drag images here or click to select files
						</Text>
						<Text size="sm" c="dimmed" inline mt={7}>
							Attach as many images as you like, each image should not exceed 5mb
						</Text>
					</div>
				</Group>
			</Dropzone>
		</>
  );
}