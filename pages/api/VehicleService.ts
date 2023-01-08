import axios from "axios";
import IDashboardModel from "../../interfaces/IDashboardModel";

const baseUrl = "http://localhost:8181";

class VehicleService {
  async getDashboard(): Promise<IDashboardModel[]> {
    try {
      const response = await axios.get<IDashboardModel[]>(
        baseUrl + "/vehicle/dashboard"
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getDashboardByMake(make: string): Promise<IDashboardModel[]> {
    try {
      const response = await axios.get<IDashboardModel[]>(
        baseUrl + "/vehicle/dashboard/" + make
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMakes(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>(baseUrl + "/vehicle/make");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default VehicleService;
