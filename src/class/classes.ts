import { Employee, IEmployeeOrgApp } from "../interfaces/interface";

export class EmployeeOrgApp implements IEmployeeOrgApp {
  orgChart: Employee;

  previousAction: any = {};

  constructor(orgChart: Employee) {
    this.orgChart = orgChart;
  }

  move(employeeID: number, supervisorID: number): void {
    // this.previousAction
    this.previousAction.employeeID = employeeID;
    this.previousAction.supervisorID = supervisorID;
    // const employee = this.orgChart.;
    const employeeSupervisor = this.findEmployeeParent(
      this.orgChart.subordinates,
      employeeID
    );

    this.previousAction.employeeSupervisorID = employeeSupervisor?.uniqueId;

    const supervisor = this.findEmployee(
      this.orgChart.subordinates,
      supervisorID
    );

    // console.log(employee);
    if (supervisor != null) {
      let movingEmployee = employeeSupervisor?.subordinates.find(
        (item) => item.uniqueId === employeeID
      );

      if (employeeSupervisor != null) {
        let surbodinates = movingEmployee?.subordinates;
        this.previousAction.subordinates = surbodinates;

        employeeSupervisor.subordinates = employeeSupervisor.subordinates.filter(
          (employee) => {
            return employee.uniqueId !== employeeID;
          }
        );

        if (surbodinates !== undefined) {
          employeeSupervisor.subordinates.push(...surbodinates);
        }
      }

      if (movingEmployee !== undefined || movingEmployee != null) {
        supervisor.subordinates.push({
          ...movingEmployee,
          ...{ subordinates: [] }
        });
      }

      console.log({ orgChartMove: this.orgChart });

      // console.log({ employeeSupervisor });
      // console.log({ supervisor });
      // console.log({ orgChart: this.orgChart });
    }
  }
  undo(): void {
    const employeeID = this.previousAction.employeeID;
    const previousSupervisorID = this.previousAction.employeeSupervisorID;
    const previousSurbodinates: Employee[] = this.previousAction.subordinates;
    const employeeParent = this.findEmployeeParent(
      this.orgChart.subordinates,
      employeeID
    );

    if (employeeParent) {
      const employee = employeeParent?.subordinates.find(
        (employee) => employee.uniqueId === employeeID
      );

      employeeParent.subordinates = employeeParent.subordinates.filter(
        (employee) => employee.uniqueId !== employeeID
      );

      const previousSupervisor = this.findEmployee(
        this.orgChart.subordinates,
        previousSupervisorID
      );

      if (previousSupervisor) {
        previousSupervisor.subordinates = previousSupervisor?.subordinates.filter(
          (el) => -1 === previousSurbodinates.indexOf(el)
        );

        if (employee) {
          previousSupervisor?.subordinates.push({
            ...employee,
            ...{ subordinates: previousSurbodinates }
          });
        }

        console.log({ orgChartUndo: { ...{}, ...this.orgChart } });
      }
    }
  }
  redo(): void {
    this.move(
      this.previousAction.employeeID,
      this.previousAction.employeeSupervisorID
    );
    console.log({ orgChartRedo: { ...{}, ...this.orgChart } });
  }

  findEmployeeParent(
    employeesOrgChart: Employee[],
    id: number
  ): Employee | null {
    let result;
    employeesOrgChart.some((child) => {
      if (child.subordinates.some((e) => e.uniqueId === id)) {
        return (result = child);
      } else {
        return (result = this.findEmployeeParent(child.subordinates || [], id));
      }
    });

    return result === undefined ? null : result;
  }

  findEmployee(employeesOrgChart: Employee[], id: number): Employee | null {
    // console.log({ employeesOrgChart });

    let result;
    employeesOrgChart.some((child) => {
      if (child.uniqueId === id) {
        return (result = child);
      } else {
        return (result = this.findEmployee(child.subordinates || [], id));
      }
    });

    return result === undefined ? null : result;
  }
}
