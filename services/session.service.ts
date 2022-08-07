/* eslint-disable import/no-anonymous-default-export */
import { Session } from "../schemas/session";
import api from "./api"

export default {
  login: async (email: string, password: string) => {
    const response = await api.post<Session | Error>('/session', { email, password });

    if (response.status === 200) {
      return response.data as Session;
    }

    throw new Error((response.data as Error).message);
  },

  refresh: async () => {
    const response = await api.get<Session | Error>('/session');

    if (response.status === 200) {
      return response.data as Session;
    }

    throw new Error((response.data as Error).message);
  }
}
