import IGetItemsResponse from "../interfaces/Item";

/**
 * Get Items from server via fetch API
 *
 * @params limit - the number of limit
 * @returns the Promise resolves the `items`
 */
export async function getItems(limit: number): Promise<IGetItemsResponse> {
  return fetch(`/items?limit=${limit}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    redirect: "follow",
    referrerPolicy: "no-referrer"
  })
    .then(response => response.json())
    .then(json => {
      if (!json.items) {
        throw new Error("no items in response");
      }
      return Promise.resolve(json as IGetItemsResponse);
    })
    .catch(() => {
      return Promise.reject("Failed to get items");
    });
}
