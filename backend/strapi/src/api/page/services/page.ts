/**
 * page service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::page.page", ({ strapi }) => ({
  async getPageById(id: number) {
    // Get page by id
    const page = await strapi.documents("api::page.page").findFirst({
      populate: ["inputZone"],
      filters: {
        id: {
          $eq: id,
        },
      },
    });
    return page;
  },
}));
