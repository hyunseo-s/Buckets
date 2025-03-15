import { Group, PasswordInput, TextInput, Button, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { post } from '../utils/api';

const Login = () => {

	const ButtonStyle = {
		width: "10rem",
		height: "2.5rem",
		margin: "auto"
	}

	const InputStyle = {
		margin: "2rem auto",
	}

	const HeadingStyle = { 
		textAlign: "center",
		fontWeight: "400",
		marginBottom: "-1rem"
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
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) => (value ? null : 'Invalid password'),
    },
  });

	const handleSubmit = async (values) => {
		const res = await post("/auth/login", values);
		console.log(res);
	}

  return (
		<div style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
			<div style={{ width: "40%", minWidth: "300px", margin: "auto" }}>
				<h2 style={HeadingStyle} >Login</h2>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						style={InputStyle}
						withAsterisk
						label="Email"
						placeholder="Email"
						key={form.key('email')}
						{...form.getInputProps('email')}
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
							Login
						</Button>
					</Group>
				</form>
				<div style={{ margin: "auto", width: "100%", marginTop: "1rem"}}>
					<p style={TextStyle}>
						Don't have a bucket?
					</p>
					<div style={{ display: "flex", justifyContent: "space-around"}}>
						<Anchor href="/register" style={TextStyle}>
							Create an account!
						</Anchor>
					</div>
				</div>
			</div>
		</div>
  );
}

export default Login;