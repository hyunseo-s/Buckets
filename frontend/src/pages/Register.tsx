import { Group, PasswordInput, TextInput, Button, Anchor, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { post } from '../utils/apiClient';
import { handleError, handleSuccess } from '../utils/handlers';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useGroups } from '../context/GroupsProvider';
import { IconPhotoScan } from '@tabler/icons-react';

const Register = () => {
	const navigate = useNavigate();
	const { refreshGroups } = useGroups();
	const [ image, setImage ] = useState<File | null>(null);

	const ButtonStyle = {
		width: "10rem",
		height: "2.5rem",
		margin: "auto"
	}

	const InputStyle = {
		margin: "0.75rem auto",
	}

	const HeadingStyle = { 
		textAlign: "center",
		fontWeight: "400",
		marginBottom: "-.5rem"
	}
		
	const TextStyle = { 
		fontSize: "9pt", 
		margin: "0rem auto",
		width: "fit-content",
		textAlign: "center",
	}

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
			username: '',
			name: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) => (value ? null : 'Invalid password'),
			username: (value) => (value ? null : 'Invalid username'),
			name: (value) => (value ? null : 'Invalid name'),
    },
  });

	const handleSubmit = async (values) => {
		const filePromise = (file: File): Promise<string> => {
			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = reject;
				console.log(file)
				reader.readAsDataURL(file);
			});
		};

		try {

			const params = {
				...values,
				profileImg: image == null ? null : await filePromise(image)
			}
			const res = await post("/auth/register", params);
			
			if (res.error) {
				handleError(res.error);
				return;
			}
			handleSuccess(res.message);
			localStorage.setItem("token", res.token);
			refreshGroups();
			navigate('/groups');

		} catch (error) {
			console.error("Error converting files:", error);
			handleError("Failed to convert images.");
		}

	}

	useEffect(() => {
		localStorage.removeItem("token");
		refreshGroups();
	}, [])

  return (
	<div style={{ height: '100vh', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center'}}>
		<div style={{ width: "40%", minWidth: "300px", margin: "auto" }}>
				<h2 style={HeadingStyle} >Create Account</h2>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						style={InputStyle}
						withAsterisk
						label="Name"
						placeholder="Name"
						key={form.key('name')}
						{...form.getInputProps('name')}
					/>
					<FileInput
						clearable 
						style={InputStyle}
						leftSection={<IconPhotoScan style={{color: '#CED4DA'}}/>}
						label="Image"
						accept="image/png,image/jpeg"
						placeholder="Upload images"
						value={image}
						onChange={setImage}
					/>
					<TextInput
						style={InputStyle}
						withAsterisk
						label="Email"
						placeholder="Email"
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
					<TextInput
						style={InputStyle}
						withAsterisk
						label="Username"
						placeholder="Username"
						key={form.key('username')}
						{...form.getInputProps('username')}
					/>
					<PasswordInput
						style={InputStyle}
						withAsterisk
						label="Password"
						placeholder="Password"
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
					<Group justify="flex-end" mt="md">
						<Button 
							type="submit"
							variant="filled" 
							radius="lg"
							mt="1.5rem"
							style={ButtonStyle}
						>
							Create account!
						</Button>
					</Group>
				</form>
				<div style={{ margin: "auto", width: "100%", marginTop: "1rem"}}>
					<p style={TextStyle}>
						Have a bucket?
					</p>
					<div style={{ display: "flex", justifyContent: "space-around"}}>
						<Anchor onClick={() => navigate("/login")} style={TextStyle}>
							Sign in here!
						</Anchor>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Register;