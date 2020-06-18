const users = [
  {
    id: 'as23',
    nick: 'Octopus',
    firstName: 'John',
    LastName: 'Dou'
  },
  {
    id: 'as25',
    nick: 'Star',
    firstName: 'Andy',
    LastName: 'Lee'
  },
  {
    id: 'as77',
    nick: 'Wally',
    firstName: 'Liza',
    LastName: 'Corty'
  }
];

const usersTransformed = {};

for(user of users){
  usersTransformed[user.id] = {
    nick: user.nick,
    firstName: user.firstName,
    LastName: user.LastName
  };
}

console.log(usersTransformed)