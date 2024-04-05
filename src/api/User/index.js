import { LIST_USER_BY_ADMIN_ENDPOINT } from "./endpoints";
import ApiFactory from "../ApiFactory";

const UserApi = new ApiFactory({
  url: process.env.REACT_APP_API_ENDPOINT,
});

UserApi.createEntities([{ name: LIST_USER_BY_ADMIN_ENDPOINT }]);

const fetchListUserApi = () =>
  UserApi.createBasicCRUDEndpoints({
    name: LIST_USER_BY_ADMIN_ENDPOINT,
  }).get();

export { fetchListUserApi };
