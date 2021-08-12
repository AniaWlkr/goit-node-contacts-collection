const mongoose = require("mongoose")
const contacts = require("./index")
const { contacts: service } = require("../../services")
jest.mock("../../services")
// jest.useFakeTimers()

describe("Unit tests for contacts controllers", () => {
  let req, res, next
  beforeEach(() => {
    req = {
      user: { id: "61119ada1c35a373e6592db8" },
      query: { page: 1 },
      params: { contactId: "611576c49315acb6b7365dfd" },
      body: {
        name: "Alex Ivanoff",
        email: "alex@mail.com",
        phone: "321 45 67",
        favorite: true,
      },
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    next = jest.fn()
  })
  test("should get all contacts", async () => {
    const result = await contacts.listContacts(req, res)
    expect(service.getAllContacts).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result).toHaveProperty("status", "success")
    expect(result.code).toBe(200)
    console.log("result", result)
  })
  test("should get contact by id", async () => {
    const result = await contacts.getContactById(req, res)
    expect(service.getContactById).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result).toHaveProperty("status", "success")
    expect(result.code).toBe(200)
    console.log("result", result)
  })
  test("should update contact status", async () => {
    const result = await contacts.updateContactStatus(req, res)
    console.log("result", result)
  })
  test("should update contact ", async () => {
    const result = await contacts.updateContact(req, res)
    console.log("result", result)
  })
  // test("should remove contact ", async () => {
  //   const result = await contacts.removeContact(req, res)
  //   expect(service.removeContact).toHaveBeenCalled()
  //   expect(res.json).toHaveBeenCalled()
  //   expect(result).toBeDefined()
  //   expect(result).toHaveProperty("status", "success")
  //   expect(result).toHaveProperty("message", "Contact deleted")
  //   expect(result.code).toBe(200)
  //   console.log("result", result)
  // })
  test("should add contact ", async () => {
    const result = await contacts.addContact(req, res)
    expect(service.addContact).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result).toHaveProperty("status", "success")
    expect(result.code).toBe(201)
    console.log("result", result)
  })

  afterAll(() => {
    mongoose.disconnect()
  })
})
