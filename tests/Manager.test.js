const Manager = require("../lib/Manager");

test("Creates new Manager", () => {
  const employee = new Manager("Darrin Ling", 1, "darrinling@gmail.com", 123);

  expect(employee.name).toBe("Darrin Ling");
  expect(employee.id).toEqual(expect.any(Number));
  expect(employee.email).toEqual(expect.any(String));
  expect(employee.officeNumber).toEqual(expect.any(Number));
});

test("Checks all methods for Manager class", () => {
  const employee = new Manager("Darrin Ling", 1, "darrinling@gmail.com", 123);

  expect(employee.getName()).toBe(employee.name);
  expect(employee.getId()).toBe(employee.id);
  expect(employee.getEmail()).toBe(employee.email);
  expect(employee.getOfficeNumber()).toBe(employee.officeNumber);
  expect(employee.getRole()).toBe("Manager");
});
