/* eslint-disable no-unused-vars */
/*global process*/

const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://toukolonka:${password}@cluster0.pibpo.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length < 5) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    console.log("completed")
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((response) => {
    console.log("person saved!")
    mongoose.connection.close()
  })
}
