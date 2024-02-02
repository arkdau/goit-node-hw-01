const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

/*
 * Skomentuj i zapisz wartość
 * const contactsPath = ;
 */

const baseDir = path.dirname("./db/contacts.json");
const outFileName = path.basename("./db/contacts.json");
const contactsPath = path.join(baseDir, outFileName);

// TODO: udokumentuj każdą funkcję
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.log('contacts: ', data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  // ...twój kod
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = await JSON.parse(data);

    let arr_id = -1;
    parseData.forEach((element, index) => {
      if (element.id === contactId) {
        arr_id = index;
      }
    });
    if (arr_id !== -1) {
      return parseData[arr_id];
    } else {
      console.log("the specified id value does not exist");
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  // ...twój kod
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = await JSON.parse(data);

    const newContacts = parseData.filter((element) => {
      if (element.id !== contactId) {
        return element;
      }
    });

    console.log("new contacts: ", newContacts);
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
      console.log("Updated file successfully");
    });
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  // ...twój kod
  const newContacts = {
    "id": `${nanoid()}`,
    "name": name,
    "email": email,
    "phone": phone,
  };
  console.log("add contact - data: ", newContacts);
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let parseData = await JSON.parse(data);
    parseData = [...parseData, newContacts];
    console.log("parseData: ", parseData);
    fs.writeFile(contactsPath, JSON.stringify(parseData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
      console.log("Updated file successfully");
    });
  } catch (error) {
    console.log(error);
  }
}

// module.exports
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
