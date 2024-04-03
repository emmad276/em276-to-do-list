#! /usr/bin/env node 
import inquirer from "inquirer";

let todos: any[]= [];
let condition = true;

const manageList = async () => {
  while (condition) {
    let operation = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Choose an action:",
        choices: ["Add to list", "Remove from list", "Display list", "Exit"],
      },
    ]);

    switch (operation.action) {
      case "Add to list":
        await addToList();
        break;
      case "Remove from list":
        await removeFromList();
        break;
      case "Display list":
        console.log("Current list:", todos);
        break;
      case "Exit":
        condition = false;
        console.log("Exiting program.");
        break;
    }
  }
};

const addToList = async () => {
  let newItem = await inquirer.prompt({
    name: "item",
    type: "input",
    message: "What do you want to add to your list?",
  });
  todos.push(newItem.item);
  console.log("Item added to list.");
};

const removeFromList = async () => {
  if (todos.length === 0) {
    console.log("List is empty. Nothing to remove.");
    return;
  }

  let itemToRemove = await inquirer.prompt({
    name: "item",
    type: "list",
    message: "Choose an item to remove:",
    choices: todos,
  });

  todos = todos.filter((item) => item !== itemToRemove.item);
  console.log("Item removed from list.");
};

manageList();
