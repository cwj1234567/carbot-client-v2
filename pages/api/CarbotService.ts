import axios from "axios";
import IDashboardModel from "../../interfaces/IDashboardModel";

import IAuctionResponse from "../../interfaces/responses/IAuctionResponse";
import IPriceReportModel from "../../interfaces/IPriceReportModel";
import IStatModel from "../../interfaces/IStatModel";

const baseUrl = "https://api.carbot.lol";

class CarbotService {
  isLoading: boolean = false;

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
      const response = await axios.get<string[]>(`${baseUrl}/make`);
      this.isLoading = false;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getAuctions(
    vehicleId: string,
    page?: string
  ): Promise<IAuctionResponse> {
    try {
      this.isLoading = true;
      const params = new URLSearchParams();

      if (page) params.set("page", page);

      const response = await axios.get<IAuctionResponse>(
        `${baseUrl}/auction/${vehicleId}?${params.toString()}`
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

  async get90DayPriceReport(
    vehicleId?: string
  ): Promise<IPriceReportModel[]> {
    try {
      this.isLoading = true;
      const response = await axios.get<IPriceReportModel[]>(
        `${baseUrl}/report/3?vehicleId=${vehicleId}`
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

  async get1yrPriceReport(
    vehicleId?: string
  ): Promise<IPriceReportModel[]> {
    try {
      this.isLoading = true;
      const response = await axios.get<IPriceReportModel[]>(
        `${baseUrl}/report/4?vehicleId=${vehicleId}`
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

  async get3yrPriceReport(
    vehicleId?: string
  ): Promise<IPriceReportModel[]> {
    try {
      this.isLoading = true;
      const response = await axios.get<IPriceReportModel[]>(
        `${baseUrl}/report/5?vehicleId=${vehicleId}`
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

  async getStat(vehicleId: string, statId: string): Promise<IStatModel> {
    try {
      this.isLoading = true;
      const response = await axios.get<IStatModel>(
        `${baseUrl}/stat/${statId}?vehicleId=${vehicleId}`
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
