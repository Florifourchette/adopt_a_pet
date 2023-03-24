const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const pets = require("./petList");
// const parsedPets = JSON.parse(pets);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/", (req, res) => {
  res.send(`<h1>Adopt a Pet!</h1>
  <p>Browse through the links below to find your new furry friend:</p>
  <ul>
  <li><a href='/animals/dogs'> Dogs </a></li>
  <li><a href='/animals/cats'> Cats </a></li>
  <li><a href='/animals/rabbits'> Rabbits </a></li>
  </ul>
  `);
});

app.get("/animals", (req, res) => {
  res.send(pets);
});

app.get("/animals/:pet_type", (req, res) => {
  const type = req.params.pet_type;
  if (!type) return res.send("Pet not found");
  //   res.send(pets[type]);

  res.send(
    `<h1>List of ${type}</h1> ${pets[type]
      .map((pet) => {
        const index = pets[type].indexOf(pet);
        return `<li><a href=/animals/${type}/${index} >${pet.name}</li>`;
      })
      .join("")}`
  );
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const index = parseInt(req.params.pet_id);
  const type = req.params.pet_type;
  if (index > pets[type].length - 1) return res.send("Pet not found");
  const findPet = pets[type].filter((pet) => pets[type].indexOf(pet) === index);
  const findPetArray = Object.values(findPet)[0];
  //   res.send(findPet);
  res.send(`<h1>${findPetArray.name}</h1>
    <p><img src=${findPetArray.url}</p>
    <p>${findPetArray.description}</p>
    <ul>
    <li>
    ${findPetArray.breed}
    </li>
    <li>
    ${findPetArray.age}
    </li>
    </ul>

    `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
