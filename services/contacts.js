const { Contact } = require("../models")

const addContact = (newContact, userId) => {
  return Contact.create({ ...newContact, owner: userId })
}

const getContactById = (userId, id) => {
  return Contact.findById({ _id: id, owner: userId }).populate("owner", "email")
}

const getAllContacts = (userId, { page = 1, limit = 20, sortBy = "name", favorite }) => {
  const query = favorite ? { favorite: `${favorite}` } : null

  return Contact.paginate(
    {
      owner: userId,
      query,
    },
    {
      page,
      limit,
      sort: { [`${sortBy}`]: 1 },
      populate: {
        path: "owner",
        select: "email",
      },
    }
  )
}

const updateContact = (userId, id, newContact) => {
  return Contact.findByIdAndUpdate({ _id: id, owner: userId }, newContact, { new: true })
}

const deleteContact = (userId, id) => {
  return Contact.findByIdAndDelete({ _id: id, owner: userId })
}

module.exports = {
  addContact,
  getContactById,
  getAllContacts,
  updateContact,
  deleteContact,
}
