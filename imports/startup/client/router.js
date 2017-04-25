import { routesByGroup, routeMap } from '/imports/api/helpers/both/routes/routes.js';
import { createFlowRouterRoutes } from '/imports/api/helpers/both/routes/util.js';

createFlowRouterRoutes(routesByGroup, routeMap);
