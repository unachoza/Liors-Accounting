let clients = [];

////NAVIGATION DOM
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

// Clients Section DOM
const newClientButton = document.getElementById('new-client-button');
const addClientButton = document.getElementById('add-client-button');
const modalElement = document.getElementById('modal');
const modalElementClientList = document.getElementById('modalList');
const addClientForm = document.getElementById('client-form');
const clientNameElement = document.getElementById('client-name');
const clientContainer = document.getElementById('client-container');
const modalClientList = document.getElementById('modal-content-list');

// Week Hours DOM
const thisWeekHoursList = document.getElementById('hours-container');
const hour = document.getElementById('hour');
hour.setAttribute('value', 1);
hour.addEventListener('click', () => addHour(savedClientHours));
const thirtyMin = document.getElementById('min');
hour.addEventListener('click', (e) => addThirty(savedClientHours));
thirtyMin.setAttribute('value', 0.5);

//Initializing Variables
let savedClientList = [];
let savedClientHours = [];
let answer;
let theSelectedClient = answer;

const showPopup = (modalInput) => {
  modalInput.classList.remove('hide');
  modalInput.classList.add('popup-open');
};
const hidePopup = (modalInput) => {
  modalInput.classList.add('hide');
  modalInput.classList.remove('popup-open');
};
const showClientList = (savedClientList) => {
  //if not equal then run the list
  {
    modalClientList.childNodes.length !== clientContainer.childNodes.length
      ? savedClientList.forEach((client) => {
          const { clientName } = client;
          const clientListName = document.createElement('div');
          clientListName.classList.add('item');
          // let node = document.createTextNode(clientName);
          clientListName.appendChild(document.createTextNode(clientName));
          clientListName.addEventListener('click', (e) => selectClient(e, savedClientHours));
          modalClientList.appendChild(clientListName);
        })
      : console.log('show client list:  equal');
  }
};
const superSelector = (e) => {
  let thisClickedVariable = e.target;
  return thisClickedVariable;
};
//try to make for many
const selectClient = (e, savedClientHours) => {
  if (localStorage.getItem('thisWeek')) {
    let savedhours = JSON.parse(localStorage.getItem('thisWeek'));
    console.log(savedhours, 'inside selectClient');
    console.log(savedhours[0].thisWeekClientName, e.target.textContent);
    let clientExisits = savedhours.filter((saved) => saved.thisWeekClientName === e.target.textContent);
    if (clientExisits.length) {
      console.log('already here let us move on');
    }
  } else {
    console.log('need to add');
    let thisWeekClientName = e.target.outerText;
    let selectedClient = {
      thisWeekClientName,
      hours: 0,
    };
    //array that is in local storage
    console.log(savedClientHours);
    savedClientHours.push(selectedClient);
    localStorage.setItem('thisWeek', JSON.stringify(savedClientHours));
    buildThisWeekHoursList();
  }
  hidePopup(modalElementClientList);

  //check if NOT alredy rendered client
  // thisWeekHoursList
  // if not create element to append to this weeks hours
  //if so access their hours
};
const addSelectedstyle = (element) => {
  element.classList.add('selected-item');
};
const addHoursToClient = (e) => {
  let selectedElm = e.target.textContent;
  e.target.classList.add('selected-item');
  hour.classList.add('selected-item');
  thirtyMin.classList.add('selected-item');
  //change css to commiunicate that client was selected
  let selectedClientData = savedClientHours.find((client) => client.thisWeekClientName === selectedElm);
  return selectedClientData;
  //re render dom BUILD THIS WEEK HIU
};
// answer = addHoursToClient(e);

const addHour = (answer) => console.log(selectedClientData, 'hour');
// selectedClientData.hour + hour.value;
const addThirty = (selectedClientData) => selectedClientData.hour + thirtyMin.value;

const buildThisWeekHoursList = () => {
  thisWeekHoursList.textContent = '';
  if (localStorage.getItem('thisWeek')) {
    let thisWeekList = JSON.parse(localStorage.getItem('thisWeek'));
    thisWeekList.forEach((thisWeek, i) => {
      const { thisWeekClientName, hours } = thisWeek;
      const thisWeekClientItem = document.createElement('div');
      thisWeekClientItem.setAttribute('id', `clientHours-${i}`);
      thisWeekClientItem.setAttribute('value', hours);
      thisWeekClientItem.classList.add('item');
      thisWeekClientItem.textContent = thisWeekClientName;
      console.log(thisWeekClientItem.textContent, 'text content');
      thisWeekClientItem.addEventListener('click', console.log(thisWeekClientItem.textContent));
      // () => addHoursToClient(e)
      thisWeekHoursList.appendChild(thisWeekClientItem);
    });
  }
};

newClientButton.addEventListener('click', () => showPopup(modalElement));
addClientButton.addEventListener('click', () => {
  showPopup(modalElementClientList);
  showClientList(savedClientList);
});

const buildClientList = () => {
  clientContainer.textContent = '';
  savedClientList
    ? savedClientList.forEach((client) => {
        const { clientName } = client;
        const clientItem = document.createElement('div');
        clientItem.classList.add('item');
        clientItem.textContent = clientName;
        clientContainer.appendChild(clientItem);
      })
    : null;
};

const addClient = () => {
  let date = new Date();
  date = date.toLocaleDateString();
  const nameValue = clientNameElement.value;
  const newClient = {
    date,
    clientName: nameValue,
  };
  savedClientList.push(newClient);
  localStorage.setItem('clients', JSON.stringify(savedClientList));
  buildClientList();
  addClientForm.reset();
  clientNameElement.focus();
  hidePopup(modalElement);
};

const fetchClientListFromLocalStorage = () => {
  if (localStorage.getItem('clients')) savedClientList = JSON.parse(localStorage.getItem('clients'));
  if (localStorage.getItem('thisWeek')) savedClientHours = JSON.parse(localStorage.getItem('thisWeek'));
  buildClientList();
  buildThisWeekHoursList();
};

///////NAVIGATION JS
const navAnimation = (direction1, direction2) => {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
};

const toggleNav = () => {
  menuBars.classList.toggle('change');
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    navAnimation('out', 'in');
  } else {
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    navAnimation('in', 'out');
  }
};
addClientForm.addEventListener('submit', addClient);
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

// fetchClientListFromLocalStorage();
