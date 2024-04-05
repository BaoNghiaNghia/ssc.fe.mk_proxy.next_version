import { LIST_USER_PROXY } from "./endpoints";
import ApiFactory from "../ApiFactory";

const UserProxyApi = new ApiFactory({
  url: process.env.REACT_APP_API_ENDPOINT,
});

UserProxyApi.createEntities([{ name: LIST_USER_PROXY }]);

const fetchListUserProxyApi = (params) =>
  UserProxyApi.createBasicCRUDEndpoints({ name: LIST_USER_PROXY }).get(params);

export { fetchListUserProxyApi };
