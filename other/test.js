const hillHouseFamily = {
    name: "Olivia Crain",
    children: [
        {
            name: "Steven Crain",
            children: []
        },
        {
            name: "Shiri Crain",
            children: [
                {
                    name: "Allie Harris",
                    children: []
                },
                {
                    name: "Jayden Harris",
                    children: []
                }
            ]
        },
        {
            name: "Theodora Crain",
            children: []
        },
        {
            name: "Eleanor Crain",
            children: []
        }
    ]
};

const getNames = (familyMember) => {
    let names = [familyMember.name]; // Add the name of the current family member

    // Iterate over children and recursively get their names
    for (const child of familyMember.children) {
        names = names.concat(getNames(child)); // Concatenate names from children
    }

    return names;
};

const getFamilyMembersMarkup = (family) =>
    `List of family members: ${getNames(family).join(", ")}`;

console.log(getFamilyMembersMarkup(hillHouseFamily));
