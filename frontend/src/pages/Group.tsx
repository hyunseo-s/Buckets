import { SearchBar } from '../components';
import { GroupCard } from '../components/group/GroupCard';
const Group = () => {
	
	const groups = [0];

  return (
		<div style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
			<div style={{ width: "40%", minWidth: "300px", margin: "auto" }}>
				< SearchBar />
				<div>
					{groups.map(group => <GroupCard />)}
				</div>
			</div>
		</div>
  );
}

export default Group;