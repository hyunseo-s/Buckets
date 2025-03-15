import { SearchBar } from '../components';
const Group = () => {
	

  return (
		<div style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
			<div style={{ width: "40%", minWidth: "300px", margin: "auto" }}>
				< SearchBar />
			</div>
		</div>
  );
}

export default Group;