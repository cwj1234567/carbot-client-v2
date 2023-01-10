import axios from "axios";
import IDashboardModel from "../../interfaces/IDashboardModel";
import { action, makeObservable, observable } from "mobx";
import IVehicleModel from "../../interfaces/IVehicleModel";

const baseUrl = "https://api.carbot.lol";

class CarbotService {
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      // Observables

      isLoading: observable,
    });
  }

  async getDashboard(): Promise<IDashboardModel[]> {
    try {
      this.isLoading = true;
      const response = await axios.get<IDashboardModel[]>(
        `${baseUrl}/dashboard`
      );
      this.isLoading = false;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getDashboardByMake(make: string): Promise<IDashboardModel[]> {
    try {
      this.isLoading = true;
      const params = new URLSearchParams();
      params.set("make", make);
      const url = `${baseUrl}/dashboard?${params.toString()}`;
      const response = await axios.get<IDashboardModel[]>(url);
      this.isLoading = false;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getMakes(): Promise<string[]> {
    try {
      this.isLoading = true;
      const response = await axios.get<string[]>(`${baseUrl}/vehicle/make`);
      this.isLoading = false;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getVehicle(vehicleId: string): Promise<IVehicleModel> {
    try {
      this.isLoading = true;
      const response = await axios.get<IVehicleModel>(
        `${baseUrl}/vehicle/${vehicleId}`
      );
      this.isLoading = false;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}

export default CarbotService;
