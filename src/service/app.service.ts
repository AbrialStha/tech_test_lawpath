import axios, { AxiosInstance } from "axios";

class AppService {
  private axios: AxiosInstance;
  private static instance: AppService;

  private constructor() {
    this.axios = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "auth-key": String(process.env.REACT_APP_AUTH_KEY),
      },
    });
  }

  public static getInstance(): AppService {
    if (!AppService.instance) AppService.instance = new AppService();
    return AppService.instance;
  }

  public async getPostalDetails(query: string) {
    const response = await this.axios.get(`/postcode/search.json?q=${query}`);
    return response.data;
  }
}

export const appService = AppService.getInstance();
