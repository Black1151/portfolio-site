import apiClient from "./apiClient";
import { Employee, EmployeeOverview, EmployeeCreateUpdate } from "../types";

export const getEmployeesOverviewAPI = async (
  searchCriteria = {}
): Promise<EmployeeOverview[]> => {
  try {
    const response = await apiClient.get<EmployeeOverview[]>(
      "/employees/overview",
      {
        params: searchCriteria,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting employees overview", error);
    throw error;
  }
};

export const getEmployeeAPI = async (id: number): Promise<Employee> => {
  try {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting employee with id ${id}`, error);
    throw error;
  }
};

export const createEmployeeAPI = async (
  data: EmployeeCreateUpdate
): Promise<number> => {
  try {
    const response = await apiClient.post<Employee>("/employees", data);
    return response.status;
  } catch (error) {
    console.error("Error creating employee", error);
    throw error;
  }
};

export const updateEmployeeAPI = async (
  data: EmployeeCreateUpdate
): Promise<Employee> => {
  try {
    const response = await apiClient.put<Employee>(
      `/employees/${data.id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${data.id}`, error);
    throw error;
  }
};

export const deleteEmployeeAPI = async (id: number): Promise<number> => {
  try {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.status;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}`, error);
    throw error;
  }
};
