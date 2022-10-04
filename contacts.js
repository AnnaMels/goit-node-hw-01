const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
    try {
        const result = await fs.readFile(contactsPath);
        return JSON.parse(result);
    } catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    const parsedId = String(contactId);
    try {
        const contacts = await listContacts();
        const result = contacts.find(contact => contact.id === parsedId);
        return result || null;
    } catch (error) {
        console.log(error.message);
    }

}

async function removeContact(contactId) {
    const parsedId = String(contactId);
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(i => i.id === parsedId);
        if (index === -1) {
            return null;
        }
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
    } catch (error) {
        console.log(error.message);
    }

}

async function addContact(name, email, phone) {
    const contacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    try {
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.message);

    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}