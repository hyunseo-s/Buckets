import { Group, PasswordInput, TextInput, Button, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { post } from '../utils/api';

const Register = () => {

	const ButtonStyle = {
		width: "10rem",
		height: "2.5rem",
		margin: "auto"
	}

	const InputStyle = {
		margin: "1.75rem auto",
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
		const res = await post("/auth/register", values);
		console.log(res);
	}

  return (
		<div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
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
						<Anchor href="/login" style={TextStyle}>
							Sign in here!
						</Anchor>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Register;