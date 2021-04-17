/*
question

given a list of users with likely duplicates,
identify the unique people and their duplicates 
*/

const input = [
    {
        id: 1,
        email: 'a@email.com',
        ip: 50
    },
    {
        id: 2,
        email: 'b@email.com',
        ip: 50
    },
    {
        id: 3,
        email: 'x@email.com',
        ip: 75
    },
    {
        id: 4,
        email: 'b@email.com',
        ip: 100
    },
]

const output = [
    [1, 2, 4],
    [3]
];

/*
solution

group properties by people
set people to an array of possible duplicates
call Object.values on People object after processing to get answer

for each person
process both properties
    if both are unique, this is a new person
    if one is already identified, 
        add the new id to the existing list of ids
        use the previously found identiy of the person
    if both are identified but are not the same person
        you need to merge the 2 clusters
        take the shorter length cluster, concat its people array with the longer cluster
        iterate through the shorter cluster, use the email and ip addresses and update with the new joint id
after processing
    get all people using Object.values
    map over and return just the ids
*/

const people = {
    '1': [
            {
                id: 1,
                email: 'a@email.com',
                ip: 50
            },
            {
                id: 2,
                email: 'b@email.com',
                ip: 50
            },
            {
                id: 4,
                email: 'b@email.com',
                ip: 100
            }
        ],
    '3': [
        {
            id: 3,
            email: 'x@email.com',
            ip: 75
        }
    ]
}

const email = {
    'a@email.com': 1,
    'b@email.com': 1,
    'x@email.com': 3,
}

const ip = {
    '50': 1,
    '75': 3,
    '100': 1,
}