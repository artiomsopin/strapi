/**
 * registration controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::registration.registration",
  ({ strapi }) => ({
    // Extend creation core logic for
    // dynamic zone fields validation
    async create(ctx) {
      try {
        // Extract registration zone from request
        const registrationZone: any[] = ctx.request.body.data.inputZone;
        if (!registrationZone) {
          return ctx.badRequest(
            "Failed to extract registration zone from request"
          );
        }

        // Get page's dynamic zone schema
        const pageZone: any[] = await getPageDynamicZone(ctx);
        if (!pageZone) {
          return ctx.badRequest("Failed to get page's dynamic zone schema");
        }

        // Validate registration zone
        validateRegistrationZone(pageZone, registrationZone);
      } catch (e) {
        return ctx.badRequest(
          `Failed to validate dynamic zone schema: ${e.message}`
        );
      }

      // Call core creation logic
      const response = await super.create(ctx);
      return response;
    },
  })
);

async function getPageDynamicZone(ctx): Promise<any> {
  // Extract page id from request
  const pageId: number = ctx.request.body.data.page;

  // Get page by id
  const page = await strapi.service("api::page.page").getPageById(pageId);

  // Get page's dynamic zone schema
  return page.inputZone;
}

function validateRegistrationZone(
  pageZone: any[],
  registrationZone: any[]
): void {
  // Check if the number of fields is the same
  if (pageZone.length !== registrationZone.length) {
    throw new Error("Invalid number of fields");
  }

  // Compare dynamic zone fields
  for (let i = 0; i < pageZone.length; i++) {
    if (pageZone[i].__component !== registrationZone[i].__component) {
      const missedComponentName: string = pageZone[i].__component;
      const missedField: string = missedComponentName.split(".")[1];
      throw new Error(`Field ${missedField} is required`);
    }
  }
}
