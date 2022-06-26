const Engineer = require("../lib/Engineer");

test("Creates new Engineer", () => {
  const employee = new Engineer(
    "Darrin Ling",
    1,
    "darrinling@gmail.com",
    "darrinling"
  );

  expect(employee.name).toBe("Darrin Ling");
  expect(employee.id).toEqual(expect.any(Number));
  expect(employee.email).toEqual(expect.any(String));
  expect(employee.github).toEqual(expect.any(String));
});

test("Checks all methods for Engineer class", () => {
  const employee = new Engineer(
    "Darrin Ling",
    1,
    "darrinling@gmail.com",
    "darrinling"
  );

  expect(employee.getName()).toBe(employee.name);
  expect(employee.getId()).toBe(employee.id);
  expect(employee.getEmail()).toBe(employee.email);
  expect(employee.getGithub()).toBe(employee.github);
  expect(employee.getRole()).toBe("Engineer");
});
