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

    // Adding a Response interceptor for handling the errors
    this.axios.interceptors.response.use(
      (response) => {
        //? If needed to serialize the response
        return response;
      },
      (error) => {
        alert("Something went wrong with the server 👻");
        console.error(error);
        // return Promise.reject(error);
      }
    );
  }

  public static getInstance(): AppService {
    if (!AppService.instance) AppService.instance = new AppService();
    return AppService.instance;
  }

  public async getPostalDetails(query: string): Promise<IGetPostalDetails[]> {
    let response = await (
      await this.axios.get(`/postcode/search.json?q=${query}`)
    )?.data?.localities?.locality;
    //? 👻 API doesnt always return array of objects incase of single object
    if (response && !response.length) response = [response];
    return response;
  }
}

export const appService = AppService.getInstance();
