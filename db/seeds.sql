INSERT INTO department(id, table_name)
VALUES(1, "Sales"),
        (2, "Engineering"),
        (3, "Legal"),
        (4, "Finance");

INSERT INTO role(id, title, department_id, salary)
VALUES(1, "Sales Lead", 1, 100000),
      (2, "Salesperson", 1, 80000),
      (3, "Lead Engineer", 2, 150000),
      (4, "Software Engineer", 2, 120000),
      (5, "Accountant Manager", 4, 160000),
      (6, "Accountant", 4, 125000),
      (7, "Legal Team Lead", 3, 250000);

INSERT INTO employee(id, first_name, last_name, role_id, department_id, salary, manager_id)
VALUES(1, "John", "Doe", "1", "1", 100000, "Sally"),
      (2, "Betty", "White", "2", "1", 80000, "1"),
      (3, "Vincent", "Campos", "2", "2", 150000, "1"),
      (4, "Regina", "George", "4", "4", 120000, "1"),
      (5, "Zayra", "Avelar", "5", "4", 160000, "null"),
      (6, "Adrian", "Esquivel", "6t", "4", 125000, "5");