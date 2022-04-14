import { Employee } from "././src/interfaces/interface";
import { EmployeeOrgApp } from "././src/class/classes";
const ceo: Employee = {
  uniqueId: 1,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      uniqueId: 2,
      name: "Sarah Donald",
      subordinates: [
        {
          uniqueId: 7,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 8,
              name: "Mary Blue",
              subordinates: []
            },
            {
              uniqueId: 9,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 10,
                  name: "Tina Teff",
                  subordinates: [
                    {
                      uniqueId: 11,
                      name: "Will Turner",
                      subordinates: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      uniqueId: 3,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 4,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 4,
              name: "Thomas Brown",
              subordinates: []
            },
          ]
        },
        {
          uniqueId: 4,
          name: "George Carrey",
          subordinates: []
        },
        {
          uniqueId: 4,
          name: "Gary Styles",
          subordinates: []
        },
      ]
    },
    {
      uniqueId: 4,
      name: "Bruce Willis",
      subordinates: []
    },
    {
      uniqueId: 5,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 6,
          name: "Sophie Turner",
          subordinates: []
        }
      ]
    }
  ]
};

const app = new EmployeeOrgApp(ceo);

app.move(9, 5);
setTimeout(() => {
  app.undo();
}, 3000);
setTimeout(() => {
  app.redo();
}, 6000);
