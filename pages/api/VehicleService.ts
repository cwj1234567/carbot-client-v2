import axios from "axios";
import IDashboardModel from "../../interfaces/IDashboardModel";
import { action, makeObservable, observable } from 'mobx';

const baseUrl = "https://api.carbot.lol";

class VehicleService {
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
        baseUrl + "/vehicle/dashboard"
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
      const response = await axios.get<IDashboardModel[]>(
        baseUrl + "/vehicle/dashboard/" + make
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

  async getMakes(): Promise<string[]> {
    try {
      this.isLoading = true;
      const response = await axios.get<string[]>(baseUrl + "/vehicle/make");
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

export default VehicleService;
