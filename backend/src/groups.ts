import { Groups, User } from './interface';
import { v4 as uuidv4 } from 'uuid';

//
//
//
//
//
//
//
const database = {};

export function createGroup(groupName: String, memberIds: [User]) {
        //let database = getData();
        let groups = database["groups"];
        let id = uuidv4();
        
        let Group = {
            groupId: id,
            groupName: groupName,
            members: memberIds,
            buckets: []
        };
    
        groups.push(Group);
    
        return id;
}

// pass through groupId
// return true or false
export function deleteGroup(findGroupId: String) {
    //let database = getData();
    let groups = database["groups"];
    const groupExists = groups.some(group => group.groupId === findGroupId);
    
    if (!groupExists) {
        throw new Error(`Group with ID ${findGroupId} not found`);
    }

    return groups.filter(group => group.groupId !== findGroupId);
}


// passes through groupId and members to add
// returns updated list of members
export function addToGroup(groupId: String, memberIds: [User]) {
    //let database = getData();
    let groups = database["groups"];

    let group = groups.find(group => group.groupId === groupId);
    if (!group) {
        throw new Error(`Group with ID ${groupId} not found`);
    }

    memberIds.forEach(id => {
        if (!group.members.includes(id)) {
            group.members.push(id);
        } else {
            console.log(`User with ID ${id} is already a member of the group.`);
        }
    });

    return group.members;
}

export function removeFromGroup(groupId: String, memberIds: [User]) {
    //let database = getData();
    let groups = database["groups"];

    let group = groups.find(group => group.groupId === groupId);
    if (!group) {
        throw new Error(`Group with ID ${groupId} not found`);
    }

    group.members = group.members.filter(id => !memberIds.includes(id));

    return group.members;
}

export function editGroup(groupId: String, updatedGroupName: String) {
    //let database = getData();
    let groups = database["groups"];

    let group = groups.find(group => group.groupId === groupId);
    if (!group) {
        throw new Error(`Group with ID ${groupId} not found`);
    }

    group.groupName = updatedGroupName;

    return group.groupName;
}

export function getGroup(groupId: String) {
    //let database = getData();
    let groups = database["groups"];

    let group = groups.find(group => group.groupId === groupId);
    if (!group) {
        throw new Error(`Group with ID ${groupId} not found`);
    }

    return group;
}

export function getAllGroups(memberId: String) {
    //let database = getData();
    let groups = database["groups"];

    return groups.filter(group => group.members.includes(memberId));
}
