import axios, { AxiosInstance } from "axios";

class AppService {
  private axios: AxiosInstance;
  private static instance: AppService;

  private constructor() {
    this.axios = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "auth-key": "872608e3-4530-4c6a-a369-052accb03ca8",
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
