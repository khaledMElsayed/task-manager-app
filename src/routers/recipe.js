const express = require("express");
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/recipes", auth, async (req, res) => {
  console.log(req.body);
  let recipes = [...req.body.recipes];

  try {
    for (let recipe of recipes) {
      let recipeObj = new Recipe({
        ...recipe,
      });
      await recipeObj.save();
    }
    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/recipes", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find();

    if (recipes.length === 0) {
        return res.status(404).send();
      }

    res.send(recipes);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
