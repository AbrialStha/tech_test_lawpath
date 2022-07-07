import axios, { AxiosInstance } from "axios";

export interface IGetPostalDetails {
  category: string;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  postcode: number;
  state: string;
}
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

  public async getPostalDetails(query: string): Promise<IGetPostalDetails[]> {
    const response = await this.axios.get(`/postcode/search.json?q=${query}`);
    let data = response.data?.localities?.locality;
    //? 👻 API doesnt always return array of objects incase of single object
    if (!data.length) data = [data];
    return data;
  }
}

export const appService = AppService.getInstance();
