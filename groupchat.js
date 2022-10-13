const CLIENT_ID = 'Q7oVtf8U6ab5x2cf';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const groupchat = drone.subscribe('observable-groupchat');
  groupchat.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  groupchat.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  groupchat.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  groupchat.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  groupchat.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const Fname = ["John", "Sean", "Jeffrey", "Ben", "Dean", "Harry", "Adrian", "Michael", "John-Uhn", "Obama", "Vladimir", "Lohhny", "Arnold", "Yomum", "Dwayne", "Sasha", "Daisy", "Mia", "Lana"];
  const Lname = ["Smith", "Di Mario", "Ang", "Wang", "Raj", "Ladesh", "Coutin", "Chang", "Mao", "Chong", "Doe", "Hale", "Morales", "Norris", "Morris", "Johnson", "White", "Malkova", "Rhodes","Depp" ];
  return (
    Fname[Math.floor(Math.random() * Fname.length)] +
    " " +
    Lname[Math.floor(Math.random() * Lname.length)]
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-groupchat',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color} = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}